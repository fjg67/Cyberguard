/**
 * CyberGuard Pro - Vérificateur de Certificat SSL
 * Analyse la sécurité des certificats SSL/TLS d'un site web
 */

class SSLChecker {
    constructor() {
        this.apiEndpoint = '/api/check-ssl'; // Endpoint backend
        this.simulationMode = true; // true pour simulation, false pour vraie API

        this.stats = {
            totalChecks: 0,
            securesSites: 0,
            insecureSites: 0,
            lastCheck: null
        };

        this.init();
    }

    init() {
        this.loadStats();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const checkButton = document.getElementById('check-ssl-btn');
        const urlInput = document.getElementById('ssl-url-input');

        if (checkButton) {
            checkButton.addEventListener('click', () => this.checkSSL());
        }

        if (urlInput) {
            urlInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.checkSSL();
                }
            });
        }

        // Démo rapide
        const demoButton = document.getElementById('ssl-demo-btn');
        if (demoButton) {
            demoButton.addEventListener('click', () => {
                document.getElementById('ssl-url-input').value = 'https://google.com';
                this.checkSSL();
            });
        }
    }

    async checkSSL() {
        const urlInput = document.getElementById('ssl-url-input');
        if (!urlInput) return;

        let url = urlInput.value.trim();

        if (!url) {
            this.showNotification('Veuillez entrer une URL', 'error');
            return;
        }

        // Ajouter https:// si manquant
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }

        // Validation URL
        if (!this.isValidURL(url)) {
            this.showNotification('URL invalide', 'error');
            return;
        }

        // Afficher loader
        this.showLoader();

        try {
            let result;

            if (this.simulationMode) {
                // Simulation mode
                await this.delay(1500); // Simule temps de requête
                result = this.simulateSSLCheck(url);
            } else {
                // Vraie API (nécessite backend)
                result = await this.checkSSLReal(url);
            }

            this.displayResults(result, url);

            // Stats
            this.stats.totalChecks++;
            if (result.isSecure) {
                this.stats.securesSites++;
            } else {
                this.stats.insecureSites++;
            }
            this.stats.lastCheck = new Date().toISOString();
            this.saveStats();
            this.updateStatsDisplay();

        } catch (error) {
            console.error('SSL Check Error:', error);
            this.showNotification('Erreur lors de la vérification', 'error');
            this.hideLoader();
        }
    }

    async checkSSLReal(url) {
        const response = await fetch(this.apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
        });

        if (!response.ok) {
            throw new Error('API Error');
        }

        return await response.json();
    }

    simulateSSLCheck(url) {
        // Simulation réaliste basée sur l'URL
        const domain = new URL(url).hostname;
        const isHttps = url.startsWith('https://');

        // Sites connus comme sûrs
        const safeDomains = ['google.com', 'github.com', 'microsoft.com', 'apple.com', 'amazon.com'];
        const isSafeDomain = safeDomains.some(d => domain.includes(d));

        const now = new Date();
        const validFrom = new Date(now.getTime() - (Math.random() * 365 * 24 * 60 * 60 * 1000)); // Dans le passé
        const validUntil = new Date(now.getTime() + ((30 + Math.random() * 300) * 24 * 60 * 60 * 1000)); // Dans le futur

        let result = {
            isSecure: isHttps && isSafeDomain,
            protocol: isHttps ? 'TLS 1.3' : 'None',
            certificate: null,
            score: 0,
            grade: 'F',
            issues: [],
            warnings: [],
            recommendations: []
        };

        if (isHttps) {
            result.certificate = {
                issuer: isSafeDomain ? 'Google Trust Services LLC' : 'Let\'s Encrypt',
                subject: domain,
                validFrom: validFrom.toISOString(),
                validUntil: validUntil.toISOString(),
                daysRemaining: Math.floor((validUntil - now) / (1000 * 60 * 60 * 24)),
                serialNumber: this.generateSerialNumber(),
                signatureAlgorithm: 'SHA256-RSA',
                keySize: isSafeDomain ? 2048 : 2048,
                san: [domain, `www.${domain}`]
            };

            // Calcul du score
            let score = 50; // Base pour HTTPS

            // Protocol
            if (result.protocol === 'TLS 1.3') {
                score += 20;
            } else if (result.protocol === 'TLS 1.2') {
                score += 10;
                result.warnings.push('TLS 1.2 est utilisé. Envisagez TLS 1.3 pour une meilleure sécurité.');
            } else {
                result.issues.push('Protocol TLS obsolète détecté !');
                score -= 20;
            }

            // Key size
            if (result.certificate.keySize >= 2048) {
                score += 10;
            } else {
                result.issues.push('Taille de clé insuffisante (< 2048 bits)');
                score -= 10;
            }

            // Expiration
            if (result.certificate.daysRemaining > 30) {
                score += 10;
            } else if (result.certificate.daysRemaining > 0) {
                result.warnings.push(`Certificat expire dans ${result.certificate.daysRemaining} jours`);
                score += 5;
            } else {
                result.issues.push('Certificat expiré !');
                score -= 30;
            }

            // Issuer
            if (result.certificate.issuer.includes('Google') || result.certificate.issuer.includes('DigiCert')) {
                score += 10;
            } else if (result.certificate.issuer.includes('Let\'s Encrypt')) {
                score += 5;
            }

            // Checks additionnels
            const checks = this.performSecurityChecks(domain, isSafeDomain);
            score += checks.bonusPoints;
            result.issues.push(...checks.issues);
            result.warnings.push(...checks.warnings);

            result.score = Math.max(0, Math.min(100, score));

            // Grade
            if (result.score >= 90) result.grade = 'A+';
            else if (result.score >= 80) result.grade = 'A';
            else if (result.score >= 70) result.grade = 'B';
            else if (result.score >= 60) result.grade = 'C';
            else if (result.score >= 50) result.grade = 'D';
            else result.grade = 'F';

            result.isSecure = result.score >= 70;

        } else {
            result.issues.push('Pas de chiffrement HTTPS !');
            result.issues.push('Connexion non sécurisée');
            result.warnings.push('Les données sont transmises en clair');
            result.recommendations.push('Activer HTTPS immédiatement');
        }

        // Recommandations
        this.generateRecommendations(result);

        return result;
    }

    performSecurityChecks(domain, isSafe) {
        let bonusPoints = 0;
        const issues = [];
        const warnings = [];

        // HSTS (HTTP Strict Transport Security)
        if (isSafe) {
            bonusPoints += 5;
        } else {
            warnings.push('HSTS non détecté - considérez l\'activer');
        }

        // Certificate Transparency
        if (isSafe) {
            bonusPoints += 5;
        }

        // OCSP Stapling
        if (Math.random() > 0.5) {
            bonusPoints += 3;
        } else {
            warnings.push('OCSP Stapling non activé');
        }

        // Vérification de révocation
        if (isSafe) {
            bonusPoints += 2;
        }

        return { bonusPoints, issues, warnings };
    }

    generateRecommendations(result) {
        if (result.score < 90) {
            result.recommendations.push('Migrer vers TLS 1.3 si possible');
        }

        if (!result.protocol || result.protocol === 'None') {
            result.recommendations.push('Installer un certificat SSL/TLS valide');
        }

        if (result.certificate && result.certificate.daysRemaining < 30) {
            result.recommendations.push('Renouveler le certificat SSL avant expiration');
        }

        if (result.issues.some(i => i.includes('clé'))) {
            result.recommendations.push('Utiliser une clé RSA de 2048 bits minimum (ou ECDSA)');
        }

        result.recommendations.push('Activer HSTS (HTTP Strict Transport Security)');
        result.recommendations.push('Implémenter Certificate Transparency');
        result.recommendations.push('Configurer OCSP Stapling');
    }

    displayResults(result, url) {
        this.hideLoader();

        const resultsContainer = document.getElementById('ssl-results');
        if (!resultsContainer) return;

        const gradeColors = {
            'A+': '#00ff41',
            'A': '#00d4ff',
            'B': '#ffd700',
            'C': '#ff8c00',
            'D': '#ff6b00',
            'F': '#ff0040'
        };

        let html = `
            <div class="ssl-results-container">
                <div class="ssl-header">
                    <div class="ssl-url">
                        <i class="fas fa-${result.isSecure ? 'lock' : 'lock-open'}"></i>
                        <h3>${new URL(url).hostname}</h3>
                    </div>
                    <div class="ssl-grade" style="background: ${gradeColors[result.grade]}; color: #000;">
                        <div class="grade-letter">${result.grade}</div>
                        <div class="grade-score">${result.score}/100</div>
                    </div>
                </div>

                <div class="ssl-status ${result.isSecure ? 'status-secure' : 'status-insecure'}">
                    <i class="fas fa-${result.isSecure ? 'shield-check' : 'shield-xmark'}"></i>
                    <span>${result.isSecure ? 'Connexion Sécurisée' : 'Connexion Non Sécurisée'}</span>
                </div>

                ${result.certificate ? `
                <div class="ssl-certificate">
                    <h4><i class="fas fa-certificate"></i> Informations du Certificat</h4>
                    <div class="cert-details">
                        <div class="cert-row">
                            <span class="cert-label">Émetteur:</span>
                            <span class="cert-value">${result.certificate.issuer}</span>
                        </div>
                        <div class="cert-row">
                            <span class="cert-label">Sujet:</span>
                            <span class="cert-value">${result.certificate.subject}</span>
                        </div>
                        <div class="cert-row">
                            <span class="cert-label">Valide du:</span>
                            <span class="cert-value">${new Date(result.certificate.validFrom).toLocaleDateString('fr-FR')}</span>
                        </div>
                        <div class="cert-row">
                            <span class="cert-label">Expire le:</span>
                            <span class="cert-value">${new Date(result.certificate.validUntil).toLocaleDateString('fr-FR')}
                                <span class="days-remaining">(${result.certificate.daysRemaining} jours restants)</span>
                            </span>
                        </div>
                        <div class="cert-row">
                            <span class="cert-label">Algorithme:</span>
                            <span class="cert-value">${result.certificate.signatureAlgorithm}</span>
                        </div>
                        <div class="cert-row">
                            <span class="cert-label">Taille de clé:</span>
                            <span class="cert-value">${result.certificate.keySize} bits</span>
                        </div>
                        <div class="cert-row">
                            <span class="cert-label">Protocol:</span>
                            <span class="cert-value">${result.protocol}</span>
                        </div>
                        <div class="cert-row">
                            <span class="cert-label">SAN:</span>
                            <span class="cert-value">${result.certificate.san.join(', ')}</span>
                        </div>
                    </div>
                </div>
                ` : ''}

                ${result.issues.length > 0 ? `
                <div class="ssl-issues">
                    <h4><i class="fas fa-exclamation-triangle"></i> Problèmes Critiques</h4>
                    <ul>
                        ${result.issues.map(issue => `<li>${issue}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}

                ${result.warnings.length > 0 ? `
                <div class="ssl-warnings">
                    <h4><i class="fas fa-exclamation-circle"></i> Avertissements</h4>
                    <ul>
                        ${result.warnings.map(warning => `<li>${warning}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}

                ${result.recommendations.length > 0 ? `
                <div class="ssl-recommendations">
                    <h4><i class="fas fa-lightbulb"></i> Recommandations</h4>
                    <ul>
                        ${result.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}

                <div class="ssl-security-checklist">
                    <h4><i class="fas fa-tasks"></i> Checklist de Sécurité</h4>
                    <div class="checklist">
                        ${this.generateChecklist(result)}
                    </div>
                </div>
            </div>
        `;

        resultsContainer.innerHTML = html;
        resultsContainer.style.display = 'block';
        resultsContainer.classList.add('fade-in-animation');
    }

    generateChecklist(result) {
        const checks = [
            { label: 'HTTPS activé', passed: !!result.certificate },
            { label: 'Certificat valide', passed: result.certificate && result.certificate.daysRemaining > 0 },
            { label: 'TLS 1.2+', passed: result.protocol && (result.protocol.includes('1.2') || result.protocol.includes('1.3')) },
            { label: 'Clé >= 2048 bits', passed: result.certificate && result.certificate.keySize >= 2048 },
            { label: 'Certificat non expiré', passed: result.certificate && result.certificate.daysRemaining > 30 },
            { label: 'Score >= 80', passed: result.score >= 80 }
        ];

        return checks.map(check => `
            <div class="checklist-item ${check.passed ? 'check-passed' : 'check-failed'}">
                <i class="fas fa-${check.passed ? 'check-circle' : 'times-circle'}"></i>
                <span>${check.label}</span>
            </div>
        `).join('');
    }

    generateSerialNumber() {
        const hex = '0123456789ABCDEF';
        let serial = '';
        for (let i = 0; i < 32; i++) {
            serial += hex[Math.floor(Math.random() * 16)];
            if (i % 2 === 1 && i < 31) serial += ':';
        }
        return serial;
    }

    isValidURL(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    showLoader() {
        const loader = document.getElementById('ssl-loader');
        if (loader) {
            loader.style.display = 'flex';
        }

        const resultsContainer = document.getElementById('ssl-results');
        if (resultsContainer) {
            resultsContainer.style.display = 'none';
        }
    }

    hideLoader() {
        const loader = document.getElementById('ssl-loader');
        if (loader) {
            loader.style.display = 'none';
        }
    }

    showNotification(message, type = 'info') {
        if (window.NotificationSystem) {
            window.NotificationSystem.show(message, type);
        } else {
            console.log(`[${type}] ${message}`);
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    loadStats() {
        const saved = localStorage.getItem('cyberguard_ssl_stats');
        if (saved) {
            this.stats = JSON.parse(saved);
        }
    }

    saveStats() {
        localStorage.setItem('cyberguard_ssl_stats', JSON.stringify(this.stats));
    }

    updateStatsDisplay() {
        const statsDisplay = document.getElementById('ssl-stats-display');
        if (!statsDisplay) return;

        statsDisplay.innerHTML = `
            <div class="stats-row">
                <div class="stat-box">
                    <div class="stat-value">${this.stats.totalChecks}</div>
                    <div class="stat-label">Vérifications</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" style="color: #00ff41">${this.stats.securesSites}</div>
                    <div class="stat-label">Sites Sécurisés</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" style="color: #ff0040">${this.stats.insecureSites}</div>
                    <div class="stat-label">Sites à Risque</div>
                </div>
            </div>
        `;
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('ssl-checker-section')) {
        window.sslChecker = new SSLChecker();
    }
});

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SSLChecker;
}
