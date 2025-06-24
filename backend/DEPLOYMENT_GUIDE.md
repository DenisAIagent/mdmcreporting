# Guide de déploiement Railway - MDMC Reporting Backend

## 🚀 Solutions pour le bug de déploiement Express 5.x

### Problème résolu
L'erreur `TypeError: Missing parameter name at 1: https://git.new/pathToRegexpError` était causée par un conflit entre Express 5.x et la route catch-all `app.use('*')`.

### ✅ Solutions disponibles

#### 1. Solution immédiate (recommandée)
Utiliser `server-minimal.js` qui fonctionne parfaitement :
```bash
# Dans Railway, modifier la commande de démarrage vers :
node server-minimal.js
```

#### 2. Solution avec server.js corrigé
Le fichier `server.js` a été corrigé pour remplacer :
- `app.use('*')` par `app.all('*')` pour compatibilité Express 5.x
- Toutes les autres fonctionnalités sont conservées

### 🔧 Configuration Railway

**Commande de démarrage recommandée :**
```bash
node server-minimal.js
```

**Ou si vous préférez server.js :**
```bash
node server.js
```

### 📋 Routes disponibles

Toutes les routes essentielles sont fonctionnelles :
- `GET /health` - Vérification de santé
- `GET /` - Statut du backend
- `GET /api/config-check` - Vérification configuration
- `GET /api/accounts` - Liste des comptes

### 🌍 Variables d'environnement requises

Assurez-vous que ces variables sont configurées dans Railway :
- `CUSTOMER_ID`
- `GOOGLE_ADS_CLIENT_ID`
- `GOOGLE_ADS_CLIENT_SECRET`
- `GOOGLE_ADS_DEVELOPER_TOKEN`
- `GOOGLE_ADS_REFRESH_TOKEN`
- `NODE_ENV` (production)
- `PORT` (automatique sur Railway)

### 🎯 Test après déploiement

1. Vérifiez `/health` pour confirmer que le serveur démarre
2. Consultez les logs Railway pour les messages de démarrage
3. Testez `/api/config-check` pour valider la configuration

Date de correction : 24 juin 2025
