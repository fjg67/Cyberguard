# 🔒 CyberGuard Pro - Guide de Configuration Sécurité

Guide complet pour déployer CyberGuard Pro avec toutes les mesures de sécurité activées.

## 📋 Table des Matières

1. [Prérequis](#prérequis)
2. [Installation Backend](#installation-backend)
3. [Configuration API Keys](#configuration-api-keys)
4. [Déploiement Frontend](#déploiement-frontend)
5. [Configuration Serveur](#configuration-serveur)
6. [Tests de Sécurité](#tests-de-sécurité)
7. [Monitoring](#monitoring)

---

## 🎯 Prérequis

### Environnement requis

- **Node.js** 18+ pour le backend
- **Apache** ou **Nginx** pour le frontend
- **SSL Certificate** (Let's Encrypt recommandé)
- **Domaine** configuré avec DNS

### Compétences recommandées

- Ligne de commande Linux/Unix
- Git basique
- Configuration serveur web

---

## 🚀 Installation Backend

### Étape 1: Cloner et installer

```bash
# Aller dans le dossier backend
cd /path/to/CyberGuard/backend

# Installer les dépendances
npm install

# Vérifier l'installation
npm list
```

### Étape 2: Configuration environnement

```bash
# Copier le fichier d'exemple
cp .env.example .env

# Éditer avec vos valeurs
nano .env
```

**Contenu minimal du .env** :

```env
# OBLIGATOIRE
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://votre-domaine.com
GOOGLE_SAFE_BROWSING_KEY=votre_clé_google

# OPTIONNEL (mais recommandé)
HIBP_API_KEY=votre_clé_hibp
MAILCHIMP_API_KEY=votre_clé_mailchimp
MAILCHIMP_LIST_ID=votre_id_liste
MAILCHIMP_SERVER_PREFIX=us1

# Rate Limiting (optionnel)
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Étape 3: Tester localement

```bash
# Démarrer en mode développement
npm run dev

# Dans un autre terminal, tester
curl http://localhost:3001/health
```

**Réponse attendue** :
```json
{
  "status": "OK",
  "uptime": 5.234,
  "services": {
    "safeBrowsing": true,
    "hibp": true,
    "mailchimp": true
  }
}
```

### Étape 4: Déployer avec PM2

```bash
# Installer PM2 globalement
npm install -g pm2

# Démarrer l'application
pm2 start server.js --name cyberguard-api

# Sauvegarder la configuration
pm2 save

# Configurer le redémarrage automatique au boot
pm2 startup
# Suivre les instructions affichées

# Vérifier le statut
pm2 status
pm2 logs cyberguard-api
```

### Étape 5: Configuration reverse proxy (Nginx)

Créer `/etc/nginx/sites-available/cyberguard-api` :

```nginx
server {
    listen 80;
    server_name api.votre-domaine.com;

    # Redirection HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.votre-domaine.com;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/api.votre-domaine.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.votre-domaine.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Logs
    access_log /var/log/nginx/cyberguard-api.access.log;
    error_log /var/log/nginx/cyberguard-api.error.log;

    # Proxy vers Node.js
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

```bash
# Activer le site
sudo ln -s /etc/nginx/sites-available/cyberguard-api /etc/nginx/sites-enabled/

# Tester la configuration
sudo nginx -t

# Recharger Nginx
sudo systemctl reload nginx
```

---

## 🔑 Configuration API Keys

### Google Safe Browsing (REQUIS)

1. **Créer un projet Google Cloud**
   - Aller sur [console.cloud.google.com](https://console.cloud.google.com)
   - Créer un nouveau projet "CyberGuard Pro"

2. **Activer l'API**
   - Rechercher "Safe Browsing API"
   - Cliquer "Enable"

3. **Créer une clé API**
   - Aller dans "Credentials"
   - "Create Credentials" → "API Key"
   - **IMPORTANT** : Restreindre la clé
     - Application restrictions: IP addresses (votre serveur)
     - API restrictions: Safe Browsing API uniquement

4. **Ajouter au .env**
   ```env
   GOOGLE_SAFE_BROWSING_KEY=AIza...votre_clé
   ```

### Have I Been Pwned (Optionnel)

1. **Obtenir une clé**
   - Aller sur [haveibeenpwned.com/API/Key](https://haveibeenpwned.com/API/Key)
   - Souscrire (35$/mois)
   - Recevoir la clé par email

2. **Ajouter au .env**
   ```env
   HIBP_API_KEY=votre_clé_hibp
   ```

**Note** : Si vous ne configurez pas HIBP, le système fonctionnera en mode simulation.

### Mailchimp (Optionnel)

1. **Créer un compte**
   - S'inscrire sur [mailchimp.com](https://mailchimp.com)
   - Plan gratuit jusqu'à 500 contacts

2. **Générer une clé API**
   - Aller dans Account → Extras → API keys
   - "Create A Key"
   - Copier la clé

3. **Créer une audience**
   - Marketing → Audience → Create Audience
   - Remplir les informations

4. **Récupérer le List ID**
   - Dans Audience → Settings → Audience name and defaults
   - Copier l'ID (ex: `1a2b3c4d5e`)

5. **Trouver le server prefix**
   - Dans votre clé API, c'est la partie après le tiret
   - Ex: `abc123def456-us19` → prefix = `us19`

6. **Ajouter au .env**
   ```env
   MAILCHIMP_API_KEY=abc123def456-us19
   MAILCHIMP_LIST_ID=1a2b3c4d5e
   MAILCHIMP_SERVER_PREFIX=us19
   ```

---

## 🌐 Déploiement Frontend

### Étape 1: Configuration API Client

Éditer `/Volumes/Florian/Site Web/CyberGuard/api-client.js` :

```javascript
getBackendURL() {
    // En production, utilisez votre domaine backend
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:3001';
    }

    // ⚠️ MODIFIER ICI avec votre vrai domaine backend
    return 'https://api.votre-domaine.com';
}
```

### Étape 2: Upload des fichiers

```bash
# Via FTP/SFTP
# Uploader tous les fichiers vers /var/www/cyberguard/

# Ou via Git
cd /var/www/cyberguard
git clone <votre-repo> .
```

### Étape 3: Permissions

```bash
# Définir les bonnes permissions
sudo chown -R www-data:www-data /var/www/cyberguard
sudo find /var/www/cyberguard -type f -exec chmod 644 {} \;
sudo find /var/www/cyberguard -type d -exec chmod 755 {} \;

# .htaccess doit être lisible
sudo chmod 644 /var/www/cyberguard/.htaccess
```

### Étape 4: Configuration Apache/Nginx

**Apache** (`/etc/apache2/sites-available/cyberguard.conf`) :

```apache
<VirtualHost *:80>
    ServerName votre-domaine.com
    ServerAlias www.votre-domaine.com

    # Redirection HTTPS
    RewriteEngine On
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</VirtualHost>

<VirtualHost *:443>
    ServerName votre-domaine.com
    ServerAlias www.votre-domaine.com

    DocumentRoot /var/www/cyberguard

    # SSL
    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/votre-domaine.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/votre-domaine.com/privkey.pem

    # .htaccess support
    <Directory /var/www/cyberguard>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    # Logs
    ErrorLog ${APACHE_LOG_DIR}/cyberguard-error.log
    CustomLog ${APACHE_LOG_DIR}/cyberguard-access.log combined
</VirtualHost>
```

```bash
# Activer le site
sudo a2ensite cyberguard
sudo a2enmod rewrite ssl headers deflate expires
sudo systemctl reload apache2
```

**Nginx** (`/etc/nginx/sites-available/cyberguard`) :

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name votre-domaine.com www.votre-domaine.com;
    return 301 https://votre-domaine.com$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name www.votre-domaine.com;
    return 301 https://votre-domaine.com$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name votre-domaine.com;

    root /var/www/cyberguard;
    index index.html;

    # SSL
    ssl_certificate /etc/letsencrypt/live/votre-domaine.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/votre-domaine.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip
    gzip on;
    gzip_vary on;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json;

    # Locations
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Bloquer backend
    location ~ ^/backend/ {
        deny all;
        return 404;
    }

    # Bloquer fichiers sensibles
    location ~ /\. {
        deny all;
    }

    location ~ \.(env|json|md|lock|log)$ {
        deny all;
    }
}
```

### Étape 5: SSL avec Let's Encrypt

```bash
# Installer Certbot
sudo apt update
sudo apt install certbot python3-certbot-apache  # Pour Apache
# OU
sudo apt install certbot python3-certbot-nginx    # Pour Nginx

# Obtenir le certificat
sudo certbot --apache -d votre-domaine.com -d www.votre-domaine.com
# OU
sudo certbot --nginx -d votre-domaine.com -d www.votre-domaine.com

# Tester le renouvellement automatique
sudo certbot renew --dry-run
```

---

## 🔧 Configuration Serveur

### Firewall (UFW)

```bash
# Autoriser SSH, HTTP, HTTPS
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
# OU
sudo ufw allow 'Apache Full'

# Activer le firewall
sudo ufw enable
sudo ufw status
```

### Fail2Ban (Protection brute force)

```bash
# Installer
sudo apt install fail2ban

# Copier la configuration
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

# Éditer
sudo nano /etc/fail2ban/jail.local
```

Configurer les jails :

```ini
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5

[sshd]
enabled = true

[nginx-http-auth]
enabled = true

[nginx-limit-req]
enabled = true
logpath = /var/log/nginx/error.log

[apache-auth]
enabled = true

[apache-badbots]
enabled = true
```

```bash
# Redémarrer Fail2Ban
sudo systemctl restart fail2ban
sudo fail2ban-client status
```

---

## ✅ Tests de Sécurité

### Test 1: Backend API

```bash
# Health check
curl https://api.votre-domaine.com/health

# Safe Browsing test
curl -X POST https://api.votre-domaine.com/api/safe-browsing/check \
  -H "Content-Type: application/json" \
  -d '{"url":"https://testsafebrowsing.appspot.com/s/malware.html"}'

# Rate limiting test (devrait bloquer après 10 requêtes)
for i in {1..15}; do
  curl -X POST https://api.votre-domaine.com/api/safe-browsing/check \
    -H "Content-Type: application/json" \
    -d '{"url":"https://google.com"}'
  echo "Request $i"
done
```

### Test 2: Security Headers

```bash
curl -I https://votre-domaine.com
```

**Headers attendus** :
- `Strict-Transport-Security`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection`

### Test 3: SSL Configuration

Tester sur [SSL Labs](https://www.ssllabs.com/ssltest/) :
- Note cible : **A ou A+**

### Test 4: Security Headers Online

Tester sur [Security Headers](https://securityheaders.com/) :
- Note cible : **A ou A+**

### Test 5: Frontend Tests

1. Ouvrir https://votre-domaine.com
2. Ouvrir DevTools Console
3. Vérifier : `✅ Backend API disponible`
4. Tester le scanner d'URL avec `https://testsafebrowsing.appspot.com/s/malware.html`
5. Vérifier la détection de menace

---

## 📊 Monitoring

### Logs Backend

```bash
# Logs PM2
pm2 logs cyberguard-api

# Logs Nginx
sudo tail -f /var/log/nginx/cyberguard-api.access.log
sudo tail -f /var/log/nginx/cyberguard-api.error.log

# Logs Apache
sudo tail -f /var/log/apache2/cyberguard-access.log
sudo tail -f /var/log/apache2/cyberguard-error.log
```

### Monitoring avec Uptime Robot

1. Créer compte sur [uptimerobot.com](https://uptimerobot.com)
2. Ajouter monitors :
   - **Frontend** : `https://votre-domaine.com`
   - **API Health** : `https://api.votre-domaine.com/health`
3. Configurer alertes email/SMS

### Dashboard PM2

```bash
# PM2 Plus (monitoring avancé)
pm2 plus
# Suivre les instructions
```

---

## 🚨 Troubleshooting

### Backend ne démarre pas

```bash
# Vérifier les logs
pm2 logs cyberguard-api --lines 100

# Vérifier le fichier .env
cat backend/.env

# Tester manuellement
cd backend
npm start
```

### CORS Errors

Vérifier que `FRONTEND_URL` dans `.env` correspond exactement à l'URL frontend :
```env
FRONTEND_URL=https://votre-domaine.com
```

### 429 Too Many Requests

C'est normal ! Le rate limiting fonctionne. Attendez 1 minute ou ajustez dans `.env` :
```env
RATE_LIMIT_MAX_REQUESTS=200
```

### Google Safe Browsing API Error

Vérifier :
1. La clé API est valide
2. L'API Safe Browsing est activée dans Google Cloud
3. Les quotas ne sont pas dépassés

---

## 📝 Checklist Pré-Production

- [ ] Backend déployé avec PM2
- [ ] Toutes les API keys configurées
- [ ] SSL activé (HTTPS)
- [ ] Security headers configurés
- [ ] Firewall activé (UFW)
- [ ] Fail2Ban configuré
- [ ] Logs fonctionnels
- [ ] Monitoring configuré (UptimeRobot)
- [ ] Tests de sécurité passés (A/A+)
- [ ] Backup configuré
- [ ] DNS correctement configuré
- [ ] Rate limiting testé
- [ ] CORS testé depuis frontend

---

## 🎉 Félicitations !

Votre site CyberGuard Pro est maintenant **sécurisé et prêt pour la production** ! 🛡️

### Prochaines étapes

1. Configurer Google Analytics (voir Phase 2)
2. Ajouter un sitemap.xml (voir Phase 2)
3. Optimiser les performances (voir Phase 2)

### Support

- Documentation backend : `backend/README.md`
- Issues GitHub : [créer une issue]
- Email : support@cyberguard-pro.com

---

**Mis à jour** : 28 Octobre 2025
**Version** : 1.0.0
