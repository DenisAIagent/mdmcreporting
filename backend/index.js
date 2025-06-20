import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { v4 as uuidv4 } from 'uuid';

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
