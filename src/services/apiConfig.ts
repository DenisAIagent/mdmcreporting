// Configuration centralisée de l'API
export const API_CONFIG = {
  // URL de base selon l'environnement
  BASE_URL: import.meta.env.VITE_API_URL || 
    (import.meta.env.PROD 
      ? 'https://mdmcreporting-backend-production.up.railway.app/api'
      : 'http://localhost:3001/api'
    ),
  
  // Timeout des requêtes
  TIMEOUT: 10000,
  
  // Headers par défaut
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  }
};

// Fonction utilitaire pour construire les URLs
export const buildApiUrl = (endpoint: string): string => {
  const baseUrl = API_CONFIG.BASE_URL.replace(/\/$/, ''); // Enlever le slash final
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
};

// Debug en développement
if (import.meta.env.DEV) {
  console.log('🔧 Configuration API:', {
    BASE_URL: API_CONFIG.BASE_URL,
    ENV: import.meta.env.MODE,
    VITE_API_URL: import.meta.env.VITE_API_URL
  });
} 