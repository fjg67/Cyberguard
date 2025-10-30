/**
 * CyberGuard Pro - Simulateur de Test 2FA/MFA
 * Simulateur interactif pour comprendre et tester l'authentification à deux facteurs
 */

class TwoFactorAuthSimulator {
    constructor() {
        this.currentMethod = 'totp'; // totp, sms, email, hardware, biometric
        this.simulatedUser = {
            username: 'demo@cyberguard.pro',
            phoneNumber: '+33 6 XX XX XX XX',
            email: 'demo@cyberguard.pro',
            hasAuthenticator: true,
            hasHardwareKey: false,
            hasBiometric: true
        };

        this.totpSecret = null;
        this.totpInterval = null;
        this.currentCode = null;

        this.stats = {
            totalTests: 0,
            successfulTests: 0,
            failedTests: 0,
            methodsUsed: {}
        };

        this.init();
    }

    init() {
        this.loadStats();
        this.setupEventListeners();
        this.generateTOTPSecret();
        this.updateMethodDisplay();
    }

    setupEventListeners() {
        // Sélection de méthode
        const methodButtons = document.querySelectorAll('.2fa-method-btn');
        methodButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const method = e.currentTarget.dataset.method;
                this.selectMethod(method);
            });
        });

        // Génération de code
        const generateBtn = document.getElementById('generate-2fa-code-btn');
        if (generateBtn) {
            generateBtn.addEventListener('click', () => this.generateCode());
        }

        // Vérification de code
        const verifyBtn = document.getElementById('verify-2fa-code-btn');
        const codeInput = document.getElementById('2fa-code-input');

        if (verifyBtn) {
            verifyBtn.addEventListener('click', () => this.verifyCode());
        }

        if (codeInput) {
            codeInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.verifyCode();
                }
            });

            // Auto-format pour code à 6 chiffres
            codeInput.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 6);
            });
        }

        // Test de simulation d'attaque
        const testAttackBtn = document.getElementById('test-2fa-attack-btn');
        if (testAttackBtn) {
            testAttackBtn.addEventListener('click', () => this.simulateAttack());
        }
    }

    selectMethod(method) {
        this.currentMethod = method;

        // Mise à jour visuelle des boutons
        document.querySelectorAll('.2fa-method-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        const activeBtn = document.querySelector(`[data-method="${method}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }

        this.updateMethodDisplay();
    }

    updateMethodDisplay() {
        const methodInfo = document.getElementById('2fa-method-info');
        if (!methodInfo) return;

        const methods = {
            totp: {
                name: 'Authentificateur TOTP',
                icon: 'fa-mobile-alt',
                description: 'Codes à usage unique basés sur le temps (Google Authenticator, Authy)',
                security: 'Très élevée',
                color: '#00ff41',
                howItWorks: 'Génère un code à 6 chiffres qui change toutes les 30 secondes',
                pros: ['Fonctionne hors ligne', 'Très sécurisé', 'Normes TOTP/HOTP'],
                cons: ['Nécessite une app', 'Peut être perdu si téléphone perdu']
            },
            sms: {
                name: 'SMS (Code par texto)',
                icon: 'fa-sms',
                description: 'Code envoyé par SMS sur votre téléphone',
                security: 'Moyenne',
                color: '#ffd700',
                howItWorks: 'Un code à 6 chiffres est envoyé par SMS à votre numéro',
                pros: ['Facile à utiliser', 'Pas d\'app nécessaire'],
                cons: ['Vulnérable au SIM swapping', 'Nécessite réseau mobile', 'Peut être intercepté']
            },
            email: {
                name: 'Email (Code par e-mail)',
                icon: 'fa-envelope',
                description: 'Code envoyé par email',
                security: 'Moyenne',
                color: '#ffd700',
                howItWorks: 'Un code à 6 chiffres est envoyé à votre adresse email',
                pros: ['Accessible partout', 'Pas d\'app nécessaire'],
                cons: ['Vulnérable si email compromis', 'Dépend de la sécurité email']
            },
            hardware: {
                name: 'Clé de sécurité matérielle',
                icon: 'fa-key',
                description: 'Clé physique USB/NFC (YubiKey, Titan)',
                security: 'Maximale',
                color: '#00d4ff',
                howItWorks: 'Clé physique à brancher ou toucher pour s\'authentifier',
                pros: ['Résistant au phishing', 'Très sécurisé', 'Pas de code à taper'],
                cons: ['Coût supplémentaire', 'Peut être perdu', 'Nécessite support matériel']
            },
            biometric: {
                name: 'Biométrie',
                icon: 'fa-fingerprint',
                description: 'Empreinte digitale, reconnaissance faciale, iris',
                security: 'Élevée',
                color: '#00ff41',
                howItWorks: 'Utilise vos caractéristiques biologiques uniques',
                pros: ['Rapide et pratique', 'Difficile à usurper', 'Toujours avec vous'],
                cons: ['Nécessite matériel compatible', 'Préoccupations de confidentialité']
            }
        };

        const info = methods[this.currentMethod];

        methodInfo.innerHTML = `
            <div class="method-header">
                <i class="fas ${info.icon}" style="color: ${info.color}; font-size: 2em;"></i>
                <h3>${info.name}</h3>
            </div>
            <p class="method-description">${info.description}</p>
            <div class="method-security">
                <strong>Niveau de sécurité:</strong>
                <span style="color: ${info.color}">${info.security}</span>
            </div>
            <div class="method-how-it-works">
                <h4><i class="fas fa-info-circle"></i> Comment ça fonctionne</h4>
                <p>${info.howItWorks}</p>
            </div>
            <div class="method-pros-cons">
                <div class="pros">
                    <h4><i class="fas fa-check-circle" style="color: #00ff41"></i> Avantages</h4>
                    <ul>
                        ${info.pros.map(pro => `<li>${pro}</li>`).join('')}
                    </ul>
                </div>
                <div class="cons">
                    <h4><i class="fas fa-exclamation-circle" style="color: #ff8c00"></i> Inconvénients</h4>
                    <ul>
                        ${info.cons.map(con => `<li>${con}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }

    generateCode() {
        let code, message, validFor;

        switch(this.currentMethod) {
            case 'totp':
                code = this.generateTOTP();
                message = 'Code TOTP généré (valide 30 secondes)';
                validFor = 30;
                this.startTOTPCountdown();
                break;

            case 'sms':
                code = this.generateRandomCode();
                message = `Code envoyé au ${this.simulatedUser.phoneNumber}`;
                validFor = 300; // 5 minutes
                break;

            case 'email':
                code = this.generateRandomCode();
                message = `Code envoyé à ${this.simulatedUser.email}`;
                validFor = 300;
                break;

            case 'hardware':
                message = 'Insérez votre clé de sécurité et appuyez sur le bouton';
                code = 'HARDWARE_KEY_PRESS';
                validFor = 60;
                break;

            case 'biometric':
                message = 'Placez votre doigt sur le capteur';
                code = 'BIOMETRIC_SCAN';
                validFor = 30;
                break;
        }

        this.currentCode = code;

        // Affichage
        const codeDisplay = document.getElementById('2fa-code-display');
        if (codeDisplay) {
            if (this.currentMethod === 'totp' || this.currentMethod === 'sms' || this.currentMethod === 'email') {
                codeDisplay.innerHTML = `
                    <div class="code-container">
                        <div class="code-digits">${this.formatCode(code)}</div>
                        <div class="code-timer">Valide pendant ${validFor} secondes</div>
                    </div>
                `;
            } else {
                codeDisplay.innerHTML = `
                    <div class="code-container">
                        <div class="code-message">${message}</div>
                    </div>
                `;
            }
            codeDisplay.classList.add('cyber-pulse');
            setTimeout(() => codeDisplay.classList.remove('cyber-pulse'), 1000);
        }

        // Notification
        this.showNotification(message, 'info');

        // Stats
        this.stats.methodsUsed[this.currentMethod] = (this.stats.methodsUsed[this.currentMethod] || 0) + 1;
        this.saveStats();
    }

    generateTOTP() {
        // Simulation simple de TOTP (normalement utilise HMAC-SHA1)
        const timeStep = Math.floor(Date.now() / 30000);
        const seed = this.totpSecret || 'CYBERGUARD2FA';
        let hash = 0;

        for (let i = 0; i < seed.length; i++) {
            hash = ((hash << 5) - hash) + seed.charCodeAt(i);
            hash = hash & hash;
        }

        hash = Math.abs(hash + timeStep);
        return String(hash % 1000000).padStart(6, '0');
    }

    generateTOTPSecret() {
        // Génère un secret aléatoire pour TOTP
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
        let secret = '';
        for (let i = 0; i < 32; i++) {
            secret += chars[Math.floor(Math.random() * chars.length)];
        }
        this.totpSecret = secret;
    }

    startTOTPCountdown() {
        if (this.totpInterval) {
            clearInterval(this.totpInterval);
        }

        const updateCountdown = () => {
            const now = Date.now();
            const remaining = 30 - Math.floor((now / 1000) % 30);

            const timerDisplay = document.querySelector('.code-timer');
            if (timerDisplay) {
                timerDisplay.textContent = `Expire dans ${remaining} secondes`;

                // Régénération automatique
                if (remaining === 30) {
                    this.currentCode = this.generateTOTP();
                    const digitsDisplay = document.querySelector('.code-digits');
                    if (digitsDisplay) {
                        digitsDisplay.textContent = this.formatCode(this.currentCode);
                        digitsDisplay.classList.add('cyber-pulse');
                        setTimeout(() => digitsDisplay.classList.remove('cyber-pulse'), 500);
                    }
                }
            }
        };

        updateCountdown();
        this.totpInterval = setInterval(updateCountdown, 1000);
    }

    generateRandomCode() {
        return String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
    }

    formatCode(code) {
        if (code.length === 6) {
            return `${code.slice(0, 3)} ${code.slice(3)}`;
        }
        return code;
    }

    verifyCode() {
        const inputElement = document.getElementById('2fa-code-input');
        if (!inputElement) return;

        const userInput = inputElement.value.replace(/\s/g, '');
        let isValid = false;

        if (this.currentMethod === 'hardware') {
            isValid = true; // Simulation: toujours valide
        } else if (this.currentMethod === 'biometric') {
            isValid = Math.random() > 0.1; // 90% de succès
        } else {
            isValid = userInput === this.currentCode;
        }

        // Affichage résultat
        const resultDisplay = document.getElementById('2fa-verification-result');

        this.stats.totalTests++;

        if (isValid) {
            this.stats.successfulTests++;
            if (resultDisplay) {
                resultDisplay.innerHTML = `
                    <div class="verification-success">
                        <i class="fas fa-check-circle"></i>
                        <h3>Authentification réussie !</h3>
                        <p>Code valide - Accès autorisé</p>
                    </div>
                `;
            }
            this.showNotification('Authentification réussie !', 'success');
            inputElement.value = '';

            // Animation de succès
            this.celebrateSuccess();
        } else {
            this.stats.failedTests++;
            if (resultDisplay) {
                resultDisplay.innerHTML = `
                    <div class="verification-error">
                        <i class="fas fa-times-circle"></i>
                        <h3>Échec de l'authentification</h3>
                        <p>Code invalide ou expiré</p>
                    </div>
                `;
            }
            this.showNotification('Code invalide', 'error');

            // Shake animation
            inputElement.classList.add('shake-animation');
            setTimeout(() => inputElement.classList.remove('shake-animation'), 500);
        }

        this.saveStats();
        this.updateStatsDisplay();
    }

    simulateAttack() {
        const attacks = [
            {
                name: 'Attaque par force brute',
                description: 'Tentative de deviner le code en testant toutes les combinaisons',
                method: 'totp',
                success: false,
                reason: 'Code TOTP change toutes les 30 secondes, rendant impossible la force brute',
                mitigation: 'Limitation du nombre de tentatives + expiration rapide'
            },
            {
                name: 'SIM Swapping',
                description: 'Attaquant obtient une nouvelle SIM avec votre numéro',
                method: 'sms',
                success: true,
                reason: 'SMS 2FA vulnérable au SIM swapping',
                mitigation: 'Utiliser TOTP ou clés matérielles au lieu de SMS'
            },
            {
                name: 'Phishing',
                description: 'Site frauduleux demandant le code 2FA',
                method: 'totp',
                success: true,
                reason: 'Utilisateur peut être trompé à entrer le code sur un faux site',
                mitigation: 'Vérifier toujours l\'URL + utiliser clés matérielles résistantes au phishing'
            },
            {
                name: 'Man-in-the-middle',
                description: 'Interception des communications',
                method: 'sms',
                success: true,
                reason: 'SMS non chiffrés peuvent être interceptés',
                mitigation: 'Utiliser des méthodes basées sur le chiffrement (TOTP, clés matérielles)'
            },
            {
                name: 'Attaque sur clé matérielle',
                description: 'Tentative de copier ou contourner la clé physique',
                method: 'hardware',
                success: false,
                reason: 'Clés matérielles utilisent des protocoles cryptographiques résistants',
                mitigation: 'Déjà très sécurisé - toujours activer un PIN de backup'
            }
        ];

        const relevantAttack = attacks.find(a => a.method === this.currentMethod) || attacks[Math.floor(Math.random() * attacks.length)];

        const attackDisplay = document.getElementById('2fa-attack-simulation');
        if (attackDisplay) {
            attackDisplay.innerHTML = `
                <div class="attack-simulation ${relevantAttack.success ? 'attack-success' : 'attack-failed'}">
                    <h3><i class="fas fa-virus"></i> Simulation d'Attaque</h3>
                    <h4>${relevantAttack.name}</h4>
                    <p><strong>Description:</strong> ${relevantAttack.description}</p>
                    <p><strong>Cible:</strong> ${this.currentMethod.toUpperCase()}</p>
                    <p><strong>Résultat:</strong>
                        <span class="${relevantAttack.success ? 'text-danger' : 'text-success'}">
                            ${relevantAttack.success ? '✗ Attaque réussie' : '✓ Attaque bloquée'}
                        </span>
                    </p>
                    <p><strong>Raison:</strong> ${relevantAttack.reason}</p>
                    <div class="mitigation-box">
                        <strong><i class="fas fa-shield-alt"></i> Mitigation:</strong>
                        <p>${relevantAttack.mitigation}</p>
                    </div>
                </div>
            `;
            attackDisplay.style.display = 'block';
        }

        this.showNotification(`Simulation: ${relevantAttack.name}`, relevantAttack.success ? 'warning' : 'success');
    }

    celebrateSuccess() {
        // Animation de confettis ou effet visuel
        const container = document.getElementById('2fa-simulator-container');
        if (!container) return;

        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: ${['#00ff41', '#00d4ff', '#ff0040'][Math.floor(Math.random() * 3)]};
                left: ${Math.random() * 100}%;
                top: -10px;
                animation: confettiFall ${2 + Math.random() * 2}s linear;
            `;
            container.appendChild(confetti);

            setTimeout(() => confetti.remove(), 4000);
        }
    }

    showNotification(message, type = 'info') {
        if (window.NotificationSystem) {
            window.NotificationSystem.show(message, type);
        } else {
            console.log(`[${type}] ${message}`);
        }
    }

    loadStats() {
        const saved = localStorage.getItem('cyberguard_2fa_stats');
        if (saved) {
            this.stats = JSON.parse(saved);
        }
    }

    saveStats() {
        localStorage.setItem('cyberguard_2fa_stats', JSON.stringify(this.stats));
    }

    updateStatsDisplay() {
        const statsDisplay = document.getElementById('2fa-stats-display');
        if (!statsDisplay) return;

        const successRate = this.stats.totalTests > 0
            ? ((this.stats.successfulTests / this.stats.totalTests) * 100).toFixed(1)
            : 0;

        statsDisplay.innerHTML = `
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-value">${this.stats.totalTests}</div>
                    <div class="stat-label">Tests Total</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value" style="color: #00ff41">${this.stats.successfulTests}</div>
                    <div class="stat-label">Réussis</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value" style="color: #ff0040">${this.stats.failedTests}</div>
                    <div class="stat-label">Échoués</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${successRate}%</div>
                    <div class="stat-label">Taux de Réussite</div>
                </div>
            </div>
        `;
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('2fa-simulator-section')) {
        window.twoFactorAuthSimulator = new TwoFactorAuthSimulator();
    }
});

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TwoFactorAuthSimulator;
}
