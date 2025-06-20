#!/bin/bash

# 🚀 Script de démarrage automatique MDMC Reporting IA
# Démarre le backend et le frontend automatiquement

echo "🚀 Démarrage du projet MDMC Reporting IA"
echo "========================================"

# Vérification de Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Vérification et installation des dépendances du backend
echo ""
echo "🔧 Configuration du backend IA..."
cd backend

if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances backend..."
    npm install
fi

# Vérification de la clé API
if [ ! -f ".env" ]; then
    echo "⚠️  Fichier .env manquant ! Création automatique..."
    echo "GEMINI_API_KEY=AIzaSyCkUJvI-38dYytMks6imawl0NW1-CG8nN0" > .env
    echo "PORT=3001" >> .env
    echo "NODE_ENV=development" >> .env
fi

echo "✅ Backend configuré"

# Configuration du frontend
echo ""
echo "🎨 Configuration du frontend..."
cd ..

if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances frontend..."
    npm install
fi

echo "✅ Frontend configuré"

# Démarrage du backend en arrière-plan
echo ""
echo "🤖 Démarrage du serveur IA backend..."
cd backend
npm start &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"

# Attendre que le backend démarre
echo "⏳ Attente du démarrage du backend..."
sleep 5

# Test de connexion backend
echo "🔍 Test de connexion backend..."
if curl -f http://localhost:3001/api/health &> /dev/null; then
    echo "✅ Backend IA opérationnel sur http://localhost:3001"
else
    echo "⚠️  Backend en cours de démarrage..."
fi

# Démarrage du frontend en arrière-plan
echo ""
echo "🎨 Démarrage du frontend React..."
cd ..
npm run dev &
FRONTEND_PID=$!
echo "Frontend PID: $FRONTEND_PID"

# Attendre que le frontend démarre
echo "⏳ Attente du démarrage du frontend..."
sleep 8

echo ""
echo "🎉 MDMC Reporting IA démarré avec succès !"
echo "========================================="
echo "🤖 Backend IA : http://localhost:3001"
echo "🎨 Frontend   : http://localhost:5173"
echo "🎭 Démo       : http://localhost:5173/demo"
echo ""
echo "📋 Commandes utiles :"
echo "- Arrêter backend  : kill $BACKEND_PID"
echo "- Arrêter frontend : kill $FRONTEND_PID"
echo "- Arrêter tout     : pkill -f 'node index.js' && pkill -f vite"
echo ""
echo "💡 Astuce : Accédez directement à la démonstration !"
echo "   👉 http://localhost:5173/demo"
echo ""

# Garder le script actif
echo "🔄 Surveillance des processus... (Ctrl+C pour arrêter tout)"
wait
