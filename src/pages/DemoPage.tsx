import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Sparkles, 
  Brain, 
  Zap, 
  Target, 
  FileText, 
  BarChart3,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import AISimulator from '@/components/demo/AISimulator';

export default function DemoPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header Hero */}
      <Card className="gradient-mdmc text-white">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <img 
              src="/assets/MDMC_logo_noir fond transparent.png" 
              alt="MDMC Logo" 
              className="h-16 w-auto brightness-0 invert"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2">
            🚀 MDMC Reporting IA - Démonstration
          </h1>
          <p className="text-xl opacity-90 mb-4">
            Assistant IA conversationnel propulsé par Gemini 2.5 Pro
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge className="bg-white/20 text-white">Gemini 2.5 Pro</Badge>
            <Badge className="bg-white/20 text-white">React + TypeScript</Badge>
            <Badge className="bg-white/20 text-white">Google Ads</Badge>
            <Badge className="bg-white/20 text-white">Exports Automatiques</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Fonctionnalités Principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-mdmc-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[var(--mdmc-red)]">
              <Brain className="h-6 w-6" />
              IA Conversationnelle
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-[var(--mdmc-gray-600)]">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Requêtes en français naturel
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Compréhension contextuelle Google Ads
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Transformation requête → JSON structuré
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Sessions de conversation intelligentes
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="card-mdmc-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[var(--mdmc-red)]">
              <BarChart3 className="h-6 w-6" />
              Analyses Avancées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-[var(--mdmc-gray-600)]">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Performance campagnes, mots-clés
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Analyses temporelles (18 mois max)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Comparaisons multi-dimensionnelles
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Métriques spécialisées (ROAS, CTR, CPC)
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="card-mdmc-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[var(--mdmc-red)]">
              <FileText className="h-6 w-6" />
              Exports Automatiques
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-[var(--mdmc-gray-600)]">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Rapports PDF professionnels
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Données Excel structurées
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Fichiers CSV pour analyses
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Génération automatique sur demande
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Démonstration Interactive */}
      <Tabs defaultValue="simulator" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="simulator" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Simulateur IA
          </TabsTrigger>
          <TabsTrigger value="examples" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Exemples & Guide
          </TabsTrigger>
        </TabsList>

        <TabsContent value="simulator">
          <AISimulator />
        </TabsContent>

        <TabsContent value="examples">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Exemples de Requêtes */}
            <Card className="card-mdmc">
              <CardHeader>
                <CardTitle className="text-[var(--mdmc-red)]">
                  💬 Exemples de Requêtes IA
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-[var(--mdmc-black)]">Analyses Simples</h4>
                  <div className="space-y-2">
                    <div className="bg-[var(--mdmc-gray-50)] p-3 rounded-lg">
                      <code className="text-sm">"Top 10 campagnes ce mois"</code>
                    </div>
                    <div className="bg-[var(--mdmc-gray-50)] p-3 rounded-lg">
                      <code className="text-sm">"Mots-clés performants du trimestre"</code>
                    </div>
                    <div className="bg-[var(--mdmc-gray-50)] p-3 rounded-lg">
                      <code className="text-sm">"ROAS moyen des 30 derniers jours"</code>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-[var(--mdmc-black)]">Analyses Complexes</h4>
                  <div className="space-y-2">
                    <div className="bg-[var(--mdmc-gray-50)] p-3 rounded-lg">
                      <code className="text-sm">"Campagnes avec budget épuisé avant 80% du mois"</code>
                    </div>
                    <div className="bg-[var(--mdmc-gray-50)] p-3 rounded-lg">
                      <code className="text-sm">"Évolution ROAS sur 18 mois par trimestre"</code>
                    </div>
                    <div className="bg-[var(--mdmc-gray-50)] p-3 rounded-lg">
                      <code className="text-sm">"Comparaison mobile vs desktop ce semestre"</code>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-[var(--mdmc-black)]">Exports</h4>
                  <div className="space-y-2">
                    <div className="bg-[var(--mdmc-gray-50)] p-3 rounded-lg">
                      <code className="text-sm">"Rapport PDF mensuel avec graphiques"</code>
                    </div>
                    <div className="bg-[var(--mdmc-gray-50)] p-3 rounded-lg">
                      <code className="text-sm">"Export Excel des campagnes sur 6 mois"</code>
                    </div>
                    <div className="bg-[var(--mdmc-gray-50)] p-3 rounded-lg">
                      <code className="text-sm">"Données CSV des mots-clés triés par CPC"</code>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Workflow IA */}
            <Card className="card-mdmc">
              <CardHeader>
                <CardTitle className="text-[var(--mdmc-red)]">
                  🔄 Workflow de l'IA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-[var(--mdmc-red)] text-white rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium text-[var(--mdmc-black)]">Analyse Linguistique</h4>
                      <p className="text-sm text-[var(--mdmc-gray-600)]">
                        Gemini 2.5 Pro décompose votre requête en français
                      </p>
                    </div>
                  </div>

                  <ArrowRight className="h-4 w-4 text-[var(--mdmc-gray-400)] mx-4" />

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-[var(--mdmc-red)] text-white rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium text-[var(--mdmc-black)]">Transformation Structurée</h4>
                      <p className="text-sm text-[var(--mdmc-gray-600)]">
                        Conversion en JSON compatible Google Ads API
                      </p>
                    </div>
                  </div>

                  <ArrowRight className="h-4 w-4 text-[var(--mdmc-gray-400)] mx-4" />

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-[var(--mdmc-red)] text-white rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium text-[var(--mdmc-black)]">Exécution & Export</h4>
                      <p className="text-sm text-[var(--mdmc-gray-600)]">
                        Requête API + génération automatique de rapports
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-800">Performance</span>
                    </div>
                    <ul className="text-sm text-green-700 mt-2 space-y-1">
                      <li>• Latence : < 2 secondes</li>
                      <li>• Coût : ~0.007€ par requête</li>
                      <li>• Précision : > 95%</li>
                      <li>• Disponibilité : 24/7</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Technologies */}
      <Card className="card-mdmc">
        <CardHeader>
          <CardTitle className="text-[var(--mdmc-red)]">
            🛠️ Stack Technique
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-xl">⚛️</span>
              </div>
              <h4 className="font-medium">React 18</h4>
              <p className="text-xs text-[var(--mdmc-gray-600)]">Interface moderne</p>
            </div>
            
            <div className="space-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-xl">🤖</span>
              </div>
              <h4 className="font-medium">Gemini 2.5</h4>
              <p className="text-xs text-[var(--mdmc-gray-600)]">IA conversationnelle</p>
            </div>
            
            <div className="space-y-2">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-xl">📊</span>
              </div>
              <h4 className="font-medium">Google Ads</h4>
              <p className="text-xs text-[var(--mdmc-gray-600)]">API intégrée</p>
            </div>
            
            <div className="space-y-2">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-xl">🎨</span>
              </div>
              <h4 className="font-medium">MDMC Design</h4>
              <p className="text-xs text-[var(--mdmc-gray-600)]">Charte respectée</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
