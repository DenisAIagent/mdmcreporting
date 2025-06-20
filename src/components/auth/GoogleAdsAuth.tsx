import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle, AlertCircle, ExternalLink, RefreshCw } from 'lucide-react';

interface GoogleAdsAuthProps {
  onAuthSuccess?: (tokens: any) => void;
  onError?: (error: string) => void;
}

interface AuthState {
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  authUrl: string | null;
  tokens: any | null;
  accounts: any[] | null;
}

export default function GoogleAdsAuth({ onAuthSuccess, onError }: GoogleAdsAuthProps) {
  const [authState, setAuthState] = useState<AuthState>({
    isConnected: false,
    isLoading: false,
    error: null,
    authUrl: null,
    tokens: null,
    accounts: null
  });

  // Vérifier si on revient de l'authentification Google
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');

    if (error) {
      setAuthState(prev => ({
        ...prev,
        error: `Erreur d'authentification: ${error}`,
        isLoading: false
      }));
    } else if (code) {
      handleAuthCallback(code);
    }
  }, []);

  // Obtenir l'URL d'authentification
  const getAuthUrl = async () => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch('/api/google-ads/auth-url');
      const data = await response.json();

      if (data.success) {
        setAuthState(prev => ({
          ...prev,
          authUrl: data.authUrl,
          isLoading: false
        }));
      } else {
        throw new Error(data.error || 'Erreur lors de la génération de l\'URL');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      setAuthState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false
      }));
      onError?.(errorMessage);
    }
  };

  // Gérer le callback d'authentification
  const handleAuthCallback = async (code: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Échanger le code contre des tokens
      const response = await fetch('/api/google-ads/auth-callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });

      const data = await response.json();

      if (data.success) {
        // Initialiser le client Google Ads
        const initResponse = await fetch('/api/google-ads/initialize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            accessToken: data.tokens.access_token,
            refreshToken: data.tokens.refresh_token
          })
        });

        const initData = await initResponse.json();

        if (initData.success) {
          setAuthState(prev => ({
            ...prev,
            isConnected: true,
            tokens: data.tokens,
            isLoading: false
          }));

          // Charger les comptes
          await loadAccounts();
          
          onAuthSuccess?.(data.tokens);
          
          // Nettoyer l'URL
          window.history.replaceState({}, document.title, window.location.pathname);
        } else {
          throw new Error(initData.error || 'Erreur d\'initialisation');
        }
      } else {
        throw new Error(data.error || 'Erreur d\'authentification');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      setAuthState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false
      }));
      onError?.(errorMessage);
    }
  };

  // Charger les comptes accessibles
  const loadAccounts = async () => {
    try {
      const response = await fetch('/api/google-ads/accounts');
      const data = await response.json();

      if (data.success) {
        setAuthState(prev => ({
          ...prev,
          accounts: data.accounts
        }));
      }
    } catch (error) {
      console.error('Erreur chargement comptes:', error);
    }
  };

  // Déconnecter
  const disconnect = () => {
    setAuthState({
      isConnected: false,
      isLoading: false,
      error: null,
      authUrl: null,
      tokens: null,
      accounts: null
    });
  };

  // Tester la connexion
  const testConnection = async (customerId: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch('/api/google-ads/test-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId })
      });

      const data = await response.json();

      if (data.success) {
        setAuthState(prev => ({
          ...prev,
          isLoading: false
        }));
        alert('Connexion Google Ads testée avec succès !');
      } else {
        throw new Error(data.error || 'Erreur de test');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      setAuthState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false
      }));
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[#FF4444]">
          <div style={{
            width: 0,
            height: 0,
            borderTop: '6px solid transparent',
            borderBottom: '6px solid transparent',
            borderLeft: '10px solid #FF4444'
          }}></div>
          Connexion Google Ads
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* État de la connexion */}
        <div className="flex items-center justify-between p-4 rounded-lg border">
          <div className="flex items-center gap-3">
            {authState.isConnected ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-medium text-green-700">Connecté à Google Ads</span>
              </>
            ) : (
              <>
                <AlertCircle className="h-5 w-5 text-gray-400" />
                <span className="font-medium text-gray-600">Non connecté</span>
              </>
            )}
          </div>
          <Badge variant={authState.isConnected ? "default" : "secondary"}>
            {authState.isConnected ? "ACTIF" : "INACTIF"}
          </Badge>
        </div>

        {/* Erreur */}
        {authState.error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{authState.error}</AlertDescription>
          </Alert>
        )}

        {/* Interface non connecté */}
        {!authState.isConnected && (
          <div className="space-y-4">
            <div className="text-center space-y-3">
              <p className="text-[#4B5563]">
                Connectez votre compte Google Ads pour accéder aux données réelles de vos campagnes.
              </p>
              
              {!authState.authUrl ? (
                <Button 
                  onClick={getAuthUrl}
                  disabled={authState.isLoading}
                  className="bg-[#FF4444] hover:bg-[#E63946] text-white"
                >
                  {authState.isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Préparation...
                    </>
                  ) : (
                    <>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Se connecter à Google Ads
                    </>
                  )}
                </Button>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-[#6B7280]">
                    Cliquez sur le bouton ci-dessous pour vous authentifier avec Google :
                  </p>
                  <Button 
                    onClick={() => window.location.href = authState.authUrl!}
                    className="bg-[#FF4444] hover:bg-[#E63946] text-white"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Ouvrir Google Authentification
                  </Button>
                </div>
              )}
            </div>

            <div className="text-xs text-[#6B7280] bg-[#F9FAFB] p-3 rounded-lg">
              <strong>Note :</strong> Vous serez redirigé vers Google pour autoriser l'accès à vos données Google Ads. 
              Aucune donnée sensible n'est stockée sur nos serveurs.
            </div>
          </div>
        )}

        {/* Interface connecté */}
        {authState.isConnected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={loadAccounts}
                disabled={authState.isLoading}
                variant="outline"
              >
                {authState.isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="mr-2 h-4 w-4" />
                )}
                Actualiser Comptes
              </Button>
              
              <Button 
                onClick={disconnect}
                variant="outline"
                className="text-red-600 hover:text-red-700"
              >
                Déconnecter
              </Button>
            </div>

            {/* Liste des comptes */}
            {authState.accounts && authState.accounts.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium text-[#1F2937]">Comptes Google Ads Accessibles :</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {authState.accounts.map((account, index) => (
                    <div key={account.id} className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-[#1F2937]">{account.name}</div>
                        <div className="text-sm text-[#6B7280]">
                          ID: {account.id} • {account.currencyCode} • {account.timeZone}
                        </div>
                        {account.isTestAccount && (
                          <Badge variant="secondary" className="text-xs mt-1">TEST</Badge>
                        )}
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => testConnection(account.id)}
                        disabled={authState.isLoading}
                      >
                        Tester
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="text-xs text-green-700 bg-green-50 p-3 rounded-lg">
              ✅ <strong>Connexion active :</strong> Votre application peut maintenant interroger l'API Google Ads 
              avec des données réelles. Utilisez l'assistant IA pour générer des rapports automatiquement.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
