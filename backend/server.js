require('dotenv').config();

// Debug: Vérifier si les variables d'environnement sont chargées
console.log('🔍 Debug - Variables d\'environnement:');
console.log('CUSTOMER_ID:', process.env.CUSTOMER_ID ? '✅ Présent' : '❌ Manquant');
console.log('GOOGLE_ADS_CLIENT_ID:', process.env.GOOGLE_ADS_CLIENT_ID ? '✅ Présent' : '❌ Manquant');
console.log('GOOGLE_ADS_DEVELOPER_TOKEN:', process.env.GOOGLE_ADS_DEVELOPER_TOKEN ? '✅ Présent' : '❌ Manquant');
console.log('GOOGLE_ADS_REFRESH_TOKEN:', process.env.GOOGLE_ADS_REFRESH_TOKEN ? '✅ Présent' : '❌ Manquant');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://mdmcreporting-production.up.railway.app', 'https://mdmcreporting.vercel.app']
    : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route de santé pour Railway
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3001
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'MDMC Reporting Backend is running...',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Route pour vérifier la configuration
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

// Route simple pour les comptes (sans Google Ads pour l'instant)
app.get('/api/accounts', (req, res) => {
  res.json({
    success: true,
    message: 'Backend fonctionnel - Google Ads API non configurée',
    accounts: [],
    timestamp: new Date().toISOString()
  });
});

// Gestionnaire d'erreur global
app.use((err, req, res, next) => {
  console.error('❌ Erreur serveur:', err);
  
  // S'assurer de toujours retourner du JSON
  res.setHeader('Content-Type', 'application/json');
  
  const error = {
    success: false,
    message: err.message || 'Erreur serveur interne',
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method
  };

  if (process.env.NODE_ENV === 'development') {
    error.stack = err.stack;
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json(error);
});

// ✅ Route 404 corrigée pour Express 5.x - utilise app.all() au lieu de app.use()
app.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée',
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});
