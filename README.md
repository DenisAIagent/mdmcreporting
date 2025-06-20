# 🚀 MDMC Reporting IA - Assistant IA pour Google Ads

Une plateforme révolutionnaire d'analyse Google Ads propulsée par l'intelligence artificielle Gemini 2.5 Pro. Transformez vos requêtes en langage naturel en analyses précises et exports automatisés.

![MDMC Logo](./public/assets/MDMC_logo_noir%20fond%20transparent.png)

## ✨ Fonctionnalités

### 🤖 Assistant IA Conversationnel
- **Requêtes en langage naturel** : "Montre-moi les campagnes des 18 derniers mois triées par ROAS"
- **Compréhension contextuelle** : Gemini 2.5 Pro optimisé pour Google Ads
- **Réponses intelligentes** : Analyses détaillées et recommandations

### 📊 Analyses Google Ads Avancées
- **Performance des campagnes** : Métriques détaillées, comparaisons temporelles
- **Analyse des mots-clés** : Identification des termes les plus performants
- **Groupes d'annonces** : Optimisation des performances par groupe
- **Vue d'ensemble multi-comptes** : Gestion centralisée via MCC

### 📋 Exports Automatisés
- **PDF** : Rapports professionnels prêts à présenter
- **Excel** : Données structurées pour analyses approfondies
- **CSV** : Format universel pour intégrations tiers
- **JSON** : Données brutes pour développeurs

### 🎨 Interface Moderne
- **Design MDMC** : Charte graphique respectée (rouge, noir, blanc)
- **Responsive** : Optimisé mobile et desktop
- **Intuitive** : Navigation fluide et accessible

## 🏗️ Architecture Technique

```
Frontend (React/TypeScript) ←→ Backend (Node.js/Express) ←→ Gemini 2.5 Pro ←→ Google Ads API
       ↓                                    ↓
   Interface Chat               Génération Automatisée PDF/Excel
```

### Technologies Utilisées

**Frontend :**
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS + Shadcn/UI
- React Query (gestion état)

**Backend :**
- Node.js + Express
- Gemini 2.5 Pro API
- Google Ads API (à venir)
- Architecture REST

**IA :**
- Google Gemini 2.5 Pro
- Prompts optimisés Google Ads
- Mode JSON natif

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+
- Clé API Gemini 2.5 Pro
- Compte Google Ads avec accès MCC

### Installation Complète

```bash
# Cloner le repository
git clone https://github.com/DenisAIagent/mdmcreporting.git
cd mdmcreporting

# Frontend
npm install
npm run dev

# Backend (nouveau terminal)
cd backend
npm install
```

Configurez votre clé API dans `backend/.env` :
```env
GEMINI_API_KEY=votre_cle_api_gemini
PORT=3001
```

### Démarrage Automatique

```bash
# Script de démarrage complet
bash start_mdmc_project.sh
```

### Accès

- **🎭 Démonstration** : http://localhost:5173/demo
- **💬 Chat IA** : http://localhost:5173/chat
- **📊 Dashboard** : http://localhost:5173/dashboard
- **🤖 API Backend** : http://localhost:3001

## 💡 Exemples d'Utilisation

### Requêtes d'Analyse
```
"Montre-moi les 10 meilleures campagnes de ce mois"
"Analyse des mots-clés les plus performants du trimestre"
"Comparaison des performances par appareil (mobile vs desktop)"
"Évolution du ROAS sur les 6 derniers mois"
```

### Requêtes d'Export
```
"Export PDF des campagnes triées par conversions"
"Données Excel des mots-clés sur 18 mois"
"Rapport CSV des performances par groupe d'annonces"
"Synthèse PDF du compte X ce trimestre"
```

## 📁 Structure du Projet

```
/
├── src/                    # Frontend React
│   ├── components/
│   │   ├── chat/          # Interface IA conversationnelle
│   │   ├── demo/          # Simulateur démonstration
│   │   ├── dashboard/     # Composants dashboard
│   │   └── ui/            # Composants UI réutilisables
│   ├── pages/
│   │   ├── DemoPage.tsx   # Page démonstration complète
│   │   └── ChatPage.tsx   # Chat IA principal
│   └── styles/
│       └── mdmc-theme.css # Charte graphique MDMC
├── backend/               # Backend Node.js + IA
│   ├── index.js          # Serveur Express + Gemini
│   ├── package.json      # Dépendances backend
│   └── .env             # Configuration sécurisée
├── public/assets/        # Logo MDMC et ressources
├── PROJET_FINAL_COMPLETE.md  # Documentation complète
├── GUIDE_DEMARRAGE.md    # Guide de démarrage rapide
└── start_mdmc_project.sh # Script de démarrage auto
```

## 🔧 Configuration

### Variables d'Environnement

**Backend (`backend/.env`) :**
```env
GEMINI_API_KEY=votre_cle_gemini
PORT=3001
NODE_ENV=development
```

### Intégration Google Ads (Phase 2)

1. **Configuration OAuth2** pour authentification utilisateurs
2. **Connexion API Google Ads** pour récupération données réelles
3. **Gestion des comptes MCC** pour accès multi-clients
4. **Cache Redis** pour optimisation performances

## 📊 Métriques et Analyse

### Métriques Disponibles
- **Impressions, Clics, CTR, CPC, Coût**
- **Conversions, Taux de conversion, ROAS**
- **Quality Score, Position moyenne**

### Dimensions d'Analyse
- **Campagnes, Groupes d'annonces, Mots-clés**
- **Appareils, Géolocalisation, Horaires**

## 🔒 Sécurité

### Bonnes Pratiques
- **Variables d'environnement** : Jamais de clés dans le code
- **Authentification JWT** : Sécurisation des sessions
- **Validation des entrées** : Protection contre injections
- **CORS configuré** : Accès contrôlé

## 💰 Coûts Estimés

### Gemini 2.5 Pro
- **~0.007€ par requête complexe**
- **136 000 requêtes pour 1€**
- **Coût mensuel estimé** : 10-50€ (usage normal)

## 🧪 Tests

### Test Backend
```bash
# Vérification santé API
curl http://localhost:3001/api/health

# Test Gemini
curl -X POST http://localhost:3001/api/test

# Test chat
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Campagnes des 30 derniers jours"}'
```

## 📈 Roadmap

### ✅ Phase 1 (Actuelle)
- [x] Backend IA avec Gemini 2.5 Pro
- [x] Interface chat conversationnelle
- [x] Transformation requêtes → JSON structuré
- [x] Design MDMC intégré

### 🔄 Phase 2 (En cours)
- [ ] Intégration Google Ads API réelle
- [ ] Authentification OAuth2 Google
- [ ] Génération PDF/Excel automatisée
- [ ] Système de cache Redis

### 🔮 Phase 3 (À venir)
- [ ] Alertes automatiques intelligentes
- [ ] Recommandations d'optimisation IA
- [ ] Tableaux de bord personnalisables
- [ ] API publique pour intégrations tierces

## 🤝 Contribution

1. **Fork** le projet
2. **Créez une branche** feature (`git checkout -b feature/AmazingFeature`)
3. **Committez** vos changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** sur la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrez une Pull Request**

## 📞 Support

### Contact
- **Repository** : https://github.com/DenisAIagent/mdmcreporting
- **Issues** : GitHub pour bugs et demandes de fonctionnalités

## 📜 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

**Développé avec ❤️ par MiniMax Agent**

*Ce projet utilise Gemini 2.5 Pro et respecte les meilleures pratiques de sécurité et de performance.*
