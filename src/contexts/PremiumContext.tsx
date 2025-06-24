import React, { createContext, useContext, useState, useEffect } from 'react';

interface PremiumContextType {
  isBackendConnected: boolean;
  currentMode: 'demo' | 'production';
  switchMode: (mode: 'demo' | 'production') => void;
  backendStatus: string;
  refreshBackendStatus: () => void;
}

const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

export function PremiumProvider({ children }: { children: React.ReactNode }) {
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [currentMode, setCurrentMode] = useState<'demo' | 'production'>('demo');
  const [backendStatus, setBackendStatus] = useState('Vérification...');

  const checkBackendConnection = async () => {
    try {
      // Utiliser la configuration d'environnement
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
      const response = await fetch(`${API_BASE_URL}/api/health`);
      
      if (response.ok) {
        const data = await response.json();
        setIsBackendConnected(true);
        setBackendStatus(`IA Active (${data.activeSessions || 0} sessions)`);
      } else {
        throw new Error('Backend indisponible');
      }
    } catch (error) {
      setIsBackendConnected(false);
      setBackendStatus('Backend Déconnecté');
    }
  };

  useEffect(() => {
    checkBackendConnection();
    
    // Vérifier toutes les 30 secondes
    const interval = setInterval(checkBackendConnection, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const switchMode = (mode: 'demo' | 'production') => {
    setCurrentMode(mode);
  };

  const refreshBackendStatus = () => {
    checkBackendConnection();
  };

  return (
    <PremiumContext.Provider value={{
      isBackendConnected,
      currentMode,
      switchMode,
      backendStatus,
      refreshBackendStatus
    }}>
      {children}
    </PremiumContext.Provider>
  );
}

export function usePremium() {
  const context = useContext(PremiumContext);
  if (!context) {
    throw new Error('usePremium must be used within PremiumProvider');
  }
  return context;
} 