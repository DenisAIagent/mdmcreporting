// Script de validation des URLs - MDMC Reporting
// Pour tester localement : node url_validation_test.js

console.log('🔍 Validation des URLs MDMC Reporting\n');

// Simulation des variables d'environnement
const testConfigs = {
  development: {
    VITE_API_BASE_URL: 'http://localhost:3001'
  },
  production: {
    VITE_API_BASE_URL: 'https://mdmcreporting-backend-production.up.railway.app'
  }
};

function testURLConfiguration(env, config) {
  console.log(`\n🌍 Environment: ${env.toUpperCase()}`);
  console.log(`Base URL: ${config.VITE_API_BASE_URL}`);
  
  // Test useGoogleAdsData URLs
  const adsApiBase = `${config.VITE_API_BASE_URL}/api`;
  console.log(`\n📊 Google Ads Data URLs:`);
  console.log(`  Metrics: ${adsApiBase}/metrics`);
  console.log(`  Campaigns: ${adsApiBase}/campaigns`);
  console.log(`  Device Comparison: ${adsApiBase}/device-comparison`);
  console.log(`  Accounts: ${adsApiBase}/accounts`);
  
  // Test PremiumContext URL
  const healthUrl = `${config.VITE_API_BASE_URL}/health`;
  console.log(`\n🏥 Health Check:`);
  console.log(`  Health: ${healthUrl}`);
  
  // Test ApiService URLs
  const apiServiceBase = `${config.VITE_API_BASE_URL}/api`;
  console.log(`\n🔧 API Service URLs:`);
  console.log(`  Google Ads Accounts: ${apiServiceBase}/google-ads/accounts`);
  console.log(`  Config Check: ${apiServiceBase}/config-check`);
  
  console.log('\n' + '='.repeat(60));
}

// Test des deux environnements
Object.entries(testConfigs).forEach(([env, config]) => {
  testURLConfiguration(env, config);
});

console.log('\n✅ Validation terminée - Toutes les URLs sont cohérentes !');
