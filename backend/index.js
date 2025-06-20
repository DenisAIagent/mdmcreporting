import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { v4 as uuidv4 } from 'uuid';
import GoogleAdsService from './services/googleAdsService.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware de sécurité et configuration
app.use(helmet());
app.use(express.json({ limit: '10mb' }));
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'], // Vite et React dev servers
  credentials: true
}));

// Configuration de l'API Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Instance du service Google Ads
const googleAdsService = new GoogleAdsService();

// Prompt système optimisé pour Google Ads et MDMC
const systemPrompt = `
Tu es l'assistant IA de MDMC (l'expert en marketing digital et campagnes publicitaires). Tu analyses les requêtes relatives aux campagnes Google Ads gérées via un compte MCC (My Client Center).

Ta mission est de transformer les requêtes en langage naturel en objets JSON structurés pour interroger l'API Google Ads.

STRUCTURE JSON OBLIGATOIRE :
{
  "intent": "analysis | export | comparison | summary",
  "reportType": "campaign_performance | adgroup_performance | keyword_performance | account_overview",
  "dateRange": {
    "startDate": "YYYY-MM-DD",
    "endDate": "YYYY-MM-DD",
    "period": "today | yesterday | last_7_days | last_30_days | last_90_days | last_12_months | custom"
  },
  "accounts": ["all" | ["account_id_1", "account_id_2"]],
  "metrics": [
    "impressions", "clicks", "cost_micros", "conversions", "conversions_value",
    "conversions_from_interactions_rate", "average_cpc", "ctr", "roas"
  ],
  "dimensions": [
    "campaign_name", "ad_group_name", "keyword_text", "device", "date"
  ],
  "filters": [
    {
      "field": "campaign_status",
      "operator": "EQUALS | NOT_EQUALS | CONTAINS | GREATER_THAN | LESS_THAN",
      "value": "ENABLED"
    }
  ],
  "orderBy": {
    "field": "conversions | cost_micros | roas | clicks",
    "sortOrder": "ASC | DESC"
  },
  "limit": 50,
  "exportFormat": "json | pdf | xlsx | csv | null"
}

RÈGLES IMPORTANTES :
- Date actuelle : ${new Date().toISOString().split('T')[0]}
- Si période non spécifiée, utilise "last_30_days"
- Pour "18 derniers mois" utilise period: "custom" avec les dates calculées
- Choisis les métriques les plus pertinentes selon le contexte
- orderBy par défaut sur "conversions" DESC
- limit par défaut à 50
- Si pas d'export demandé, exportFormat = null

EXEMPLES DE CONVERSION :
"Campagnes des 18 derniers mois triées par ROAS en PDF" →
{
  "intent": "export",
  "reportType": "campaign_performance",
  "dateRange": {
    "startDate": "2023-11-20",
    "endDate": "2025-06-20",
    "period": "custom"
  },
  "accounts": ["all"],
  "metrics": ["roas", "conversions", "cost_micros", "conversions_value"],
  "dimensions": ["campaign_name"],
  "orderBy": {"field": "roas", "sortOrder": "DESC"},
  "exportFormat": "pdf"
}

Réponds UNIQUEMENT avec l'objet JSON, rien d'autre.
`;

// Sessions de chat (en mémoire pour le développement)
const chatSessions = new Map();

// Endpoint principal pour le chat IA
app.post('/api/chat', async (req, res) => {
  const { message, sessionId } = req.body;

  if (!message) {
    return res.status(400).json({ 
      error: 'Le message est obligatoire',
      success: false 
    });
  }

  const currentSessionId = sessionId || uuidv4();

  try {
    console.log(`[${new Date().toISOString()}] Nouvelle requête chat:`, message);

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro-latest",
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.1, // Faible température pour plus de cohérence
        responseMimeType: "application/json",
      }
    });

    // Récupération ou création de session
    let chat;
    if (chatSessions.has(currentSessionId)) {
      chat = chatSessions.get(currentSessionId);
    } else {
      chat = model.startChat({
        history: [
          { role: "user", parts: [{ text: systemPrompt }] },
          { role: "model", parts: [{ text: "Prêt à analyser vos requêtes Google Ads pour MDMC. Envoyez-moi votre demande." }] },
        ]
      });
      chatSessions.set(currentSessionId, chat);
    }

    const result = await chat.sendMessage(message);
    const response = await result.response;
    let jsonResponse;

    try {
      jsonResponse = JSON.parse(response.text());
    } catch (parseError) {
      console.error('Erreur de parsing JSON:', parseError);
      return res.status(500).json({ 
        error: 'Erreur de format de réponse IA',
        success: false 
      });
    }

    // Validation basique du JSON
    if (!jsonResponse.intent || !jsonResponse.reportType) {
      return res.status(400).json({
        error: 'Requête mal comprise. Pouvez-vous reformuler votre demande ?',
        success: false
      });
    }

    console.log(`[${new Date().toISOString()}] Réponse générée:`, JSON.stringify(jsonResponse, null, 2));

    res.json({
      success: true,
      sessionId: currentSessionId,
      query: jsonResponse,
      originalMessage: message,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Erreur lors de l\'appel à l\'API Gemini:', error);
    res.status(500).json({ 
      error: 'Erreur interne du serveur. Veuillez réessayer.',
      success: false 
    });
  }
});

// Endpoint pour obtenir les informations de session
app.get('/api/session/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  
  if (chatSessions.has(sessionId)) {
    res.json({ 
      success: true, 
      sessionActive: true,
      sessionId 
    });
  } else {
    res.json({ 
      success: true, 
      sessionActive: false 
    });
  }
});

// Endpoint pour nettoyer une session
app.delete('/api/session/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  
  if (chatSessions.has(sessionId)) {
    chatSessions.delete(sessionId);
    res.json({ 
      success: true, 
      message: 'Session supprimée' 
    });
  } else {
    res.json({ 
      success: true, 
      message: 'Session inexistante' 
    });
  }
});

// Endpoint de santé
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'MDMC Backend IA',
    timestamp: new Date().toISOString(),
    activeSessions: chatSessions.size
  });
});

// Endpoint de test rapide
app.post('/api/test', async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
    const result = await model.generateContent("Dis bonjour");
    const response = await result.response;
    
    res.json({ 
      success: true, 
      message: 'API Gemini fonctionnelle',
      response: response.text()
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Erreur de connexion Gemini' 
    });
  }
});

// ENDPOINTS GOOGLE ADS AUTHENTIFICATION

// Obtenir l'URL d'authentification Google
app.get('/api/google-ads/auth-url', (req, res) => {
  try {
    const authUrl = googleAdsService.getAuthUrl();
    res.json({ 
      success: true, 
      authUrl,
      message: 'URL d\'authentification générée'
    });
  } catch (error) {
    console.error('Erreur génération URL auth:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Erreur lors de la génération de l\'URL d\'authentification' 
    });
  }
});

// Échanger le code d'autorisation contre des tokens
app.post('/api/google-ads/auth-callback', async (req, res) => {
  const { code } = req.body;
  
  if (!code) {
    return res.status(400).json({ 
      success: false, 
      error: 'Code d\'autorisation requis' 
    });
  }

  try {
    const tokens = await googleAdsService.getTokensFromCode(code);
    
    // En production, sauvegarder ces tokens en base de données associés à l'utilisateur
    console.log('Tokens Google Ads obtenus:', {
      expires_at: tokens.expires_at,
      hasAccessToken: !!tokens.access_token,
      hasRefreshToken: !!tokens.refresh_token
    });

    res.json({ 
      success: true, 
      tokens,
      message: 'Authentification Google Ads réussie'
    });
  } catch (error) {
    console.error('Erreur callback auth:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Erreur lors de l\'authentification Google Ads' 
    });
  }
});

// Initialiser la connexion Google Ads
app.post('/api/google-ads/initialize', async (req, res) => {
  const { accessToken, refreshToken } = req.body;
  
  if (!accessToken || !refreshToken) {
    return res.status(400).json({ 
      success: false, 
      error: 'Tokens d\'accès requis' 
    });
  }

  try {
    await googleAdsService.initializeClient(accessToken, refreshToken);
    
    res.json({ 
      success: true, 
      message: 'Client Google Ads initialisé avec succès'
    });
  } catch (error) {
    console.error('Erreur initialisation client:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Erreur lors de l\'initialisation du client Google Ads' 
    });
  }
});

// ENDPOINTS GOOGLE ADS DATA

// Récupérer les comptes accessibles
app.get('/api/google-ads/accounts', async (req, res) => {
  try {
    const accounts = await googleAdsService.getAccessibleAccounts();
    
    res.json({ 
      success: true, 
      accounts,
      count: accounts.length
    });
  } catch (error) {
    console.error('Erreur récupération comptes:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Récupérer les campagnes d'un compte
app.get('/api/google-ads/campaigns/:customerId', async (req, res) => {
  const { customerId } = req.params;
  const filters = req.query;
  
  try {
    const campaigns = await googleAdsService.getCampaigns(customerId, filters);
    
    res.json({ 
      success: true, 
      campaigns,
      count: campaigns.length,
      customerId
    });
  } catch (error) {
    console.error('Erreur récupération campagnes:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Exécuter une requête IA générée vers Google Ads
app.post('/api/google-ads/execute-query', async (req, res) => {
  const { customerId, queryConfig } = req.body;
  
  if (!customerId || !queryConfig) {
    return res.status(400).json({ 
      success: false, 
      error: 'Customer ID et configuration de requête requis' 
    });
  }

  try {
    const results = await googleAdsService.executeCustomQuery(customerId, queryConfig);
    
    res.json({ 
      success: true, 
      results,
      customerId,
      queryConfig
    });
  } catch (error) {
    console.error('Erreur exécution requête Google Ads:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Tester la connexion Google Ads
app.post('/api/google-ads/test-connection', async (req, res) => {
  const { customerId } = req.body;
  
  if (!customerId) {
    return res.status(400).json({ 
      success: false, 
      error: 'Customer ID requis pour le test' 
    });
  }

  try {
    const testResult = await googleAdsService.testConnection(customerId);
    
    res.json({ 
      success: testResult.success, 
      message: testResult.message,
      error: testResult.error,
      customerId
    });
  } catch (error) {
    console.error('Erreur test connexion:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// ENDPOINT INTÉGRÉ IA + GOOGLE ADS

// Chat IA avec exécution automatique sur Google Ads
app.post('/api/chat-with-execution', async (req, res) => {
  const { message, sessionId, customerId, executeOnGoogleAds = false } = req.body;
  
  if (!message || message.trim().length === 0) {
    return res.status(400).json({ 
      error: 'Message requis',
      success: false 
    });
  }

  try {
    // Étape 1: Générer la requête structurée avec l'IA
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
    const prompt = systemPrompt + `\n\nRequête utilisateur: "${message}"\n\nRéponds uniquement avec le JSON structuré:`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    let jsonResponse;
    try {
      jsonResponse = JSON.parse(response.text());
    } catch (parseError) {
      return res.status(500).json({ 
        error: 'Erreur de format de réponse IA',
        success: false 
      });
    }

    let googleAdsResults = null;
    
    // Étape 2: Exécuter sur Google Ads si demandé et configuré
    if (executeOnGoogleAds && customerId && jsonResponse.intent && jsonResponse.reportType) {
      try {
        googleAdsResults = await googleAdsService.executeCustomQuery(customerId, jsonResponse);
      } catch (adsError) {
        console.error('Erreur exécution Google Ads:', adsError);
        // On continue sans les données Google Ads
      }
    }

    res.json({
      success: true,
      sessionId: sessionId || uuidv4(),
      aiQuery: jsonResponse,
      googleAdsResults: googleAdsResults,
      originalMessage: message,
      timestamp: new Date().toISOString(),
      hasRealData: !!googleAdsResults
    });

  } catch (error) {
    console.error('Erreur chat avec exécution:', error);
    res.status(500).json({ 
      error: 'Erreur interne du serveur',
      success: false 
    });
  }
});

// Gestionnaire d'erreurs global
app.use((err, req, res, next) => {
  console.error('Erreur serveur:', err);
  res.status(500).json({ 
    error: 'Erreur interne du serveur',
    success: false 
  });
});

// Nettoyage périodique des sessions (toutes les heures)
setInterval(() => {
  const oneHourAgo = Date.now() - 60 * 60 * 1000;
  chatSessions.forEach((value, key) => {
    // Logique simple : on garde toutes les sessions actives pour le développement
    // En production, on pourrait ajouter un timestamp pour nettoyer les anciennes
  });
}, 60 * 60 * 1000);

app.listen(port, () => {
  console.log(`
🚀 Serveur MDMC Backend IA démarré !
📍 URL: http://localhost:${port}
🤖 IA: Gemini 2.5 Pro configuré
📊 Google Ads: Prêt pour l'intégration
⚡ Sessions actives: ${chatSessions.size}
  `);
});
