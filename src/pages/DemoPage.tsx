import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AISimulator from '@/components/demo/AISimulator';

export default function DemoPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header Hero - Design Moderne */}
      <Card className="gradient-mdmc text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        <CardContent className="p-12 text-center relative z-10">
          <div className="flex justify-center mb-6">
            <img 
              src="/assets/MDMC_logo_noir fond transparent.png" 
              alt="MDMC Logo" 
              className="h-20 w-auto brightness-0 invert"
            />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-lg">
            MDMC Reporting IA - Démonstration
          </h1>
          <p className="text-xl opacity-90 mb-6 max-w-2xl mx-auto">
            Assistant IA conversationnel propulsé par Gemini 2.5 Pro pour l'analyse intelligente de vos campagnes Google Ads
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-1">Gemini 2.5 Pro</Badge>
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-1">React + TypeScript</Badge>
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-1">Google Ads API</Badge>
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-1">Exports Automatiques</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Fonctionnalités Principales - Design Épuré */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="card-mdmc-hover group relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF4444] to-[#E63946]"></div>
          <CardHeader className="pb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FFF5F5] to-[#FFE5E5] mb-4 flex items-center justify-center">
              <div className="triangle-right" style={{
                width: 0,
                height: 0,
                borderTop: '8px solid transparent',
                borderBottom: '8px solid transparent', 
                borderLeft: '12px solid #FF4444'
              }}></div>
            </div>
            <CardTitle className="text-[#FF4444] text-xl">
              IA Conversationnelle
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-[#4B5563]">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                Requêtes en français naturel
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                Compréhension contextuelle Google Ads
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                Transformation requête → JSON structuré
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                Sessions de conversation intelligentes
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="card-mdmc-hover group relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF4444] to-[#E63946]"></div>
          <CardHeader className="pb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FFF5F5] to-[#FFE5E5] mb-4 flex items-center justify-center">
              <div className="flex gap-1">
                <div style={{
                  width: 0,
                  height: 0,
                  borderTop: '6px solid transparent',
                  borderBottom: '6px solid transparent',
                  borderLeft: '8px solid #FF4444'
                }}></div>
                <div style={{
                  width: 0,
                  height: 0,
                  borderTop: '6px solid transparent',
                  borderBottom: '6px solid transparent',
                  borderLeft: '8px solid #E63946'
                }}></div>
              </div>
            </div>
            <CardTitle className="text-[#FF4444] text-xl">
              Analyses Avancées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-[#4B5563]">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                Performance campagnes, mots-clés
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                Analyses temporelles (18 mois max)
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                Comparaisons multi-dimensionnelles
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                Métriques spécialisées (ROAS, CTR, CPC)
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="card-mdmc-hover group relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF4444] to-[#E63946]"></div>
          <CardHeader className="pb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FFF5F5] to-[#FFE5E5] mb-4 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-1">
                <div style={{
                  width: 0,
                  height: 0,
                  borderLeft: '4px solid transparent',
                  borderRight: '4px solid transparent',
                  borderBottom: '6px solid #FF4444'
                }}></div>
                <div style={{
                  width: 0,
                  height: 0,
                  borderLeft: '4px solid transparent',
                  borderRight: '4px solid transparent',
                  borderBottom: '6px solid #E63946'
                }}></div>
                <div style={{
                  width: 0,
                  height: 0,
                  borderLeft: '4px solid transparent',
                  borderRight: '4px solid transparent',
                  borderTop: '6px solid #E63946'
                }}></div>
                <div style={{
                  width: 0,
                  height: 0,
                  borderLeft: '4px solid transparent',
                  borderRight: '4px solid transparent',
                  borderTop: '6px solid #FF4444'
                }}></div>
              </div>
            </div>
            <CardTitle className="text-[#FF4444] text-xl">
              Exports Automatiques
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-[#4B5563]">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                Rapports PDF professionnels
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                Données Excel structurées
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                Fichiers CSV pour analyses
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                Génération automatique sur demande
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Démonstration Interactive */}
      <Tabs defaultValue="simulator" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 h-12">
          <TabsTrigger value="simulator" className="flex items-center gap-3 text-base">
            <div style={{
              width: 0,
              height: 0,
              borderTop: '4px solid transparent',
              borderBottom: '4px solid transparent',
              borderLeft: '6px solid #FF4444'
            }}></div>
            Simulateur IA
          </TabsTrigger>
          <TabsTrigger value="examples" className="flex items-center gap-3 text-base">
            <div className="w-3 h-3 rounded bg-[#FF4444]"></div>
            Exemples & Guide
          </TabsTrigger>
        </TabsList>

        <TabsContent value="simulator">
          <AISimulator />
        </TabsContent>

        <TabsContent value="examples">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Exemples de Requêtes */}
            <Card className="card-mdmc relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FF4444] to-[#E63946]"></div>
              <CardHeader className="pt-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF4444] to-[#E63946] flex items-center justify-center">
                    <div style={{
                      width: 0,
                      height: 0,
                      borderTop: '4px solid transparent',
                      borderBottom: '4px solid transparent',
                      borderLeft: '6px solid white'
                    }}></div>
                  </div>
                  <CardTitle className="text-[#FF4444] text-xl">
                    Exemples de Requêtes IA
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-[#1F2937] flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-[#FF4444] rounded"></div>
                    Analyses Simples
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-[#F9FAFB] border-l-4 border-[#FF4444] p-4 rounded-r-lg">
                      <code className="text-sm font-medium text-[#374151]">"Top 10 campagnes ce mois"</code>
                    </div>
                    <div className="bg-[#F9FAFB] border-l-4 border-[#FF4444] p-4 rounded-r-lg">
                      <code className="text-sm font-medium text-[#374151]">"Mots-clés performants du trimestre"</code>
                    </div>
                    <div className="bg-[#F9FAFB] border-l-4 border-[#FF4444] p-4 rounded-r-lg">
                      <code className="text-sm font-medium text-[#374151]">"ROAS moyen des 30 derniers jours"</code>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-[#1F2937] flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-[#FF4444] rounded"></div>
                    Analyses Complexes
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-[#F9FAFB] border-l-4 border-[#E63946] p-4 rounded-r-lg">
                      <code className="text-sm font-medium text-[#374151]">"Campagnes avec budget épuisé avant 80% du mois"</code>
                    </div>
                    <div className="bg-[#F9FAFB] border-l-4 border-[#E63946] p-4 rounded-r-lg">
                      <code className="text-sm font-medium text-[#374151]">"Évolution ROAS sur 18 mois par trimestre"</code>
                    </div>
                    <div className="bg-[#F9FAFB] border-l-4 border-[#E63946] p-4 rounded-r-lg">
                      <code className="text-sm font-medium text-[#374151]">"Comparaison mobile vs desktop ce semestre"</code>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-[#1F2937] flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-[#FF4444] rounded"></div>
                    Exports
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-[#F9FAFB] border-l-4 border-[#FF6B6B] p-4 rounded-r-lg">
                      <code className="text-sm font-medium text-[#374151]">"Rapport PDF mensuel avec graphiques"</code>
                    </div>
                    <div className="bg-[#F9FAFB] border-l-4 border-[#FF6B6B] p-4 rounded-r-lg">
                      <code className="text-sm font-medium text-[#374151]">"Export Excel des campagnes sur 6 mois"</code>
                    </div>
                    <div className="bg-[#F9FAFB] border-l-4 border-[#FF6B6B] p-4 rounded-r-lg">
                      <code className="text-sm font-medium text-[#374151]">"Données CSV des mots-clés triés par CPC"</code>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Workflow IA */}
            <Card className="card-mdmc relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FF4444] to-[#E63946]"></div>
              <CardHeader className="pt-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF4444] to-[#E63946] flex items-center justify-center">
                    <div className="flex gap-0.5">
                      <div style={{
                        width: 0,
                        height: 0,
                        borderTop: '3px solid transparent',
                        borderBottom: '3px solid transparent',
                        borderLeft: '4px solid white'
                      }}></div>
                      <div style={{
                        width: 0,
                        height: 0,
                        borderTop: '3px solid transparent',
                        borderBottom: '3px solid transparent',
                        borderLeft: '4px solid white'
                      }}></div>
                    </div>
                  </div>
                  <CardTitle className="text-[#FF4444] text-xl">
                    Workflow de l'IA
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#FF4444] to-[#E63946] text-white rounded-lg flex items-center justify-center text-lg font-bold shadow-lg">
                      1
                    </div>
                    <div className="pt-1">
                      <h4 className="font-semibold text-[#1F2937] mb-1">Analyse Linguistique</h4>
                      <p className="text-sm text-[#4B5563] leading-relaxed">
                        Gemini 2.5 Pro décompose votre requête en français et identifie les intentions métier
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-[#FF4444] to-[#E63946] rounded-full"></div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#FF4444] to-[#E63946] text-white rounded-lg flex items-center justify-center text-lg font-bold shadow-lg">
                      2
                    </div>
                    <div className="pt-1">
                      <h4 className="font-semibold text-[#1F2937] mb-1">Transformation Structurée</h4>
                      <p className="text-sm text-[#4B5563] leading-relaxed">
                        Conversion intelligente en JSON parfaitement compatible avec l'API Google Ads
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-[#FF4444] to-[#E63946] rounded-full"></div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#FF4444] to-[#E63946] text-white rounded-lg flex items-center justify-center text-lg font-bold shadow-lg">
                      3
                    </div>
                    <div className="pt-1">
                      <h4 className="font-semibold text-[#1F2937] mb-1">Exécution & Export</h4>
                      <p className="text-sm text-[#4B5563] leading-relaxed">
                        Exécution de la requête API et génération automatique de rapports professionnels
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      <span className="font-semibold text-green-800 text-lg">Performance</span>
                    </div>
                    <ul className="grid grid-cols-2 gap-3 text-sm text-green-700">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        Latence : &lt; 2 secondes
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        Coût : ~0.007€ par requête
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        Précision : &gt; 95%
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        Disponibilité : 24/7
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Technologies - Design Minimaliste */}
      <Card className="card-mdmc relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FF4444] to-[#E63946]"></div>
        <CardHeader className="pt-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF4444] to-[#E63946] flex items-center justify-center">
              <div className="grid grid-cols-2 gap-0.5">
                <div style={{
                  width: 0,
                  height: 0,
                  borderLeft: '2px solid transparent',
                  borderRight: '2px solid transparent',
                  borderBottom: '3px solid white'
                }}></div>
                <div style={{
                  width: 0,
                  height: 0,
                  borderTop: '2px solid transparent',
                  borderBottom: '2px solid transparent',
                  borderLeft: '3px solid white'
                }}></div>
                <div style={{
                  width: 0,
                  height: 0,
                  borderLeft: '2px solid transparent',
                  borderRight: '2px solid transparent',
                  borderTop: '3px solid white'
                }}></div>
                <div style={{
                  width: 0,
                  height: 0,
                  borderTop: '2px solid transparent',
                  borderBottom: '2px solid transparent',
                  borderRight: '3px solid white'
                }}></div>
              </div>
            </div>
            <CardTitle className="text-[#FF4444] text-xl">
              Stack Technique
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center mx-auto shadow-sm">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg"></div>
              </div>
              <div>
                <h4 className="font-semibold text-[#1F2937]">React 18</h4>
                <p className="text-xs text-[#6B7280] mt-1">Interface moderne</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl flex items-center justify-center mx-auto shadow-sm">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg"></div>
              </div>
              <div>
                <h4 className="font-semibold text-[#1F2937]">Gemini 2.5</h4>
                <p className="text-xs text-[#6B7280] mt-1">IA conversationnelle</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center mx-auto shadow-sm">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg"></div>
              </div>
              <div>
                <h4 className="font-semibold text-[#1F2937]">Google Ads</h4>
                <p className="text-xs text-[#6B7280] mt-1">API intégrée</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FFF5F5] to-[#FFE5E5] rounded-xl flex items-center justify-center mx-auto shadow-sm">
                <div className="flex gap-1">
                  <div style={{
                    width: 0,
                    height: 0,
                    borderTop: '8px solid transparent',
                    borderBottom: '8px solid transparent',
                    borderLeft: '12px solid #FF4444'
                  }}></div>
                  <div style={{
                    width: 0,
                    height: 0,
                    borderTop: '8px solid transparent',
                    borderBottom: '8px solid transparent',
                    borderLeft: '12px solid #E63946'
                  }}></div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-[#1F2937]">MDMC Design</h4>
                <p className="text-xs text-[#6B7280] mt-1">Charte respectée</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
