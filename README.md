# 🛡️ CyberGuard Pro - Plateforme de Cybersécurité

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-2.0.0-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)

Plateforme complète de cybersécurité avec scanner de menaces, comparateur antivirus/VPN, blog éducatif et outils interactifs.

## ✨ Fonctionnalités

- 🔍 **Scanner de Sécurité** - Analyse d'URLs avec Google Safe Browsing API
- 🔐 **Vérificateur de Fuites** - Check Have I Been Pwned
- 🆚 **Comparateur** - Antivirus et VPN côte à côte
- 📝 **Blog Cybersécurité** - Articles éducatifs
- 🗺️ **Carte Mondiale** - Menaces en temps réel
- 🎯 **Quiz Interactif** - Testez vos connaissances
- 🤖 **Assistant IA** - Support intelligent
- 🌐 **Multilingue** - FR/EN/ES/DE
- 🌙 **Mode Sombre** - Thème clair/sombre

## 🚀 Déploiement sur Vercel (Gratuit)

### Prérequis

- Compte [GitHub](https://github.com)
- Compte [Vercel](https://vercel.com) (gratuit)
- [Google Safe Browsing API Key](https://developers.google.com/safe-browsing/v4/get-started)

### Étape 1 : Push sur GitHub

```bash
# Initialiser le repo si ce n'est pas déjà fait
git init
git add .
git commit -m "🚀 Initial commit - CyberGuard Pro v2.0"

# Créer un nouveau repo sur GitHub, puis :
git remote add origin https://github.com/VOTRE_USERNAME/cyberguard-pro.git
git branch -M main
git push -u origin main
```

### Étape 2 : Déployer sur Vercel

1. **Aller sur [vercel.com](https://vercel.com) et se connecter avec GitHub**

2. **Cliquer sur "Add New Project"**

3. **Importer votre repo GitHub** `cyberguard-pro`

4. **Configurer les variables d'environnement** :
   - Cliquer sur "Environment Variables"
   - Ajouter :
     ```
     GOOGLE_SAFE_BROWSING_KEY=votre_clé_api_ici
     NODE_ENV=production
     PORT=3001
     ```

5. **Cliquer sur "Deploy"**

6. **C'est tout !** Votre site sera disponible sur :
   ```
   https://cyberguard-pro.vercel.app
   ```

### Étape 3 : Configurer Google Analytics & Search Console

1. **Google Analytics** : Déjà configuré avec l'ID `G-WC3BVQX51V`

2. **Google Search Console** :
   - Aller sur [search.google.com/search-console](https://search.google.com/search-console)
   - Ajouter propriété : `cyberguard-pro.vercel.app`
   - Soumettre le sitemap : `https://cyberguard-pro.vercel.app/sitemap.xml`

## 💻 Développement Local

### Installation

```bash
# Cloner le repo
git clone https://github.com/VOTRE_USERNAME/cyberguard-pro.git
cd cyberguard-pro

# Installer les dépendances backend
cd backend
npm install

# Créer .env depuis le template
cp .env.example .env
# Éditer .env et ajouter votre clé API Google Safe Browsing

# Démarrer le backend
npm run dev
```

### Démarrer le Frontend

Ouvrez simplement `index.html` dans votre navigateur, ou utilisez un serveur local :

```bash
# Option 1 : Python
python3 -m http.server 8000

# Option 2 : Node.js
npx http-server -p 8000

# Option 3 : PHP
php -S localhost:8000
```

Le site sera accessible sur `http://localhost:8000`

## 📁 Structure du Projet

```
CyberGuard/
├── index.html              # Page principale
├── styles.css              # Styles principaux
├── script.js               # Logique frontend
├── api-client.js           # Client API sécurisé
├── vercel.json             # Configuration Vercel
├── sitemap.xml             # SEO sitemap
├── robots.txt              # SEO robots
├── backend/
│   ├── server.js           # Serveur Express
│   ├── package.json        # Dépendances Node.js
│   ├── .env.example        # Template variables env
│   └── routes/
│       ├── safeBrowsing.js # Proxy Google Safe Browsing
│       ├── hibp.js         # Proxy Have I Been Pwned
│       ├── newsletter.js   # Gestion newsletter
│       └── health.js       # Health checks
├── blog-*.js               # Système de blog
├── quiz-*.js               # Système de quiz
├── world-map-*.js          # Carte interactive
├── i18n.js                 # Internationalisation
├── theme-manager.js        # Gestion thèmes
├── achievement-system.js   # Système de récompenses
└── cyberguard-ai-assistant.js  # Assistant IA
```

## 🔒 Sécurité

- ✅ Content Security Policy (CSP)
- ✅ Helmet.js security headers
- ✅ CORS configuré
- ✅ Rate limiting (2 niveaux)
- ✅ Input validation & sanitization
- ✅ API keys protégées côté backend
- ✅ HTTPS forcé en production

## 📊 APIs Utilisées

- **Google Safe Browsing v4** - Détection de menaces
- **Have I Been Pwned** - Vérification de fuites (simulation)
- **Mailchimp** - Newsletter (simulation)
- **Google Analytics 4** - Statistiques

## 🛠️ Technologies

**Frontend** :
- HTML5, CSS3, JavaScript (Vanilla)
- SVG Animations
- Canvas (Matrix effect, particles)
- LocalStorage

**Backend** :
- Node.js 18+
- Express.js
- Helmet.js
- express-validator
- express-rate-limit
- CORS

**Déploiement** :
- Vercel (Frontend + Serverless Backend)
- GitHub (Version control)

## 📝 License

MIT License - Voir [LICENSE](LICENSE) pour plus de détails.

## 👨‍💻 Auteur

**CyberGuard Pro Team**

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📞 Support

Pour toute question ou support :
- 📧 Email : support@cyberguard-pro.com
- 🌐 Site : https://cyberguard-pro.vercel.app

---

🛡️ **Protégez votre vie numérique avec CyberGuard Pro !**
