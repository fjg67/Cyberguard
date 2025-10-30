/**
 * CyberGuard Pro - Analyseur de Force de Mot de Passe
 * Analyse avancée avec visualisation en temps réel
 */

class PasswordStrengthAnalyzer {
    constructor() {
        this.commonPasswords = [
            'password', '123456', '12345678', 'qwerty', 'abc123', 'monkey', '1234567', 'letmein',
            'trustno1', 'dragon', 'baseball', 'iloveyou', 'master', 'sunshine', 'ashley', 'bailey',
            'passw0rd', 'shadow', '123123', '654321', 'superman', 'qazwsx', 'michael', 'football',
            'azerty', 'password1', 'admin', 'welcome', 'root', 'toor', '1234', '12345'
        ];

        this.patterns = {
            sequential: /(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789)/i,
            repeated: /(.)\1{2,}/,
            keyboard: /(?:qwerty|asdfgh|zxcvbn|azerty)/i,
            commonWords: /(?:password|admin|user|root|login|welcome)/i,
            dates: /(?:19|20)\d{2}|(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])/
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        const passwordInput = document.getElementById('password-strength-input');
        const showPasswordToggle = document.getElementById('show-password-toggle');

        if (passwordInput) {
            passwordInput.addEventListener('input', (e) => {
                this.analyzePassword(e.target.value);
            });

            passwordInput.addEventListener('paste', (e) => {
                setTimeout(() => this.analyzePassword(e.target.value), 10);
            });
        }

        if (showPasswordToggle) {
            showPasswordToggle.addEventListener('click', () => {
                const type = passwordInput.type === 'password' ? 'text' : 'password';
                passwordInput.type = type;
                showPasswordToggle.innerHTML = type === 'password'
                    ? '<i class="fas fa-eye"></i>'
                    : '<i class="fas fa-eye-slash"></i>';
            });
        }
    }

    analyzePassword(password) {
        if (!password) {
            this.resetDisplay();
            return;
        }

        const analysis = {
            length: password.length,
            hasLowercase: /[a-z]/.test(password),
            hasUppercase: /[A-Z]/.test(password),
            hasNumbers: /\d/.test(password),
            hasSpecialChars: /[^a-zA-Z0-9]/.test(password),
            entropy: 0,
            score: 0,
            strength: '',
            color: '',
            warnings: [],
            suggestions: [],
            crackTime: '',
            patterns: []
        };

        // Calcul de l'entropie
        analysis.entropy = this.calculateEntropy(password);

        // Détection de patterns faibles
        this.detectPatterns(password, analysis);

        // Vérification contre les mots de passe courants
        if (this.isCommonPassword(password)) {
            analysis.warnings.push('Ce mot de passe est dans la liste des mots de passe les plus courants !');
            analysis.score -= 30;
        }

        // Calcul du score
        analysis.score = this.calculateScore(password, analysis);

        // Détermination de la force
        this.determineStrength(analysis);

        // Temps de crack estimé
        analysis.crackTime = this.estimateCrackTime(analysis.entropy);

        // Suggestions d'amélioration
        this.generateSuggestions(password, analysis);

        // Affichage
        this.displayAnalysis(analysis);

        return analysis;
    }

    calculateEntropy(password) {
        let charsetSize = 0;

        if (/[a-z]/.test(password)) charsetSize += 26;
        if (/[A-Z]/.test(password)) charsetSize += 26;
        if (/\d/.test(password)) charsetSize += 10;
        if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 32;

        // Entropie = longueur * log2(charset)
        return password.length * Math.log2(charsetSize);
    }

    detectPatterns(password, analysis) {
        const lowerPassword = password.toLowerCase();

        // Séquences
        if (this.patterns.sequential.test(lowerPassword)) {
            analysis.patterns.push('Séquences détectées');
            analysis.warnings.push('Évitez les séquences de caractères (abc, 123...)');
            analysis.score -= 10;
        }

        // Répétitions
        if (this.patterns.repeated.test(password)) {
            analysis.patterns.push('Répétitions détectées');
            analysis.warnings.push('Évitez les caractères répétés (aaa, 111...)');
            analysis.score -= 10;
        }

        // Clavier
        if (this.patterns.keyboard.test(lowerPassword)) {
            analysis.patterns.push('Pattern de clavier détecté');
            analysis.warnings.push('Évitez les suites de touches adjacentes (qwerty, azerty...)');
            analysis.score -= 15;
        }

        // Mots courants
        if (this.patterns.commonWords.test(lowerPassword)) {
            analysis.patterns.push('Mots courants détectés');
            analysis.warnings.push('Évitez les mots courants (password, admin...)');
            analysis.score -= 15;
        }

        // Dates
        if (this.patterns.dates.test(password)) {
            analysis.patterns.push('Date détectée');
            analysis.warnings.push('Évitez les dates (anniversaires, années...)');
            analysis.score -= 10;
        }
    }

    isCommonPassword(password) {
        const lowerPassword = password.toLowerCase();
        return this.commonPasswords.some(common => lowerPassword.includes(common));
    }

    calculateScore(password, analysis) {
        let score = 0;

        // Longueur (max 40 points)
        score += Math.min(password.length * 4, 40);

        // Diversité des caractères (max 40 points)
        if (analysis.hasLowercase) score += 10;
        if (analysis.hasUppercase) score += 10;
        if (analysis.hasNumbers) score += 10;
        if (analysis.hasSpecialChars) score += 10;

        // Bonus pour longueur exceptionnelle
        if (password.length >= 16) score += 10;
        if (password.length >= 20) score += 10;

        // Entropie bonus
        if (analysis.entropy > 50) score += 10;
        if (analysis.entropy > 100) score += 10;

        // Limite à 100
        return Math.max(0, Math.min(score, 100));
    }

    determineStrength(analysis) {
        if (analysis.score >= 80) {
            analysis.strength = 'Très Fort';
            analysis.color = '#00ff41';
            analysis.icon = 'fa-shield-alt';
        } else if (analysis.score >= 60) {
            analysis.strength = 'Fort';
            analysis.color = '#00d4ff';
            analysis.icon = 'fa-shield-check';
        } else if (analysis.score >= 40) {
            analysis.strength = 'Moyen';
            analysis.color = '#ffd700';
            analysis.icon = 'fa-shield-halved';
        } else if (analysis.score >= 20) {
            analysis.strength = 'Faible';
            analysis.color = '#ff8c00';
            analysis.icon = 'fa-shield-virus';
        } else {
            analysis.strength = 'Très Faible';
            analysis.color = '#ff0040';
            analysis.icon = 'fa-shield-xmark';
        }
    }

    estimateCrackTime(entropy) {
        // Basé sur 100 milliards de tentatives/seconde
        const attempts = Math.pow(2, entropy);
        const seconds = attempts / 1e11;

        if (seconds < 1) return 'Instantané';
        if (seconds < 60) return `${seconds.toFixed(0)} secondes`;
        if (seconds < 3600) return `${(seconds / 60).toFixed(0)} minutes`;
        if (seconds < 86400) return `${(seconds / 3600).toFixed(1)} heures`;
        if (seconds < 2592000) return `${(seconds / 86400).toFixed(0)} jours`;
        if (seconds < 31536000) return `${(seconds / 2592000).toFixed(0)} mois`;
        if (seconds < 31536000 * 100) return `${(seconds / 31536000).toFixed(0)} années`;
        if (seconds < 31536000 * 1000000) return `${(seconds / (31536000 * 1000)).toFixed(0)} milliers d'années`;
        return `${(seconds / (31536000 * 1000000)).toFixed(0)} millions d'années`;
    }

    generateSuggestions(password, analysis) {
        if (password.length < 12) {
            analysis.suggestions.push('Utilisez au moins 12 caractères (idéalement 16+)');
        }

        if (!analysis.hasLowercase) {
            analysis.suggestions.push('Ajoutez des lettres minuscules');
        }

        if (!analysis.hasUppercase) {
            analysis.suggestions.push('Ajoutez des lettres majuscules');
        }

        if (!analysis.hasNumbers) {
            analysis.suggestions.push('Ajoutez des chiffres');
        }

        if (!analysis.hasSpecialChars) {
            analysis.suggestions.push('Ajoutez des caractères spéciaux (!@#$%^&*)');
        }

        if (analysis.patterns.length > 0) {
            analysis.suggestions.push('Évitez les patterns prévisibles');
        }

        if (analysis.entropy < 50) {
            analysis.suggestions.push('Augmentez la complexité du mot de passe');
        }

        if (analysis.suggestions.length === 0) {
            analysis.suggestions.push('Excellent mot de passe ! Continuez ainsi.');
        }
    }

    displayAnalysis(analysis) {
        // Barre de progression
        const progressBar = document.getElementById('strength-progress-bar');
        if (progressBar) {
            progressBar.style.width = `${analysis.score}%`;
            progressBar.style.backgroundColor = analysis.color;
            progressBar.style.transition = 'all 0.3s ease';
        }

        // Label de force
        const strengthLabel = document.getElementById('strength-label');
        if (strengthLabel) {
            strengthLabel.innerHTML = `
                <i class="fas ${analysis.icon}"></i> ${analysis.strength}
            `;
            strengthLabel.style.color = analysis.color;
        }

        // Score
        const scoreDisplay = document.getElementById('strength-score');
        if (scoreDisplay) {
            scoreDisplay.textContent = `${analysis.score}/100`;
        }

        // Détails
        const detailsDisplay = document.getElementById('strength-details');
        if (detailsDisplay) {
            detailsDisplay.innerHTML = `
                <div class="detail-row">
                    <span>Longueur:</span>
                    <span>${analysis.length} caractères</span>
                    <i class="fas fa-${analysis.length >= 12 ? 'check' : 'times'}" style="color: ${analysis.length >= 12 ? '#00ff41' : '#ff0040'}"></i>
                </div>
                <div class="detail-row">
                    <span>Minuscules:</span>
                    <span>${analysis.hasLowercase ? 'Oui' : 'Non'}</span>
                    <i class="fas fa-${analysis.hasLowercase ? 'check' : 'times'}" style="color: ${analysis.hasLowercase ? '#00ff41' : '#ff0040'}"></i>
                </div>
                <div class="detail-row">
                    <span>Majuscules:</span>
                    <span>${analysis.hasUppercase ? 'Oui' : 'Non'}</span>
                    <i class="fas fa-${analysis.hasUppercase ? 'check' : 'times'}" style="color: ${analysis.hasUppercase ? '#00ff41' : '#ff0040'}"></i>
                </div>
                <div class="detail-row">
                    <span>Chiffres:</span>
                    <span>${analysis.hasNumbers ? 'Oui' : 'Non'}</span>
                    <i class="fas fa-${analysis.hasNumbers ? 'check' : 'times'}" style="color: ${analysis.hasNumbers ? '#00ff41' : '#ff0040'}"></i>
                </div>
                <div class="detail-row">
                    <span>Caractères spéciaux:</span>
                    <span>${analysis.hasSpecialChars ? 'Oui' : 'Non'}</span>
                    <i class="fas fa-${analysis.hasSpecialChars ? 'check' : 'times'}" style="color: ${analysis.hasSpecialChars ? '#00ff41' : '#ff0040'}"></i>
                </div>
                <div class="detail-row highlight">
                    <span>Entropie:</span>
                    <span>${analysis.entropy.toFixed(1)} bits</span>
                </div>
                <div class="detail-row highlight">
                    <span>Temps de crack estimé:</span>
                    <span>${analysis.crackTime}</span>
                </div>
            `;
        }

        // Avertissements
        const warningsDisplay = document.getElementById('strength-warnings');
        if (warningsDisplay) {
            if (analysis.warnings.length > 0) {
                warningsDisplay.innerHTML = `
                    <div class="warnings-box">
                        <h4><i class="fas fa-exclamation-triangle"></i> Avertissements</h4>
                        <ul>
                            ${analysis.warnings.map(w => `<li>${w}</li>`).join('')}
                        </ul>
                    </div>
                `;
                warningsDisplay.style.display = 'block';
            } else {
                warningsDisplay.style.display = 'none';
            }
        }

        // Suggestions
        const suggestionsDisplay = document.getElementById('strength-suggestions');
        if (suggestionsDisplay) {
            suggestionsDisplay.innerHTML = `
                <div class="suggestions-box">
                    <h4><i class="fas fa-lightbulb"></i> Suggestions</h4>
                    <ul>
                        ${analysis.suggestions.map(s => `<li>${s}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        // Visualisation graphique
        this.updateVisualization(analysis);
    }

    updateVisualization(analysis) {
        const canvas = document.getElementById('strength-visualization-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Graphique circulaire (gauge)
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 2 - 20;

        // Background arc
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0.75 * Math.PI, 2.25 * Math.PI);
        ctx.lineWidth = 20;
        ctx.strokeStyle = 'rgba(0, 255, 65, 0.1)';
        ctx.stroke();

        // Progress arc
        const endAngle = 0.75 * Math.PI + (1.5 * Math.PI * analysis.score / 100);
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0.75 * Math.PI, endAngle);
        ctx.lineWidth = 20;
        ctx.strokeStyle = analysis.color;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Score au centre
        ctx.fillStyle = analysis.color;
        ctx.font = 'bold 48px "Orbitron", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${analysis.score}`, centerX, centerY - 10);

        ctx.font = '16px "Orbitron", monospace';
        ctx.fillText(analysis.strength, centerX, centerY + 30);
    }

    resetDisplay() {
        const progressBar = document.getElementById('strength-progress-bar');
        if (progressBar) {
            progressBar.style.width = '0%';
        }

        const strengthLabel = document.getElementById('strength-label');
        if (strengthLabel) {
            strengthLabel.innerHTML = '<i class="fas fa-shield"></i> Entrez un mot de passe';
            strengthLabel.style.color = '#888';
        }

        const scoreDisplay = document.getElementById('strength-score');
        if (scoreDisplay) {
            scoreDisplay.textContent = '0/100';
        }

        const detailsDisplay = document.getElementById('strength-details');
        if (detailsDisplay) {
            detailsDisplay.innerHTML = '';
        }

        const warningsDisplay = document.getElementById('strength-warnings');
        if (warningsDisplay) {
            warningsDisplay.style.display = 'none';
        }

        const suggestionsDisplay = document.getElementById('strength-suggestions');
        if (suggestionsDisplay) {
            suggestionsDisplay.innerHTML = '';
        }

        // Clear canvas
        const canvas = document.getElementById('strength-visualization-canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('password-strength-analyzer-section')) {
        window.passwordStrengthAnalyzer = new PasswordStrengthAnalyzer();
    }
});

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PasswordStrengthAnalyzer;
}
