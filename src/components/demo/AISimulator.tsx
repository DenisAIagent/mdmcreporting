import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, Loader2, Sparkles, Copy, Check } from 'lucide-react';

interface SimulatedQuery {
  intent: string;
  reportType: string;
  dateRange: {
    startDate: string;
    endDate: string;
    period: string;
  };
  accounts: string[];
  metrics: string[];
  dimensions: string[];
  filters: any[];
  orderBy: {
    field: string;
    sortOrder: string;
  };
  limit: number;
  exportFormat: string | null;
}

interface DemoMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  queryData?: SimulatedQuery;
}

const AISimulator: React.FC = () => {
  const [messages, setMessages] = useState<DemoMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  const simulateAIResponse = (userQuery: string): SimulatedQuery => {
    // Simulation intelligente basée sur des mots-clés
    const query = userQuery.toLowerCase();
    
    // Détecter le type de rapport
    let reportType = 'campaign_performance';
    if (query.includes('mot') || query.includes('keyword')) reportType = 'keyword_performance';
    if (query.includes('groupe') || query.includes('adgroup')) reportType = 'adgroup_performance';
    
    // Détecter la période
    let period = 'last_30_days';
    let startDate = '2025-05-21';
    let endDate = '2025-06-21';
    
    if (query.includes('18 mois') || query.includes('18 derniers mois')) {
      period = 'custom';
      startDate = '2023-12-21';
      endDate = '2025-06-21';
    } else if (query.includes('trimestre') || query.includes('3 mois')) {
      period = 'last_90_days';
      startDate = '2025-03-21';
    } else if (query.includes('6 mois')) {
      period = 'custom';
      startDate = '2024-12-21';
    } else if (query.includes('mois dernier')) {
      period = 'last_month';
      startDate = '2025-05-01';
      endDate = '2025-05-31';
    }
    
    // Détecter les métriques
    let metrics = ['impressions', 'clicks', 'conversions', 'cost_micros'];
    if (query.includes('roas')) metrics.push('roas');
    if (query.includes('ctr')) metrics.push('ctr');
    if (query.includes('cpc')) metrics.push('average_cpc');
    if (query.includes('conversions')) metrics = ['conversions', 'conversions_value', 'roas'];
    
    // Détecter l'ordre
    let orderField = 'conversions';
    if (query.includes('roas')) orderField = 'roas';
    if (query.includes('cpc')) orderField = 'average_cpc';
    if (query.includes('impressions')) orderField = 'impressions';
    
    // Détecter format d'export
    let exportFormat = null;
    if (query.includes('pdf')) exportFormat = 'pdf';
    if (query.includes('excel') || query.includes('xlsx')) exportFormat = 'xlsx';
    if (query.includes('csv')) exportFormat = 'csv';
    
    // Détecter l'intention
    let intent = 'analysis';
    if (exportFormat) intent = 'export';
    if (query.includes('compare') || query.includes('comparaison')) intent = 'comparison';
    
    return {
      intent,
      reportType,
      dateRange: { startDate, endDate, period },
      accounts: ['all'],
      metrics,
      dimensions: reportType === 'keyword_performance' ? ['keyword_text'] : ['campaign_name'],
      filters: [],
      orderBy: { field: orderField, sortOrder: 'DESC' },
      limit: 50,
      exportFormat
    };
  };

  const generateExplanation = (query: SimulatedQuery, originalQuery: string): string => {
    const dateRange = query.dateRange.period === 'custom' 
      ? `Du ${query.dateRange.startDate} au ${query.dateRange.endDate}`
      : getPeriodLabel(query.dateRange.period);
    
    const reportTypeLabel = getReportTypeLabel(query.reportType);
    const metricsText = query.metrics.join(', ');
    const exportInfo = query.exportFormat ? `\n\n📄 **Export demandé :** ${query.exportFormat.toUpperCase()}` : '';
    
    return `✅ **Requête analysée avec succès par l'IA !**

🎯 **Requête originale :** "${originalQuery}"

📋 **Analyse automatique :**
• **Type de rapport :** ${reportTypeLabel}
• **Période :** ${dateRange}
• **Métriques :** ${metricsText}
• **Tri :** ${query.orderBy.field} (${query.orderBy.sortOrder === 'DESC' ? 'décroissant' : 'croissant'})
• **Limite :** ${query.limit} résultats${exportInfo}

🤖 **Gemini 2.5 Pro a transformé votre demande en requête structurée !**

🔄 **Prochaine étape :** Cette requête sera utilisée pour interroger l'API Google Ads et récupérer vos données réelles.

✨ **Simulation réussie !** L'IA comprend parfaitement vos besoins en français.`;
  };

  const getPeriodLabel = (period: string): string => {
    const labels: { [key: string]: string } = {
      'today': 'Aujourd\'hui',
      'yesterday': 'Hier',
      'last_7_days': '7 derniers jours',
      'last_30_days': '30 derniers jours',
      'last_90_days': '90 derniers jours',
      'last_month': 'Mois dernier'
    };
    return labels[period] || period;
  };

  const getReportTypeLabel = (reportType: string): string => {
    const labels: { [key: string]: string } = {
      'campaign_performance': 'Performance des campagnes',
      'adgroup_performance': 'Performance des groupes d\'annonces',
      'keyword_performance': 'Performance des mots-clés'
    };
    return labels[reportType] || reportType;
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: DemoMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentQuery = inputValue;
    setInputValue('');
    setIsLoading(true);

    // Simulation de l'attente
    await new Promise(resolve => setTimeout(resolve, 1500));

    const simulatedQuery = simulateAIResponse(currentQuery);
    const explanation = generateExplanation(simulatedQuery, currentQuery);

    const assistantMessage: DemoMessage = {
      id: `ai-${Date.now()}`,
      type: 'assistant',
      content: explanation,
      timestamp: new Date(),
      queryData: simulatedQuery
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const copyJsonToClipboard = async (data: SimulatedQuery) => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      setCopiedJson(true);
      setTimeout(() => setCopiedJson(false), 2000);
    } catch (err) {
      console.error('Erreur de copie:', err);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <Card className="h-full">
      <CardHeader className="header-mdmc">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-[var(--mdmc-black)] flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-[var(--mdmc-red)]" />
            Simulateur IA Gemini 2.5 Pro
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-500 text-white">🤖 Mode Démo</Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={clearChat}
              className="btn-mdmc-ghost"
            >
              Effacer
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[calc(100vh-280px)] scrollbar-mdmc">
          <div className="p-6 space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <Sparkles className="h-12 w-12 text-[var(--mdmc-red)] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[var(--mdmc-black)] mb-2">
                  🎭 Mode Démonstration
                </h3>
                <p className="text-[var(--mdmc-gray-600)] mb-4">
                  Testez l'IA sans backend ! Simulation intelligente basée sur Gemini 2.5 Pro
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-2xl mx-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setInputValue("Campagnes des 18 derniers mois triées par ROAS")}
                    className="text-sm"
                  >
                    "Campagnes 18 mois triées par ROAS"
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setInputValue("Mots-clés performants ce trimestre, export Excel")}
                    className="text-sm"
                  >
                    "Mots-clés trimestre, export Excel"
                  </Button>
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div className={`
                  flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                  ${message.type === 'user' 
                    ? 'bg-[var(--mdmc-red)] text-white' 
                    : 'bg-gradient-to-r from-purple-400 to-pink-400 text-white'
                  }
                `}>
                  {message.type === 'user' ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                </div>
                
                <div className={`
                  flex-1 max-w-[80%] rounded-2xl px-4 py-3
                  ${message.type === 'user'
                    ? 'chat-message-user'
                    : 'bg-gradient-to-r from-purple-50 to-pink-50 text-gray-800 border border-purple-200'
                  }
                `}>
                  <div className="whitespace-pre-wrap break-words">
                    {message.content}
                  </div>
                  
                  {message.queryData && (
                    <div className="mt-3 p-3 bg-white rounded-lg border border-purple-300">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-xs font-medium text-purple-700">
                          JSON généré par Gemini 2.5 Pro :
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyJsonToClipboard(message.queryData!)}
                          className="h-6 px-2 text-xs"
                        >
                          {copiedJson ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                      <pre className="text-xs overflow-auto bg-gray-50 p-2 rounded max-h-40">
                        {JSON.stringify(message.queryData, null, 2)}
                      </pre>
                    </div>
                  )}
                  
                  <div className="text-xs opacity-60 mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-white flex items-center justify-center">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 text-gray-800 border border-purple-200 rounded-2xl px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <div className="typing-indicator">
                      <div className="typing-dot" style={{'--delay': '0ms'} as any}></div>
                      <div className="typing-dot" style={{'--delay': '150ms'} as any}></div>
                      <div className="typing-dot" style={{'--delay': '300ms'} as any}></div>
                    </div>
                    <span className="text-sm">Gemini analyse votre requête...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-6 border-t border-[var(--mdmc-gray-200)]">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Testez l'IA : 'Campagnes performantes ce mois en PDF'"
              disabled={isLoading}
              className="input-mdmc flex-1"
            />
            <Button
              onClick={sendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="btn-mdmc-primary"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          <div className="mt-2 text-xs text-purple-600">
            💫 Mode démo : L'IA simule intelligemment les réponses Gemini 2.5 Pro
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AISimulator;
