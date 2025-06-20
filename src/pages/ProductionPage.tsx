import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertTriangle, BarChart3, MessageSquare } from 'lucide-react';
import GoogleAdsAuth from '@/components/auth/GoogleAdsAuth';
import ChatInterface from '@/components/chat/ChatInterface';

interface ProductionState {
  isGoogleAdsConnected: boolean;
  selectedAccount: any | null;
  availableAccounts: any[];
  tokens: any | null;
}

export default function ProductionPage() {
  const [productionState, setProductionState] = useState<ProductionState>({
    isGoogleAdsConnected: false,
    selectedAccount: null,
    availableAccounts: [],
    tokens: null
  });

  const [activeTab, setActiveTab] = useState<string>('setup');

  // Gérer la réussite de l'authentification Google Ads
  const handleGoogleAdsAuthSuccess = (tokens: any) => {
    setProductionState(prev => ({
      ...prev,
      isGoogleAdsConnected: true,
      tokens: tokens
    }));
    
    // Charger les comptes
    loadAccounts();
    
    // Passer à l'onglet suivant
    setActiveTab('accounts');
  };

  // Charger les comptes Google Ads
  const loadAccounts = async () => {
    try {
      const response = await fetch('/api/google-ads/accounts');
      const data = await response.json();

      if (data.success) {
        setProductionState(prev => ({
          ...prev,
          availableAccounts: data.accounts
        }));
      }
    } catch (error) {
      console.error('Erreur chargement comptes:', error);
    }
  };

  // Sélectionner un compte
  const selectAccount = (account: any) => {
    setProductionState(prev => ({
      ...prev,
      selectedAccount: account
    }));
    setActiveTab('chat');
  };

  // Vérifier l'état complet pour l'assistant IA
  const isReadyForAI = productionState.isGoogleAdsConnected && productionState.selectedAccount;

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header Production */}
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
            MDMC Reporting IA - Production
          </h1>
          <p className="text-xl opacity-90 mb-6 max-w-2xl mx-auto">
            Assistant IA connecté à vos vraies données Google Ads pour des analyses en temps réel
          </p>
          <div className="flex justify-center">
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-1">
              MODE PRODUCTION • DONNÉES RÉELLES
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Statut de Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#FF4444] text-xl">État de la Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Connexion Google Ads */}
            <div className="flex items-center gap-3 p-4 rounded-lg border">
              {productionState.isGoogleAdsConnected ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-orange-500" />
              )}
              <div>
                <div className="font-medium">Connexion Google Ads</div>
                <div className="text-sm text-[#6B7280]">
                  {productionState.isGoogleAdsConnected ? 'Connecté' : 'Non connecté'}
                </div>
              </div>
            </div>

            {/* Compte Sélectionné */}
            <div className="flex items-center gap-3 p-4 rounded-lg border">
              {productionState.selectedAccount ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-orange-500" />
              )}
              <div>
                <div className="font-medium">Compte Sélectionné</div>
                <div className="text-sm text-[#6B7280]">
                  {productionState.selectedAccount ? productionState.selectedAccount.name : 'Aucun compte'}
                </div>
              </div>
            </div>

            {/* Assistant IA */}
            <div className="flex items-center gap-3 p-4 rounded-lg border">
              {isReadyForAI ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-orange-500" />
              )}
              <div>
                <div className="font-medium">Assistant IA</div>
                <div className="text-sm text-[#6B7280]">
                  {isReadyForAI ? 'Prêt' : 'En attente'}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interface Principale */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 h-12">
          <TabsTrigger value="setup" className="flex items-center gap-3 text-base">
            <div style={{
              width: 0,
              height: 0,
              borderTop: '4px solid transparent',
              borderBottom: '4px solid transparent',
              borderLeft: '6px solid #FF4444'
            }}></div>
            Connexion Google Ads
          </TabsTrigger>
          <TabsTrigger 
            value="accounts" 
            className="flex items-center gap-3 text-base"
            disabled={!productionState.isGoogleAdsConnected}
          >
            <BarChart3 className="h-4 w-4" />
            Sélection Compte
          </TabsTrigger>
          <TabsTrigger 
            value="chat" 
            className="flex items-center gap-3 text-base"
            disabled={!isReadyForAI}
          >
            <MessageSquare className="h-4 w-4" />
            Assistant IA
          </TabsTrigger>
        </TabsList>

        {/* Onglet Configuration Google Ads */}
        <TabsContent value="setup" className="space-y-6">
          <GoogleAdsAuth 
            onAuthSuccess={handleGoogleAdsAuthSuccess}
            onError={(error) => console.error('Erreur auth:', error)}
          />
        </TabsContent>

        {/* Onglet Sélection de Compte */}
        <TabsContent value="accounts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#FF4444]">Sélectionnez un Compte Google Ads</CardTitle>
            </CardHeader>
            <CardContent>
              {productionState.availableAccounts.length > 0 ? (
                <div className="space-y-3">
                  {productionState.availableAccounts.map((account) => (
                    <div 
                      key={account.id} 
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        productionState.selectedAccount?.id === account.id 
                          ? 'border-[#FF4444] bg-[#FFF5F5]' 
                          : 'border-gray-200 hover:border-[#FF4444]/50'
                      }`}
                      onClick={() => selectAccount(account)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-[#1F2937]">{account.name}</div>
                          <div className="text-sm text-[#6B7280]">
                            ID: {account.id} • {account.currencyCode} • {account.timeZone}
                          </div>
                          <div className="flex gap-2 mt-2">
                            {account.isTestAccount && (
                              <Badge variant="secondary" className="text-xs">TEST</Badge>
                            )}
                            {account.isManager && (
                              <Badge variant="outline" className="text-xs">MANAGER</Badge>
                            )}
                            <Badge variant="default" className="text-xs bg-green-100 text-green-800">
                              {account.status}
                            </Badge>
                          </div>
                        </div>
                        {productionState.selectedAccount?.id === account.id && (
                          <CheckCircle className="h-5 w-5 text-[#FF4444]" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Aucun compte Google Ads trouvé. Vérifiez vos permissions d'accès.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Assistant IA */}
        <TabsContent value="chat" className="space-y-6">
          {isReadyForAI ? (
            <>
              {/* Informations sur le compte actif */}
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <strong>Compte actif :</strong> {productionState.selectedAccount?.name} (ID: {productionState.selectedAccount?.id})
                  <br />
                  L'assistant IA va maintenant interroger vos vraies données Google Ads.
                </AlertDescription>
              </Alert>

              {/* Interface Chat avec Données Réelles */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#FF4444] flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Assistant IA - Données Google Ads Réelles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChatInterface 
                    isProduction={true}
                    customerId={productionState.selectedAccount?.id}
                    accountName={productionState.selectedAccount?.name}
                  />
                </CardContent>
              </Card>
            </>
          ) : (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Veuillez d'abord vous connecter à Google Ads et sélectionner un compte pour utiliser l'assistant IA.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
