# Guide de Déploiement - MDMC Reporting (Versions Corrigées)

## 🚀 Étapes de Déploiement

### 1. Configuration Railway Frontend

Dans Railway, dans votre service frontend `mdmcreporting`, configurez cette variable d'environnement :

```bash
VITE_API_BASE_URL=https://mdmcreporting-backend-production.up.railway.app
```

**⚠️ Important** : L'URL ne doit PAS contenir `/api` à la fin !

### 2. Fichiers Corrigés

Les corrections suivantes ont été appliquées :

#### `src/hooks/useGoogleAdsData.js`
```javascript
// ✅ CORRIGÉ
const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'}/api`;
```

#### `src/contexts/PremiumContext.tsx`
```typescript
// ✅ CORRIGÉ
const response = await fetch(`${API_BASE_URL}/health`);
```

#### `src/services/api.ts`
```typescript
// ✅ CORRIGÉ
class ApiService {
  private baseURL = `${API_BASE_URL}/api`;
}
```

### 3. Validation Backend

Le backend Railway est **OPÉRATIONNEL** avec tous les endpoints :

- ✅ `/health` - Status du serveur
- ✅ `/api/config-check` - Configuration complète
- ✅ `/api/accounts` - API Google Ads configurée
- ✅ `/api/metrics` - Métriques disponibles
- ✅ `/api/campaigns` - Campagnes disponibles
- ✅ `/api/device-comparison` - Comparaison d'appareils

### 4. Test de Connectivité

Pour vérifier que tout fonctionne :

1. **Backend Health Check** :
   ```bash
   curl https://mdmcreporting-backend-production.up.railway.app/health
   ```

2. **Frontend en production** :
   - Vérifiez que le statut backend s'affiche comme "IA Active"
   - Testez l'importation de données Google Ads

### 5. URLs Finales

Une fois déployé :
- **Frontend** : `https://mdmcreporting-production.up.railway.app`
- **Backend** : `https://mdmcreporting-backend-production.up.railway.app`

## 🔧 Architecture des URLs

```
Production:
┌─ https://mdmcreporting-backend-production.up.railway.app
├── /health (PremiumContext)
├── /api/metrics (useGoogleAdsData)
├── /api/campaigns (useGoogleAdsData)
├── /api/device-comparison (useGoogleAdsData)
├── /api/accounts (ApiService)
└── /api/google-ads/accounts (api.ts)

Development:
┌─ http://localhost:3001
├── /health (PremiumContext)
├── /api/metrics (useGoogleAdsData)
├── /api/campaigns (useGoogleAdsData)
├── /api/device-comparison (useGoogleAdsData)
├── /api/accounts (ApiService)
└── /api/google-ads/accounts (api.ts)
```

## ✅ Checklist Final

- [ ] Variable `VITE_API_BASE_URL` configurée dans Railway
- [ ] Fichiers corrigés déployés sur GitHub
- [ ] Railway redéploie automatiquement le frontend
- [ ] Test de connexion frontend-backend
- [ ] Vérification du statut "IA Active" dans l'interface
- [ ] Test d'importation de données Google Ads

## 🎯 Résultat Attendu

Après déploiement, l'application affichera :
- **Statut Backend** : "IA Active (X sessions)"
- **Connexion** : Fonctionnelle entre frontend et backend
- **APIs** : Toutes les routes Google Ads accessibles
- **Erreurs** : Aucune erreur de connexion dans la console

**Toutes les corrections sont maintenant cohérentes et le backend Railway est parfaitement opérationnel !**
