const express = require('express');
const AccountController = require('../controllers/AccountController');
// const DashboardController = require('../controllers/DashboardController');

const router = express.Router();
const accountController = new AccountController();
// const dashboardController = new DashboardController();

// Health check simple
router.get('/health', (req, res) => {
  res.json({ 
    status: 'active', 
    activeSessions: 1,
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Health check avancé avec test Google Ads
router.get('/health-advanced', accountController.healthCheck.bind(accountController));

// Account management endpoints
router.get('/accounts', accountController.getAccessibleAccounts.bind(accountController));
router.get('/accounts/:customerId', accountController.getAccountDetails.bind(accountController));
router.post('/accounts/refresh', accountController.refreshAccounts.bind(accountController));

// Dashboard data endpoints - Temporairement désactivées
// router.get('/metrics', dashboardController.getMainMetrics.bind(dashboardController));
// router.get('/campaigns', dashboardController.getCampaignsList.bind(dashboardController));
// router.get('/device-comparison', dashboardController.getDeviceComparison.bind(dashboardController));

// Test endpoint avec gestion d'erreur améliorée
router.get('/test/:customerId', async (req, res) => {
  try {
    const { customerId } = req.params;
    
    if (!customerId) {
      return res.status(400).json({
        success: false,
        error: 'Customer ID is required',
        message: 'Le paramètre customerId est requis',
        timestamp: new Date().toISOString()
      });
    }

    console.log(`🧪 Test de connexion pour le compte ${customerId}...`);
    
    const GoogleAdsService = require('../services/GoogleAdsService');
    const adsService = new GoogleAdsService();
    
    const metrics = await adsService.getAccountMetrics(customerId, 'LAST_7_DAYS');
    
    console.log(`✅ Test réussi pour le compte ${customerId}`);
    
    res.json({
      success: true,
      customerId,
      data: metrics,
      message: 'Test successful - Google Ads API connection working',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error(`❌ Test échoué pour le compte ${req.params.customerId}:`, error);
    
    const errorResponse = {
      success: false,
      error: 'Test failed',
      message: error.message,
      customerId: req.params.customerId,
      timestamp: new Date().toISOString()
    };

    if (process.env.NODE_ENV === 'development') {
      errorResponse.stack = error.stack;
    }

    res.status(500).json(errorResponse);
  }
});

// Route pour vérifier la configuration
router.get('/config-check', (req, res) => {
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

module.exports = router; 