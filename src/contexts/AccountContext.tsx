// src/contexts/AccountContext.tsx - Version simplifiée
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { GoogleAdsAccount } from '@/types';
import { googleAdsSimpleService } from '@/services/google-ads-simple';
import { useAuth } from './AuthContext';

interface AccountContextType {
  availableAccounts: GoogleAdsAccount[];
  activeAccount: GoogleAdsAccount | null;
  isLoading: boolean;
  error: string | null;
  switchAccount: (account: GoogleAdsAccount) => void;
  refreshAccounts: () => Promise<void>;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

interface AccountProviderProps {
  children: ReactNode;
}

export function AccountProvider({ children }: AccountProviderProps) {
  const [availableAccounts, setAvailableAccounts] = useState<GoogleAdsAccount[]>([]);
  const [activeAccount, setActiveAccount] = useState<GoogleAdsAccount | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      loadAccounts();
    } else {
      setAvailableAccounts([]);
      setActiveAccount(null);
    }
  }, [isAuthenticated, user]);

  const loadAccounts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('🔄 Chargement des comptes Google Ads...');
      
      // Récupérer les comptes depuis le service simplifié
      const rawAccounts = await googleAdsSimpleService.getAccessibleCustomers();
      
      // Filtrer selon les permissions utilisateur
      let filteredAccounts = rawAccounts;
      if (user?.role !== 'admin') {
        filteredAccounts = rawAccounts.filter(account => 
          user?.assignedAccounts?.includes(account.customerId) || 
          account.assignedUsers?.includes(user?.id || '')
        );
      }

      console.log('✅ Comptes chargés:', filteredAccounts);
      setAvailableAccounts(filteredAccounts);
      
      // Auto-sélectionner le premier compte si aucun n'est sélectionné
      if (!activeAccount && filteredAccounts.length > 0) {
        const savedAccountId = localStorage.getItem('mdmc_active_account');
        const savedAccount = filteredAccounts.find(acc => acc.id === savedAccountId);
        setActiveAccount(savedAccount || filteredAccounts[0]);
      }

    } catch (error) {
      console.error('❌ Erreur lors du chargement des comptes:', error);
      setError(error instanceof Error ? error.message : 'Erreur de chargement des comptes');
      
      // En cas d'erreur, charger les comptes de démo
      const demoAccounts = await googleAdsSimpleService.getAccessibleCustomers();
      setAvailableAccounts(demoAccounts);
      
      if (!activeAccount && demoAccounts.length > 0) {
        setActiveAccount(demoAccounts[0]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const switchAccount = (account: GoogleAdsAccount) => {
    setActiveAccount(account);
    localStorage.setItem('mdmc_active_account', account.id);
    
    // Notifier le changement de compte
    window.dispatchEvent(new CustomEvent('accountSwitched', { 
      detail: { account } 
    }));
  };

  const refreshAccounts = async () => {
    await loadAccounts();
  };

  const value: AccountContextType = {
    availableAccounts,
    activeAccount,
    isLoading,
    error,
    switchAccount,
    refreshAccounts,
  };

  return (
    <AccountContext.Provider value={value}>
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount(): AccountContextType {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
}
