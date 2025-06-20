import { GoogleAdsApi } from 'google-ads-api';
import { OAuth2Client } from 'google-auth-library';

class GoogleAdsService {
  constructor() {
    this.developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN || 'CxDKMTI2CrPhkaNgHtwkoA';
    this.clientId = process.env.GOOGLE_CLIENT_ID;
    this.clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    
    // Client OAuth2 pour l'authentification
    this.oauth2Client = new OAuth2Client(
      this.clientId,
      this.clientSecret,
      process.env.GOOGLE_REDIRECT_URI || 'http://localhost:5173/auth/callback'
    );

    // Client Google Ads API
    this.googleAdsClient = null;
  }

  // Générer l'URL d'authentification Google
  getAuthUrl() {
    const scopes = [
      'https://www.googleapis.com/auth/adwords',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile'
    ];

    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent'
    });
  }

  // Échanger le code d'autorisation contre les tokens
  async getTokensFromCode(code) {
    try {
      const { tokens } = await this.oauth2Client.getToken(code);
      this.oauth2Client.setCredentials(tokens);
      
      return {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expires_at: tokens.expiry_date
      };
    } catch (error) {
      throw new Error(`Erreur lors de l'échange du code: ${error.message}`);
    }
  }

  // Initialiser le client Google Ads avec les tokens
  async initializeClient(accessToken, refreshToken) {
    try {
      this.googleAdsClient = new GoogleAdsApi({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        developer_token: this.developerToken,
        refresh_token: refreshToken,
        access_token: accessToken
      });

      return true;
    } catch (error) {
      throw new Error(`Erreur d'initialisation Google Ads: ${error.message}`);
    }
  }

  // Récupérer les comptes accessibles
  async getAccessibleAccounts(customerId = null) {
    if (!this.googleAdsClient) {
      throw new Error('Client Google Ads non initialisé');
    }

    try {
      const customer = this.googleAdsClient.Customer({ 
        customer_id: customerId || process.env.GOOGLE_ADS_CUSTOMER_ID 
      });

      const query = `
        SELECT 
          customer.id,
          customer.descriptive_name,
          customer.currency_code,
          customer.time_zone,
          customer.test_account,
          customer.manager,
          customer.status
        FROM customer
        WHERE customer.status = 'ENABLED'
      `;

      const accounts = await customer.report({ query });
      
      return accounts.map(account => ({
        id: account.customer.id,
        name: account.customer.descriptive_name,
        currencyCode: account.customer.currency_code,
        timeZone: account.customer.time_zone,
        isTestAccount: account.customer.test_account,
        isManager: account.customer.manager,
        status: account.customer.status
      }));
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des comptes: ${error.message}`);
    }
  }

  // Récupérer les campagnes d'un compte
  async getCampaigns(customerId, filters = {}) {
    if (!this.googleAdsClient) {
      throw new Error('Client Google Ads non initialisé');
    }

    try {
      const customer = this.googleAdsClient.Customer({ customer_id: customerId });

      let query = `
        SELECT 
          campaign.id,
          campaign.name,
          campaign.status,
          campaign.advertising_channel_type,
          campaign.bidding_strategy_type,
          campaign.start_date,
          campaign.end_date,
          campaign_budget.amount_micros
        FROM campaign
        WHERE campaign.status IN ('ENABLED', 'PAUSED')
      `;

      // Ajouter des filtres si spécifiés
      if (filters.status) {
        query += ` AND campaign.status = '${filters.status}'`;
      }
      if (filters.dateRange) {
        query += ` AND segments.date >= '${filters.dateRange.startDate}'`;
        query += ` AND segments.date <= '${filters.dateRange.endDate}'`;
      }

      query += ` ORDER BY campaign.name`;

      const campaigns = await customer.report({ query });
      
      return campaigns.map(campaign => ({
        id: campaign.campaign.id,
        name: campaign.campaign.name,
        status: campaign.campaign.status,
        type: campaign.campaign.advertising_channel_type,
        biddingStrategy: campaign.campaign.bidding_strategy_type,
        startDate: campaign.campaign.start_date,
        endDate: campaign.campaign.end_date,
        budgetMicros: campaign.campaign_budget?.amount_micros
      }));
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des campagnes: ${error.message}`);
    }
  }

  // Exécuter une requête personnalisée (depuis l'IA)
  async executeCustomQuery(customerId, queryConfig) {
    if (!this.googleAdsClient) {
      throw new Error('Client Google Ads non initialisé');
    }

    try {
      const customer = this.googleAdsClient.Customer({ customer_id: customerId });

      // Construire la requête GAQL à partir de la configuration IA
      let query = 'SELECT ';
      
      // Ajouter les métriques
      if (queryConfig.metrics && queryConfig.metrics.length > 0) {
        query += queryConfig.metrics.join(', ');
      }
      
      // Ajouter les dimensions
      if (queryConfig.dimensions && queryConfig.dimensions.length > 0) {
        if (queryConfig.metrics && queryConfig.metrics.length > 0) {
          query += ', ';
        }
        query += queryConfig.dimensions.join(', ');
      }

      // FROM clause basée sur le type de rapport
      query += ` FROM ${this.getTableFromReportType(queryConfig.reportType)}`;

      // WHERE clause pour les filtres
      if (queryConfig.filters && queryConfig.filters.length > 0) {
        query += ' WHERE ';
        const filterConditions = queryConfig.filters.map(filter => 
          `${filter.field} ${filter.operator} '${filter.value}'`
        );
        query += filterConditions.join(' AND ');
      }

      // Date range
      if (queryConfig.dateRange) {
        const dateFilter = query.includes('WHERE') ? ' AND ' : ' WHERE ';
        query += `${dateFilter}segments.date >= '${queryConfig.dateRange.startDate}'`;
        query += ` AND segments.date <= '${queryConfig.dateRange.endDate}'`;
      }

      // ORDER BY
      if (queryConfig.orderBy) {
        query += ` ORDER BY ${queryConfig.orderBy}`;
      }

      console.log('Requête GAQL générée:', query);

      const results = await customer.report({ query });
      
      return {
        query: query,
        data: results,
        count: results.length
      };
    } catch (error) {
      throw new Error(`Erreur lors de l'exécution de la requête: ${error.message}`);
    }
  }

  // Mapper le type de rapport vers la table GAQL
  getTableFromReportType(reportType) {
    const tableMap = {
      'campaign_performance': 'campaign',
      'adgroup_performance': 'ad_group',
      'keyword_performance': 'keyword_view',
      'account_overview': 'customer',
      'geographic_performance': 'geographic_view',
      'device_performance': 'campaign'
    };

    return tableMap[reportType] || 'campaign';
  }

  // Tester la connexion
  async testConnection(customerId) {
    try {
      const customer = this.googleAdsClient.Customer({ customer_id: customerId });
      
      const query = `
        SELECT customer.id, customer.descriptive_name 
        FROM customer 
        LIMIT 1
      `;
      
      await customer.report({ query });
      return { success: true, message: 'Connexion Google Ads réussie' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

export default GoogleAdsService;
