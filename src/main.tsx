import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './styles/mdmc-premium.css'; // ⭐ Design System Premium MDMC
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,      // 5 min - Données "fraîches"
      gcTime: 30 * 60 * 1000,        // 30 min - Cache mémoire (anciennement cacheTime)
      retry: (failureCount, error) => {
        // Vérifier si c'est une erreur HTTP avec status
        if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
          return false;
        }
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: 'always',
    },
    mutations: {
      retry: 1,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
