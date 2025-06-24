# Guide de déploiement Railway - MDMC Reporting Backend

## 🚀 Solutions pour le bug de déploiement Express 5.x

### Problème résolu
L'erreur `TypeError: Missing parameter name at 1: https://git.new/pathToRegexpError` était causée par un conflit entre Express 5.x et la route catch-all `app.use('*')`.

### ✅ Solutions appliquées

#### 1. Solution définitive (appliquée)
Le `package.json` a été modifié pour utiliser `server-minimal.js` par défaut :
```json
{
  "scripts": {
    "start": "node server-minimal.js",
    "start-full": "node server.js"
  }
}
```

#### 2. Script de backup disponible
Si vous voulez utiliser `server.js` corrigé plus tard :
```bash
npm run start-full
```

### 🔧 Configuration Railway

**✅ Automatique :** Railway utilisera maintenant `server-minimal.js` par défaut via `npm start`

**Pas de modification nécessaire** dans Railway - le redéploiement sera automatique.

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
