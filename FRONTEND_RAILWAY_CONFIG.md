# Configuration Frontend Railway - MDMC Reporting

## 🌍 Variables d'environnement à configurer dans Railway

Pour que votre frontend communique avec le backend, ajoutez cette variable dans les Settings > Variables de votre service **mdmcreporting** (frontend) :

### Variables obligatoires

```bash
VITE_API_BASE_URL=https://mdmcreporting-backend-production.up.railway.app
```

### Comment l'ajouter dans Railway :

1. **Allez dans votre service frontend** `mdmcreporting`
2. **Cliquez sur "Variables"** dans le menu latéral
3. **Ajoutez une nouvelle variable :**
   - **Nom :** `VITE_API_BASE_URL`
   - **Valeur :** `https://mdmcreporting-backend-production.up.railway.app`
4. **Sauvegardez** - Railway redéploiera automatiquement

## 🔧 Comment ça fonctionne

### Développement local :
```bash
# .env (pour développement)
VITE_API_BASE_URL=http://localhost:3001
```

### Production Railway :
```bash
# Variable Railway (pour production)
VITE_API_BASE_URL=https://mdmcreporting-backend-production.up.railway.app
```

## 📁 Fichiers modifiés

- `src/services/api.ts` - Utilise `import.meta.env.VITE_API_BASE_URL`
- `src/services/ApiService.js` - Utilise `import.meta.env.VITE_API_BASE_URL`
- `.env` - Valeurs de développement
- `.env.production` - Template pour production

## ✅ Test de connexion

Après configuration, testez :
1. Backend : `https://mdmcreporting-backend-production.up.railway.app/health`
2. Frontend : `https://mdmcreporting-production.up.railway.app`

## 🚀 Avantages

- ✅ **Flexible** - Change facilement entre dev/prod
- ✅ **Sécurisé** - Pas d'URLs codées en dur
- ✅ **Maintenable** - Centralisé dans les variables d'environnement
- ✅ **Compatible Vite** - Utilise la syntaxe `import.meta.env`

**Note :** Les variables `VITE_*` sont exposées côté client et automatiquement intégrées au build par Vite.
