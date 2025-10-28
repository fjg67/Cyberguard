#!/bin/bash

# ========================================
# CyberGuard Backend - Quick Start Script
# ========================================

echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║   🛡️  CyberGuard Pro Backend - Setup                      ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js n'est pas installé${NC}"
    echo "Installez Node.js 18+ depuis: https://nodejs.org"
    exit 1
fi

echo -e "${GREEN}✅ Node.js détecté: $(node --version)${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm n'est pas installé${NC}"
    exit 1
fi

echo -e "${GREEN}✅ npm détecté: $(npm --version)${NC}"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  Fichier .env non trouvé${NC}"
    echo ""
    echo "Création du fichier .env depuis .env.development..."
    cp .env.development .env
    echo -e "${GREEN}✅ Fichier .env créé${NC}"
    echo ""
    echo -e "${YELLOW}🔑 IMPORTANT: Éditez le fichier .env et ajoutez votre clé Google Safe Browsing${NC}"
    echo ""
    echo "   nano .env"
    echo ""
    echo "   Remplacez:"
    echo "   GOOGLE_SAFE_BROWSING_KEY=REMPLACER_PAR_VOTRE_CLE_GOOGLE"
    echo ""
    read -p "Appuyez sur Entrée après avoir configuré .env..."
fi

# Check if GOOGLE_SAFE_BROWSING_KEY is configured
if grep -q "REMPLACER_PAR_VOTRE_CLE_GOOGLE" .env; then
    echo -e "${RED}❌ La clé Google Safe Browsing n'est pas configurée dans .env${NC}"
    echo ""
    echo "Éditez .env et remplacez REMPLACER_PAR_VOTRE_CLE_GOOGLE par votre vraie clé"
    exit 1
fi

echo -e "${GREEN}✅ Fichier .env configuré${NC}"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install

    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Erreur lors de l'installation des dépendances${NC}"
        exit 1
    fi

    echo -e "${GREEN}✅ Dépendances installées${NC}"
    echo ""
else
    echo -e "${GREEN}✅ Dépendances déjà installées${NC}"
    echo ""
fi

# Ask for mode
echo "Choisissez le mode de démarrage:"
echo "1) Development (avec auto-reload)"
echo "2) Production (avec PM2)"
echo "3) Test simple (npm start)"
echo ""
read -p "Votre choix (1-3): " choice

case $choice in
    1)
        echo ""
        echo "🚀 Démarrage en mode développement..."
        echo ""
        npm run dev
        ;;
    2)
        # Check if PM2 is installed
        if ! command -v pm2 &> /dev/null; then
            echo ""
            echo -e "${YELLOW}⚠️  PM2 n'est pas installé${NC}"
            echo "Installation de PM2..."
            npm install -g pm2

            if [ $? -ne 0 ]; then
                echo -e "${RED}❌ Erreur lors de l'installation de PM2${NC}"
                echo "Essayez: sudo npm install -g pm2"
                exit 1
            fi
        fi

        echo ""
        echo "🚀 Démarrage avec PM2..."
        echo ""
        pm2 start server.js --name cyberguard-api
        pm2 logs cyberguard-api
        ;;
    3)
        echo ""
        echo "🚀 Démarrage simple..."
        echo ""
        npm start
        ;;
    *)
        echo -e "${RED}❌ Choix invalide${NC}"
        exit 1
        ;;
esac
