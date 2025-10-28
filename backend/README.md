# CyberGuard Pro - Backend API

Backend Node.js/Express sécurisé pour CyberGuard Pro. Gère les API keys, la validation des inputs, le rate limiting et les requêtes vers services tiers.

## 🚀 Installation

### Prérequis
- Node.js 18+
- npm ou yarn

### Installation des dépendances

```bash
cd backend
npm install
```

### Configuration

1. Copiez `.env.example` vers `.env`:
```bash
cp .env.example .env
```

2. Éditez `.env` et ajoutez vos clés API:

```env
# Server
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000

# API Keys
GOOGLE_SAFE_BROWSING_KEY=your_actual_key_here
HIBP_API_KEY=your_actual_key_here

# Mailchimp
MAILCHIMP_API_KEY=your_actual_key_here
MAILCHIMP_LIST_ID=your_list_id_here
MAILCHIMP_SERVER_PREFIX=us1
```

### Démarrage

**Mode développement** (avec auto-reload):
```bash
npm run dev
```

**Mode production**:
```bash
npm start
```

Le serveur démarre sur `http://localhost:3001`

## 📡 Endpoints API

### Health Check
```
GET /health
```
Retourne le statut du serveur et des services configurés.

**Réponse**:
```json
{
  "status": "OK",
  "uptime": 3600,
  "services": {
    "safeBrowsing": true,
    "hibp": true,
    "mailchimp": true
  }
}
```

### Safe Browsing
```
POST /api/safe-browsing/check
Content-Type: application/json

{
  "url": "https://example.com"
}
```

**Réponse sûre**:
```json
{
  "success": true,
  "url": "https://example.com",
  "safe": true,
  "threats": [],
  "scannedAt": "2025-10-28T12:00:00.000Z"
}
```

**Réponse dangereuse**:
```json
{
  "success": true,
  "url": "https://malicious-site.com",
  "safe": false,
  "threats": [
    {
      "threatType": "MALWARE",
      "platformType": "ANY_PLATFORM",
      "threatEntryType": "URL"
    }
  ],
  "scannedAt": "2025-10-28T12:00:00.000Z"
}
```

### Have I Been Pwned
```
POST /api/hibp/check
Content-Type: application/json

{
  "email": "test@example.com"
}
```

**Réponse sans breach**:
```json
{
  "success": true,
  "email": "test@example.com",
  "breached": false,
  "breaches": [],
  "message": "Aucune fuite de données détectée",
  "checkedAt": "2025-10-28T12:00:00.000Z"
}
```

**Réponse avec breaches**:
```json
{
  "success": true,
  "email": "test@example.com",
  "breached": true,
  "breaches": [
    {
      "name": "Adobe",
      "title": "Adobe",
      "domain": "adobe.com",
      "breachDate": "2013-10-04",
      "pwnCount": 152445165,
      "description": "In October 2013...",
      "dataClasses": ["Email addresses", "Password hints", "Passwords", "Usernames"],
      "isVerified": true
    }
  ],
  "breachCount": 1,
  "message": "1 fuite(s) de données détectée(s)",
  "checkedAt": "2025-10-28T12:00:00.000Z"
}
```

### Newsletter
```
POST /api/newsletter/subscribe
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe"
}
```

**Réponse**:
```json
{
  "success": true,
  "message": "Inscription à la newsletter réussie !",
  "email": "user@example.com",
  "subscribedAt": "2025-10-28T12:00:00.000Z"
}
```

## 🔒 Sécurité

### Features implémentées

- ✅ **Helmet.js** - Headers HTTP sécurisés
- ✅ **CSP** - Content Security Policy configurée
- ✅ **CORS** - Origine frontend uniquement
- ✅ **Rate Limiting** - Protection contre abus
  - Global: 100 req/15min
  - API: 10 req/min
- ✅ **Input Validation** - express-validator sur toutes les routes
- ✅ **API Keys cachées** - Jamais exposées au frontend
- ✅ **Payload size limit** - 10KB max
- ✅ **Compression** - Gzip responses

### Rate Limiting

**Global limiter**:
- 100 requêtes par 15 minutes par IP
- Appliqué sur `/api/*`

**API limiter**:
- 10 requêtes par minute par IP
- Appliqué sur endpoints externes (Safe Browsing, HIBP)

**Réponse 429** (Too Many Requests):
```json
{
  "error": "Trop de requêtes",
  "message": "Vous avez dépassé la limite. Réessayez dans 15 minutes.",
  "retryAfter": "2025-10-28T12:15:00.000Z"
}
```

## 🛠️ Configuration avancée

### Variables d'environnement

| Variable | Description | Requis | Défaut |
|----------|-------------|--------|--------|
| `NODE_ENV` | Environnement (development/production) | Non | development |
| `PORT` | Port du serveur | Non | 3001 |
| `FRONTEND_URL` | URL frontend pour CORS | Oui | http://localhost:3000 |
| `GOOGLE_SAFE_BROWSING_KEY` | Clé API Google | Oui | - |
| `HIBP_API_KEY` | Clé API HIBP | Non* | - |
| `MAILCHIMP_API_KEY` | Clé API Mailchimp | Non* | - |
| `MAILCHIMP_LIST_ID` | ID liste Mailchimp | Non* | - |
| `RATE_LIMIT_WINDOW_MS` | Fenêtre rate limit | Non | 900000 |
| `RATE_LIMIT_MAX_REQUESTS` | Max requêtes | Non | 100 |

\* = Fonctionnalité optionnelle, fonctionne en mode dégradé si absent

### Obtenir les API Keys

**Google Safe Browsing** (REQUIS):
1. Aller sur [Google Cloud Console](https://console.cloud.google.com)
2. Créer un projet
3. Activer "Safe Browsing API"
4. Créer une clé API
5. Ajouter dans `.env`

**Have I Been Pwned** (Optionnel):
1. Aller sur [HIBP API](https://haveibeenpwned.com/API/Key)
2. Acheter une clé API (35$/mois)
3. Ajouter dans `.env`
4. Si absent: mode simulation

**Mailchimp** (Optionnel):
1. Créer compte [Mailchimp](https://mailchimp.com)
2. Aller dans Account > Extras > API keys
3. Générer une clé API
4. Créer une audience/liste
5. Récupérer le List ID
6. Ajouter dans `.env`
7. Si absent: mode simulation en dev

## 🚢 Déploiement

### Option 1: VPS (Recommended)

```bash
# Sur le serveur
git clone <repo>
cd backend
npm install --production
npm install -g pm2

# Créer .env avec vraies valeurs
nano .env

# Démarrer avec PM2
pm2 start server.js --name cyberguard-api
pm2 save
pm2 startup
```

### Option 2: Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --production

COPY . .

EXPOSE 3001

CMD ["node", "server.js"]
```

```bash
docker build -t cyberguard-api .
docker run -d -p 3001:3001 --env-file .env cyberguard-api
```

### Option 3: Heroku

```bash
heroku create cyberguard-api
heroku config:set NODE_ENV=production
heroku config:set GOOGLE_SAFE_BROWSING_KEY=xxx
heroku config:set FRONTEND_URL=https://your-frontend.com
git push heroku main
```

## 📊 Monitoring

### Logs

Les logs sont affichés avec Morgan:
- **Development**: Format 'dev' (coloré, détaillé)
- **Production**: Format 'combined' (Apache standard)

### Health Checks

Pour monitoring (UptimeRobot, Pingdom, etc.):
```
GET /health/live   # Liveness probe
GET /health/ready  # Readiness probe
```

## 🧪 Tests

```bash
# Run tests
npm test

# Watch mode
npm test -- --watch

# Coverage
npm test -- --coverage
```

## 🔧 Troubleshooting

### Erreur: "Google Safe Browsing API key not configured"
→ Vérifiez que `GOOGLE_SAFE_BROWSING_KEY` est défini dans `.env`

### Erreur CORS
→ Vérifiez que `FRONTEND_URL` dans `.env` correspond à l'URL du frontend

### 429 Too Many Requests
→ Attendez la fin de la fenêtre de rate limiting (15 min)

### Mailchimp simulation mode
→ Normal en développement si pas de clé API
→ En production, configurez Mailchimp pour vraie newsletter

## 📝 Changelog

### v1.0.0 - 2025-10-28
- ✨ Initial release
- 🔒 Backend sécurisé avec Helmet, CSP, CORS
- 🚀 3 endpoints API: Safe Browsing, HIBP, Newsletter
- ⚡ Rate limiting global et par API
- ✅ Input validation avec express-validator
- 📊 Health checks pour monitoring

## 📄 License

MIT License - CyberGuard Pro

## 🆘 Support

Pour toute question:
- Documentation: https://docs.cyberguard-pro.com
- Issues: https://github.com/cyberguard/backend/issues
