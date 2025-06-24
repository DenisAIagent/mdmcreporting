require('dotenv').config();

console.log('🔍 Debug - Variables d\'environnement:');
console.log('CUSTOMER_ID:', process.env.CUSTOMER_ID ? '✅ Présent' : '❌ Manquant');
console.log('GOOGLE_ADS_CLIENT_ID:', process.env.GOOGLE_ADS_CLIENT_ID ? '✅ Présent' : '❌ Manquant');
console.log('GOOGLE_ADS_DEVELOPER_TOKEN:', process.env.GOOGLE_ADS_DEVELOPER_TOKEN ? '✅ Présent' : '❌ Manquant');
console.log('GOOGLE_ADS_REFRESH_TOKEN:', process.env.GOOGLE_ADS_REFRESH_TOKEN ? '✅ Présent' : '❌ Manquant');

const express = require('express');
const app = express();

// Configuration CORS simple et compatible
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Middleware JSON
app.use(express.json());

// ✅ ROUTES PRINCIPALES (sans patterns complexes)
app.get('/', (req, res) => {
  res.json({
    message: 'MDMC Reporting Backend is running...',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3001
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3001,
    message: 'Backend API is running'
  });
});

app.get('/api/config-check', (req, res) => {
  const config = {
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3001,
    hasCustomerId: !!process.env.CUSTOMER_ID,
    hasClientId: !!process.env.GOOGLE_ADS_CLIENT_ID,
    hasClientSecret: !!process.env.GOOGLE_ADS_CLIENT_SECRET,
    hasDeveloperToken: !!process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
    hasRefreshToken: !!process.env.GOOGLE_ADS_REFRESH_TOKEN,
    timestamp: new Date().toISOString()
  };

  const missingVars = [];
  if (!config.hasCustomerId) missingVars.push('CUSTOMER_ID');
  if (!config.hasClientId) missingVars.push('GOOGLE_ADS_CLIENT_ID');
  if (!config.hasClientSecret) missingVars.push('GOOGLE_ADS_CLIENT_SECRET');
  if (!config.hasDeveloperToken) missingVars.push('GOOGLE_ADS_DEVELOPER_TOKEN');
  if (!config.hasRefreshToken) missingVars.push('GOOGLE_ADS_REFRESH_TOKEN');

  res.json({
    success: missingVars.length === 0,
    config,
    missingVariables: missingVars,
    message: missingVars.length === 0 
      ? 'Configuration complète' 
      : `Variables manquantes: ${missingVars.join(', ')}`
  });
});

app.get('/api/accounts', (req, res) => {
  res.json({
    success: true,
    message: 'Backend fonctionnel - Google Ads API non configurée',
    accounts: [],
    timestamp: new Date().toISOString()
  });
});

// ✅ ROUTES SPÉCIFIQUES ASSETS (sans patterns complexes)
app.get('/favicon.ico', (req, res) => {
  res.status(204).end(); // No Content
});

app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow: /api/\nAllow: /health');
});

// ❌ SUPPRESSION de toutes les routes catch-all problématiques !
// Pas de app.use('*'), pas de app.get(['*.ico', ...]), etc.
// Express gérera les 404 naturellement

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});
