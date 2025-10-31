/**
 * ═══════════════════════════════════════════════════════════════
 * USER STATS TRACKER - REAL USER DATA COLLECTION
 * ═══════════════════════════════════════════════════════════════
 * Collecte les VRAIES données de l'utilisateur
 * Toutes les actions sont trackées et sauvegardées
 */

class UserStatsTracker {
    constructor() {
        this.storageKey = 'cyberguard_real_user_stats';
        this.stats = {
            scansTotal: 0,
            passwordsGenerated: 0,
            quizCompleted: 0,
            achievements: 0,
            toolsUsed: {},
            firstVisit: null,
            lastActivity: null,
            securityScore: 0,
            level: 'Débutant',
            dailyActivity: {}
        };
        
        this.init();
    }

    init() {
        console.log('📊 User Stats Tracker initialized');
        
        // Charger les stats existantes
        this.loadStats();
        
        // Si première visite, marquer
        if (!this.stats.firstVisit) {
            this.stats.firstVisit = Date.now();
            this.saveStats();
        }
        
        // Setup listeners pour toutes les actions
        this.setupAllListeners();
        
        // Mettre à jour l'affichage
        this.updateDashboardDisplay();
        
        // Auto-save toutes les 30 secondes
        setInterval(() => this.saveStats(), 30000);
    }

    loadStats() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                const loaded = JSON.parse(saved);
                this.stats = { ...this.stats, ...loaded };
                console.log('✅ Loaded user stats:', this.stats);
            }
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    }

    saveStats() {
        try {
            this.stats.lastActivity = Date.now();
            localStorage.setItem(this.storageKey, JSON.stringify(this.stats));
            console.log('💾 Stats saved:', this.stats);
        } catch (error) {
            console.error('Error saving stats:', error);
        }
    }

    setupAllListeners() {
        // SSL Checker
        this.trackSSLChecker();
        
        // Password Generator
        this.trackPasswordGenerator();
        
        // Quiz
        this.trackQuiz();
        
        // File Analyzer
        this.trackFileAnalyzer();
        
        // Phishing Detector
        this.trackPhishingDetector();
        
        // 2FA Simulator
        this.track2FA();
        
        // SSH Key Generator
        this.trackSSHGenerator();
        
        // Achievements
        this.trackAchievements();
    }

    trackSSLChecker() {
        const checkBtn = document.getElementById('check-ssl-btn');
        const demoBtn = document.getElementById('ssl-demo-btn');
        
        if (checkBtn) {
            checkBtn.addEventListener('click', () => {
                this.incrementStat('scansTotal');
                this.incrementStat('toolsUsed', 'sslChecker');
                this.recordDailyActivity('scan');
                this.updateSecurityScore();
                console.log('✅ SSL Check tracked');
            });
        }
        
        if (demoBtn) {
            demoBtn.addEventListener('click', () => {
                this.incrementStat('scansTotal');
                this.incrementStat('toolsUsed', 'sslChecker');
                this.recordDailyActivity('scan');
                this.updateSecurityScore();
                console.log('✅ SSL Demo tracked');
            });
        }
    }

    trackPasswordGenerator() {
        // Passphrase Generator
        const passphraseBtn = document.getElementById('generate-passphrase-btn');
        if (passphraseBtn) {
            passphraseBtn.addEventListener('click', () => {
                this.incrementStat('passwordsGenerated');
                this.incrementStat('toolsUsed', 'passphraseGenerator');
                this.recordDailyActivity('tool');
                this.updateSecurityScore();
                console.log('✅ Passphrase generated tracked');
            });
        }
        
        // Password Strength Analyzer
        const analyzeBtn = document.getElementById('analyze-password-btn');
        if (analyzeBtn) {
            analyzeBtn.addEventListener('click', () => {
                this.incrementStat('toolsUsed', 'passwordAnalyzer');
                this.recordDailyActivity('tool');
                console.log('✅ Password analysis tracked');
            });
        }
    }

    trackQuiz() {
        // Écouter les événements de quiz
        document.addEventListener('quiz-completed', (e) => {
            this.incrementStat('quizCompleted');
            this.recordDailyActivity('quiz');
            this.updateSecurityScore();
            console.log('✅ Quiz completed tracked:', e.detail);
        });
        
        // Intercepter les soumissions de quiz
        const quizForms = document.querySelectorAll('.quiz-form');
        quizForms.forEach(form => {
            form.addEventListener('submit', (e) => {
                this.incrementStat('quizCompleted');
                this.recordDailyActivity('quiz');
                this.updateSecurityScore();
            });
        });
    }

    trackFileAnalyzer() {
        const browseBtn = document.getElementById('browse-files-btn');
        if (browseBtn) {
            browseBtn.addEventListener('click', () => {
                const fileInput = document.getElementById('file-input');
                if (fileInput) {
                    fileInput.addEventListener('change', () => {
                        this.incrementStat('scansTotal');
                        this.incrementStat('toolsUsed', 'fileAnalyzer');
                        this.recordDailyActivity('scan');
                        console.log('✅ File analysis tracked');
                    }, { once: true });
                }
            });
        }
    }

    trackPhishingDetector() {
        const scanBtn = document.getElementById('scan-url-btn');
        if (scanBtn) {
            scanBtn.addEventListener('click', () => {
                this.incrementStat('scansTotal');
                this.incrementStat('toolsUsed', 'phishingDetector');
                this.recordDailyActivity('scan');
                this.updateSecurityScore();
                console.log('✅ Phishing scan tracked');
            });
        }
    }

    track2FA() {
        const verifyBtn = document.getElementById('verify-2fa-btn');
        if (verifyBtn) {
            verifyBtn.addEventListener('click', () => {
                this.incrementStat('toolsUsed', '2faSimulator');
                this.recordDailyActivity('tool');
                console.log('✅ 2FA verification tracked');
            });
        }
    }

    trackSSHGenerator() {
        const generateBtn = document.getElementById('generate-ssh-btn');
        if (generateBtn) {
            generateBtn.addEventListener('click', () => {
                this.incrementStat('passwordsGenerated');
                this.incrementStat('toolsUsed', 'sshGenerator');
                this.recordDailyActivity('tool');
                this.updateSecurityScore();
                console.log('✅ SSH key generation tracked');
            });
        }
    }

    trackAchievements() {
        document.addEventListener('achievement-unlocked', (e) => {
            this.incrementStat('achievements');
            this.updateSecurityScore();
            console.log('✅ Achievement unlocked tracked:', e.detail);
        });
    }

    incrementStat(stat, subkey = null) {
        if (subkey) {
            // Pour les stats imbriquées comme toolsUsed.sslChecker
            if (!this.stats[stat]) {
                this.stats[stat] = {};
            }
            this.stats[stat][subkey] = (this.stats[stat][subkey] || 0) + 1;
        } else {
            // Pour les stats simples
            this.stats[stat]++;
        }
        
        this.saveStats();
        this.updateDashboardDisplay();
    }

    recordDailyActivity(type) {
        const today = new Date().toDateString();
        
        if (!this.stats.dailyActivity[today]) {
            this.stats.dailyActivity[today] = {
                scans: 0,
                tools: 0,
                quiz: 0
            };
        }
        
        if (type === 'scan') {
            this.stats.dailyActivity[today].scans++;
        } else if (type === 'tool') {
            this.stats.dailyActivity[today].tools++;
        } else if (type === 'quiz') {
            this.stats.dailyActivity[today].quiz++;
        }
        
        this.saveStats();
    }

    updateSecurityScore() {
        let score = 0;
        
        // Points par activité (max 100)
        score += Math.min(this.stats.scansTotal * 2, 30);           // Max 30
        score += Math.min(this.stats.passwordsGenerated * 1, 20);   // Max 20
        score += Math.min(this.stats.quizCompleted * 5, 25);        // Max 25
        score += Math.min(this.stats.achievements * 5, 25);         // Max 25
        
        this.stats.securityScore = Math.min(score, 100);
        
        // Déterminer le niveau
        if (score < 20) {
            this.stats.level = 'Débutant';
        } else if (score < 40) {
            this.stats.level = 'Apprenti';
        } else if (score < 60) {
            this.stats.level = 'Intermédiaire';
        } else if (score < 80) {
            this.stats.level = 'Avancé';
        } else {
            this.stats.level = 'Expert';
        }
        
        this.saveStats();
    }

    updateDashboardDisplay() {
        // Mettre à jour les compteurs du dashboard
        this.updateStatCard('scans-total', this.stats.scansTotal);
        this.updateStatCard('passwords-generated', this.stats.passwordsGenerated);
        this.updateStatCard('quiz-completed', this.stats.quizCompleted);
        this.updateStatCard('achievements-count', this.stats.achievements);
        
        // Mettre à jour le score de sécurité
        this.updateSecurityScoreDisplay();
        
        // Mettre à jour le niveau
        this.updateLevelDisplay();
        
        // Synchroniser avec Enhanced Dashboard si disponible
        this.syncWithDashboard();
    }

    updateStatCard(id, value) {
        const element = document.getElementById(id);
        if (element) {
            // Animation du compteur
            this.animateCounter(element, value);
        }
        
        // Aussi chercher par sélecteur alternatif
        const selectors = {
            'scans-total': '.stat-number[data-stat="scans"]',
            'passwords-generated': '.stat-number[data-stat="passwords"]',
            'quiz-completed': '.stat-number[data-stat="quiz"]',
            'achievements-count': '.stat-number[data-stat="achievements"]'
        };
        
        const selector = selectors[id];
        if (selector) {
            const el = document.querySelector(selector);
            if (el) {
                this.animateCounter(el, value);
            }
        }
    }

    animateCounter(element, targetValue) {
        const currentValue = parseInt(element.textContent) || 0;
        const duration = 500;
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const value = Math.floor(currentValue + (targetValue - currentValue) * progress);
            element.textContent = value.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }

    updateSecurityScoreDisplay() {
        const scoreElement = document.querySelector('.score-value');
        const scoreProgressElement = document.querySelector('.score-progress');
        const scoreTextElement = document.querySelector('.security-score-text');
        
        if (scoreElement) {
            this.animateCounter(scoreElement, this.stats.securityScore);
        }
        
        if (scoreProgressElement) {
            scoreProgressElement.style.strokeDashoffset = 
                283 - (283 * this.stats.securityScore) / 100;
        }
        
        if (scoreTextElement) {
            scoreTextElement.textContent = `${this.stats.securityScore}/100`;
        }
    }

    updateLevelDisplay() {
        const levelElement = document.querySelector('.user-level');
        if (levelElement) {
            levelElement.textContent = this.stats.level;
        }
    }

    syncWithDashboard() {
        if (window.enhancedDashboard) {
            window.enhancedDashboard.userStats.urlScans = this.stats.scansTotal;
            window.enhancedDashboard.userStats.passwordsGenerated = this.stats.passwordsGenerated;
            window.enhancedDashboard.userStats.quizzesTaken = this.stats.quizCompleted;
            window.enhancedDashboard.userStats.achievementsUnlocked = this.stats.achievements;
            window.enhancedDashboard.userStats.securityScore = this.stats.securityScore;
            
            window.enhancedDashboard.saveUserData();
            window.enhancedDashboard.updateAllStats();
        }
    }

    // Public API
    getStats() {
        return this.stats;
    }

    getTotalToolsUsed() {
        return Object.keys(this.stats.toolsUsed).length;
    }

    getMostUsedTool() {
        const tools = this.stats.toolsUsed;
        let maxTool = null;
        let maxCount = 0;
        
        for (const [tool, count] of Object.entries(tools)) {
            if (count > maxCount) {
                maxCount = count;
                maxTool = tool;
            }
        }
        
        return maxTool;
    }

    getDaysActive() {
        if (!this.stats.firstVisit) return 0;
        const days = Math.floor((Date.now() - this.stats.firstVisit) / (1000 * 60 * 60 * 24));
        return days;
    }

    resetStats() {
        if (confirm('Êtes-vous sûr de vouloir réinitialiser toutes vos statistiques ?')) {
            this.stats = {
                scansTotal: 0,
                passwordsGenerated: 0,
                quizCompleted: 0,
                achievements: 0,
                toolsUsed: {},
                firstVisit: Date.now(),
                lastActivity: Date.now(),
                securityScore: 0,
                level: 'Débutant',
                dailyActivity: {}
            };
            this.saveStats();
            this.updateDashboardDisplay();
            console.log('🗑️ Stats reset');
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.userStatsTracker = new UserStatsTracker();
    });
} else {
    window.userStatsTracker = new UserStatsTracker();
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserStatsTracker;
}
