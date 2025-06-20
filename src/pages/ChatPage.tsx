import React from 'react';
import Layout from '@/components/common/Layout';
import ChatInterface from '@/components/chat/ChatInterface';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, MessageCircle, Zap, Target } from 'lucide-react';

export default function ChatPage() {
  const features = [
    {
      icon: MessageCircle,
      title: 'Chat Conversationnel',
      description: 'Posez vos questions en langage naturel'
    },
    {
      icon: Target,
      title: 'Analyse Campagnes',
      description: 'Insights détaillés sur vos performances'
    },
    {
      icon: Zap,
      title: 'Réponses Instantanées',
      description: 'Analyse en temps réel avec Claude AI'
    }
  ];

  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Bot className="h-8 w-8 mr-3 text-[#E53E3E]" />
                Assistant IA MDMC
              </h1>
              <p className="text-gray-600">
                Analysez vos campagnes Google Ads avec l'intelligence artificielle
              </p>
            </div>
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
              Claude AI Connecté
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Features sidebar */}
            <div className="lg:col-span-1 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Fonctionnalités</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="p-2 bg-[#E53E3E] bg-opacity-10 rounded-lg">
                          <Icon className="h-4 w-4 text-[#E53E3E]" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm">
                            {feature.title}
                          </h4>
                          <p className="text-xs text-gray-600 mt-1">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Exemples de Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-700">
                        "Quelles sont mes campagnes les plus performantes ?"
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-700">
                        "Compare les performances de novembre vs octobre"
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-700">
                        "Configure une alerte si le budget dépasse 80%"
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-700">
                        "Optimise mes enchères pour améliorer le ROAS"
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chat interface */}
            <div className="lg:col-span-3">
              <ChatInterface />
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}