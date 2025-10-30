/**
 * CyberGuard Pro - Système de Gamification Complet
 * Niveaux, Badges, Achievements, Leaderboard, Challenges
 */

class GamificationSystem {
    constructor() {
        this.user = {
            id: this.getUserId(),
            username: this.getUsername(),
            level: 1,
            xp: 0,
            totalPoints: 0,
            achievements: [],
            badges: [],
            streak: 0,
            lastLogin: null,
            createdAt: Date.now()
        };

        this.levels = [
            { level: 1, name: 'Débutant', xpRequired: 0, color: '#ff0040', icon: 'fa-seedling' },
            { level: 2, name: 'Initié', xpRequired: 100, color: '#ff8c00', icon: 'fa-book-open' },
            { level: 3, name: 'Intermédiaire', xpRequired: 300, color: '#ffd700', icon: 'fa-graduation-cap' },
            { level: 4, name: 'Avancé', xpRequired: 700, color: '#00d4ff', icon: 'fa-user-graduate' },
            { level: 5, name: 'Expert', xpRequired: 1500, color: '#00ff41', icon: 'fa-crown' },
            { level: 6, name: 'Maître', xpRequired: 3000, color: '#a020f0', icon: 'fa-star' }
        ];

        this.achievements = {
            // Sécurité
            'first-scan': {
                id: 'first-scan',
                name: 'Premier Scan',
                description: 'Effectuer votre premier scan de sécurité',
                icon: 'fa-shield-alt',
                category: 'security',
                xp: 10,
                rarity: 'common',
                unlocked: false
            },
            '10-scans': {
                id: '10-scans',
                name: 'Vigilant',
                description: 'Effectuer 10 scans de sécurité',
                icon: 'fa-eye',
                category: 'security',
                xp: 25,
                rarity: 'uncommon',
                requirement: { type: 'scans', count: 10 },
                unlocked: false
            },
            '50-scans': {
                id: '50-scans',
                name: 'Sentinelle',
                description: 'Effectuer 50 scans de sécurité',
                icon: 'fa-shield-check',
                category: 'security',
                xp: 50,
                rarity: 'rare',
                requirement: { type: 'scans', count: 50 },
                unlocked: false
            },
            'password-master': {
                id: 'password-master',
                name: 'Maître des Mots de Passe',
                description: 'Générer 20 mots de passe forts',
                icon: 'fa-key',
                category: 'security',
                xp: 30,
                rarity: 'uncommon',
                requirement: { type: 'passwords', count: 20 },
                unlocked: false
            },
            'ssl-expert': {
                id: 'ssl-expert',
                name: 'Expert SSL',
                description: 'Vérifier 15 certificats SSL',
                icon: 'fa-certificate',
                category: 'security',
                xp: 35,
                rarity: 'rare',
                requirement: { type: 'ssl-checks', count: 15 },
                unlocked: false
            },
            'ssh-ninja': {
                id: 'ssh-ninja',
                name: 'Ninja SSH',
                description: 'Générer 5 paires de clés SSH',
                icon: 'fa-terminal',
                category: 'security',
                xp: 25,
                rarity: 'uncommon',
                requirement: { type: 'ssh-keys', count: 5 },
                unlocked: false
            },

            // Apprentissage
            'first-quiz': {
                id: 'first-quiz',
                name: 'Étudiant',
                description: 'Compléter votre premier quiz',
                icon: 'fa-book-reader',
                category: 'learning',
                xp: 15,
                rarity: 'common',
                unlocked: false
            },
            'quiz-master': {
                id: 'quiz-master',
                name: 'Maître des Quiz',
                description: 'Compléter 10 quiz',
                icon: 'fa-brain',
                category: 'learning',
                xp: 40,
                rarity: 'rare',
                requirement: { type: 'quizzes', count: 10 },
                unlocked: false
            },
            'perfect-score': {
                id: 'perfect-score',
                name: 'Score Parfait',
                description: 'Obtenir 100% à un quiz',
                icon: 'fa-trophy',
                category: 'learning',
                xp: 50,
                rarity: 'epic',
                unlocked: false
            },
            'article-reader': {
                id: 'article-reader',
                name: 'Lecteur Assidu',
                description: 'Lire 10 articles de blog',
                icon: 'fa-newspaper',
                category: 'learning',
                xp: 20,
                rarity: 'common',
                requirement: { type: 'articles', count: 10 },
                unlocked: false
            },

            // Exploration
            'explorer': {
                id: 'explorer',
                name: 'Explorateur',
                description: 'Visiter toutes les sections du site',
                icon: 'fa-compass',
                category: 'exploration',
                xp: 30,
                rarity: 'uncommon',
                unlocked: false
            },
            'threat-watcher': {
                id: 'threat-watcher',
                name: 'Observateur de Menaces',
                description: 'Consulter la carte des menaces',
                icon: 'fa-globe',
                category: 'exploration',
                xp: 10,
                rarity: 'common',
                unlocked: false
            },
            'tool-collector': {
                id: 'tool-collector',
                name: 'Collectionneur d\'Outils',
                description: 'Utiliser tous les outils de sécurité',
                icon: 'fa-tools',
                category: 'exploration',
                xp: 45,
                rarity: 'rare',
                unlocked: false
            },

            // Engagement
            '7-day-streak': {
                id: '7-day-streak',
                name: 'Régulier',
                description: 'Se connecter 7 jours consécutifs',
                icon: 'fa-fire',
                category: 'engagement',
                xp: 40,
                rarity: 'rare',
                requirement: { type: 'streak', count: 7 },
                unlocked: false
            },
            '30-day-streak': {
                id: '30-day-streak',
                name: 'Dévoué',
                description: 'Se connecter 30 jours consécutifs',
                icon: 'fa-fire-alt',
                category: 'engagement',
                xp: 100,
                rarity: 'legendary',
                requirement: { type: 'streak', count: 30 },
                unlocked: false
            },
            'early-adopter': {
                id: 'early-adopter',
                name: 'Pionnier',
                description: 'Membre depuis plus de 90 jours',
                icon: 'fa-medal',
                category: 'engagement',
                xp: 75,
                rarity: 'epic',
                unlocked: false
            },

            // Maîtrise
            'level-5': {
                id: 'level-5',
                name: 'Expert Confirmé',
                description: 'Atteindre le niveau 5',
                icon: 'fa-star',
                category: 'mastery',
                xp: 100,
                rarity: 'epic',
                unlocked: false
            },
            'all-achievements': {
                id: 'all-achievements',
                name: 'Complétionniste',
                description: 'Débloquer tous les achievements',
                icon: 'fa-crown',
                category: 'mastery',
                xp: 200,
                rarity: 'legendary',
                unlocked: false
            },
            'leaderboard-top10': {
                id: 'leaderboard-top10',
                name: 'Top 10',
                description: 'Atteindre le top 10 du leaderboard',
                icon: 'fa-ranking-star',
                category: 'mastery',
                xp: 150,
                rarity: 'legendary',
                unlocked: false
            }
        };

        this.weeklyChallenge = null;
        this.leaderboard = [];

        this.init();
    }

    init() {
        this.loadUserData();
        this.checkStreak();
        this.checkAchievements();
        this.loadWeeklyChallenge();
        this.updateDisplay();
    }

    getUserId() {
        let id = localStorage.getItem('cyberguard_user_id');
        if (!id) {
            id = 'user_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
            localStorage.setItem('cyberguard_user_id', id);
        }
        return id;
    }

    getUsername() {
        let username = localStorage.getItem('cyberguard_username');
        if (!username) {
            username = 'User' + Math.floor(Math.random() * 10000);
            localStorage.setItem('cyberguard_username', username);
        }
        return username;
    }

    loadUserData() {
        const saved = localStorage.getItem('cyberguard_gamification');
        if (saved) {
            const data = JSON.parse(saved);
            this.user = { ...this.user, ...data };

            // Restaurer les achievements débloqués
            this.user.achievements.forEach(achId => {
                if (this.achievements[achId]) {
                    this.achievements[achId].unlocked = true;
                }
            });
        }

        this.calculateLevel();
    }

    saveUserData() {
        localStorage.setItem('cyberguard_gamification', JSON.stringify(this.user));
    }

    checkStreak() {
        const now = new Date();
        const lastLogin = this.user.lastLogin ? new Date(this.user.lastLogin) : null;

        if (lastLogin) {
            const daysDiff = Math.floor((now - lastLogin) / (1000 * 60 * 60 * 24));

            if (daysDiff === 0) {
                // Même jour, pas de changement
                return;
            } else if (daysDiff === 1) {
                // Jour consécutif
                this.user.streak++;
            } else {
                // Streak cassé
                this.user.streak = 1;
            }
        } else {
            this.user.streak = 1;
        }

        this.user.lastLogin = now.toISOString();
        this.saveUserData();

        // Check achievements de streak
        this.checkAchievement('7-day-streak');
        this.checkAchievement('30-day-streak');
    }

    addXP(amount, reason = '') {
        this.user.xp += amount;
        this.user.totalPoints += amount;

        const oldLevel = this.user.level;
        this.calculateLevel();

        if (this.user.level > oldLevel) {
            this.onLevelUp(oldLevel, this.user.level);
        }

        this.saveUserData();
        this.updateDisplay();

        // Notification
        this.showNotification(`+${amount} XP ${reason ? '- ' + reason : ''}`, 'success');
    }

    calculateLevel() {
        for (let i = this.levels.length - 1; i >= 0; i--) {
            if (this.user.xp >= this.levels[i].xpRequired) {
                this.user.level = this.levels[i].level;
                break;
            }
        }
    }

    onLevelUp(oldLevel, newLevel) {
        const levelInfo = this.levels[newLevel - 1];

        // Animation et notification
        this.showNotification(
            `🎉 NIVEAU ${newLevel} ATTEINT ! ${levelInfo.name}`,
            'success',
            5000
        );

        // Confetti animation
        this.celebrateLevelUp();

        // Check achievement
        if (newLevel >= 5) {
            this.unlockAchievement('level-5');
        }
    }

    unlockAchievement(achievementId) {
        const achievement = this.achievements[achievementId];

        if (!achievement || achievement.unlocked) {
            return false;
        }

        achievement.unlocked = true;
        this.user.achievements.push(achievementId);
        this.user.badges.push(achievementId);

        // Ajouter XP
        this.addXP(achievement.xp, achievement.name);

        // Notification spéciale
        this.showAchievementUnlocked(achievement);

        this.saveUserData();
        this.updateAchievementsDisplay();

        // Vérifier si tous les achievements sont débloqués
        this.checkAllAchievementsUnlocked();

        return true;
    }

    checkAchievement(achievementId) {
        const achievement = this.achievements[achievementId];

        if (!achievement || achievement.unlocked || !achievement.requirement) {
            return;
        }

        const req = achievement.requirement;
        let count = 0;

        // Récupérer le compteur depuis le système approprié
        switch (req.type) {
            case 'scans':
                count = this.getUserStatCount('urlScans');
                break;
            case 'passwords':
                count = this.getUserStatCount('passwordsGenerated');
                break;
            case 'quizzes':
                count = this.getUserStatCount('quizzesTaken');
                break;
            case 'ssl-checks':
                const sslStats = localStorage.getItem('cyberguard_ssl_stats');
                count = sslStats ? JSON.parse(sslStats).totalChecks || 0 : 0;
                break;
            case 'ssh-keys':
                const sshStats = localStorage.getItem('cyberguard_ssh_stats');
                count = sshStats ? JSON.parse(sshStats).totalGenerated || 0 : 0;
                break;
            case 'streak':
                count = this.user.streak;
                break;
            case 'articles':
                count = parseInt(localStorage.getItem('cyberguard_articles_read') || '0');
                break;
        }

        if (count >= req.count) {
            this.unlockAchievement(achievementId);
        }
    }

    checkAchievements() {
        // Check tous les achievements qui ont des requirements
        Object.keys(this.achievements).forEach(achId => {
            this.checkAchievement(achId);
        });

        // Check achievement pionnier
        const accountAge = Date.now() - this.user.createdAt;
        const days = accountAge / (1000 * 60 * 60 * 24);
        if (days >= 90) {
            this.unlockAchievement('early-adopter');
        }
    }

    checkAllAchievementsUnlocked() {
        const total = Object.keys(this.achievements).length;
        const unlocked = this.user.achievements.length;

        if (unlocked >= total - 1) { // -1 car "all-achievements" ne compte pas
            this.unlockAchievement('all-achievements');
        }
    }

    getUserStatCount(statName) {
        const stats = localStorage.getItem('cyberguard_user_stats');
        if (!stats) return 0;

        const data = JSON.parse(stats);
        return data[statName] || 0;
    }

    loadWeeklyChallenge() {
        const saved = localStorage.getItem('cyberguard_weekly_challenge');

        if (saved) {
            this.weeklyChallenge = JSON.parse(saved);

            // Vérifier si expiré
            if (new Date(this.weeklyChallenge.expiry) < new Date()) {
                this.generateWeeklyChallenge();
            }
        } else {
            this.generateWeeklyChallenge();
        }

        this.updateChallengeDisplay();
    }

    generateWeeklyChallenge() {
        const now = new Date();
        const weekNumber = this.getWeekNumber(now);
        const year = now.getFullYear();

        // Expiration: dimanche prochain à 23:59
        const expiry = new Date(now);
        expiry.setDate(now.getDate() + (7 - now.getDay()));
        expiry.setHours(23, 59, 59, 999);

        const challenges = [
            {
                title: 'Maître de la Sécurité',
                objectives: [
                    { task: 'Scans URL', target: 20, current: 0, reward: 50 },
                    { task: 'Mots de passe générés', target: 10, current: 0, reward: 30 }
                ]
            },
            {
                title: 'Apprenti Cyber',
                objectives: [
                    { task: 'Quiz complétés', target: 5, current: 0, reward: 40 },
                    { task: 'Articles lus', target: 8, current: 0, reward: 35 }
                ]
            },
            {
                title: 'Expert SSL',
                objectives: [
                    { task: 'Certificats vérifiés', target: 15, current: 0, reward: 60 },
                    { task: 'Clés SSH générées', target: 3, current: 0, reward: 25 }
                ]
            }
        ];

        const selected = challenges[Math.floor(Math.random() * challenges.length)];

        this.weeklyChallenge = {
            id: `week-${weekNumber}-${year}`,
            title: selected.title,
            description: 'Complétez tous les objectifs pour gagner des récompenses',
            objectives: selected.objectives,
            expiry: expiry.toISOString(),
            reward: {
                xp: selected.objectives.reduce((sum, obj) => sum + obj.reward, 0),
                badge: `weekly-${weekNumber}-${year}`
            },
            completed: false
        };

        this.saveWeeklyChallenge();
    }

    saveWeeklyChallenge() {
        localStorage.setItem('cyberguard_weekly_challenge', JSON.stringify(this.weeklyChallenge));
    }

    updateChallengeProgress(taskType, amount = 1) {
        if (!this.weeklyChallenge || this.weeklyChallenge.completed) return;

        const taskMap = {
            'scan': 'Scans URL',
            'password': 'Mots de passe générés',
            'quiz': 'Quiz complétés',
            'article': 'Articles lus',
            'ssl': 'Certificats vérifiés',
            'ssh': 'Clés SSH générées'
        };

        const taskName = taskMap[taskType];
        if (!taskName) return;

        const objective = this.weeklyChallenge.objectives.find(obj => obj.task === taskName);
        if (!objective) return;

        objective.current = Math.min(objective.current + amount, objective.target);

        // Vérifier si challenge complété
        const allCompleted = this.weeklyChallenge.objectives.every(obj => obj.current >= obj.target);

        if (allCompleted) {
            this.completeWeeklyChallenge();
        }

        this.saveWeeklyChallenge();
        this.updateChallengeDisplay();
    }

    completeWeeklyChallenge() {
        if (this.weeklyChallenge.completed) return;

        this.weeklyChallenge.completed = true;

        // Récompenses
        this.addXP(this.weeklyChallenge.reward.xp, 'Challenge Hebdomadaire');

        // Badge spécial
        this.user.badges.push(this.weeklyChallenge.reward.badge);

        this.saveUserData();
        this.saveWeeklyChallenge();

        // Notification
        this.showNotification(
            `🏆 Challenge Hebdomadaire Complété ! +${this.weeklyChallenge.reward.xp} XP`,
            'success',
            5000
        );
    }

    getWeekNumber(date) {
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    }

    // Leaderboard
    updateLeaderboard() {
        // En production, récupérer depuis le serveur
        // Pour l'instant, simulation locale

        this.leaderboard = [
            { rank: 1, username: this.user.username, xp: this.user.xp, level: this.user.level, achievements: this.user.achievements.length },
            { rank: 2, username: 'CyberNinja', xp: 2850, level: 5, achievements: 28 },
            { rank: 3, username: 'HackMaster', xp: 2340, level: 5, achievements: 25 },
            { rank: 4, username: 'SecurityPro', xp: 1920, level: 4, achievements: 22 },
            { rank: 5, username: 'CodeWarrior', xp: 1650, level: 4, achievements: 20 },
            { rank: 6, username: 'DataShield', xp: 1420, level: 4, achievements: 18 },
            { rank: 7, username: 'NetDefender', xp: 1180, level: 3, achievements: 16 },
            { rank: 8, username: 'CryptoKing', xp: 980, level: 3, achievements: 14 },
            { rank: 9, username: 'FirewallFox', xp: 850, level: 3, achievements: 12 },
            { rank: 10, username: 'ByteGuardian', xp: 720, level: 2, achievements: 10 }
        ];

        // Trier par XP
        this.leaderboard.sort((a, b) => b.xp - a.xp);

        // Mettre à jour les rangs
        this.leaderboard.forEach((entry, index) => {
            entry.rank = index + 1;
        });

        // Check achievement top 10
        const userRank = this.leaderboard.findIndex(e => e.username === this.user.username);
        if (userRank >= 0 && userRank < 10) {
            this.unlockAchievement('leaderboard-top10');
        }

        this.updateLeaderboardDisplay();
    }

    // Affichage
    updateDisplay() {
        this.updateLevelDisplay();
        this.updateXPDisplay();
        this.updateAchievementsDisplay();
        this.updateBadgesDisplay();
        this.updateStreakDisplay();
    }

    updateLevelDisplay() {
        const element = document.getElementById('user-level-display');
        if (!element) return;

        const levelInfo = this.levels[this.user.level - 1];
        const nextLevel = this.levels[this.user.level];
        const xpToNext = nextLevel ? nextLevel.xpRequired - this.user.xp : 0;

        element.innerHTML = `
            <div class="level-badge" style="background: ${levelInfo.color}">
                <i class="fas ${levelInfo.icon}"></i>
                <span class="level-number">${this.user.level}</span>
            </div>
            <div class="level-info">
                <div class="level-name">${levelInfo.name}</div>
                ${nextLevel ? `<div class="level-progress-text">${xpToNext} XP jusqu'au niveau ${nextLevel.level}</div>` : '<div class="level-max">Niveau Maximum!</div>'}
            </div>
        `;
    }

    updateXPDisplay() {
        const element = document.getElementById('user-xp-display');
        if (!element) return;

        const nextLevel = this.levels[this.user.level];
        const currentLevelXP = this.levels[this.user.level - 1].xpRequired;
        const nextLevelXP = nextLevel ? nextLevel.xpRequired : this.user.xp;

        const progress = ((this.user.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;

        element.innerHTML = `
            <div class="xp-bar">
                <div class="xp-fill" style="width: ${progress}%"></div>
            </div>
            <div class="xp-text">${this.user.xp} / ${nextLevelXP} XP</div>
        `;
    }

    updateAchievementsDisplay() {
        const container = document.getElementById('achievements-container');
        if (!container) return;

        const categories = ['security', 'learning', 'exploration', 'engagement', 'mastery'];

        let html = '';

        categories.forEach(category => {
            const categoryAchievements = Object.values(this.achievements).filter(a => a.category === category);

            html += `
                <div class="achievement-category">
                    <h3 class="category-title">${this.getCategoryName(category)}</h3>
                    <div class="achievements-grid">
                        ${categoryAchievements.map(ach => this.renderAchievement(ach)).join('')}
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    renderAchievement(achievement) {
        const rarityColors = {
            'common': '#aaa',
            'uncommon': '#00d4ff',
            'rare': '#ffd700',
            'epic': '#a020f0',
            'legendary': '#ff8c00'
        };

        return `
            <div class="achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}"
                 style="border-color: ${rarityColors[achievement.rarity]}">
                <div class="achievement-icon">
                    <i class="fas ${achievement.icon}"></i>
                </div>
                <div class="achievement-info">
                    <div class="achievement-name">${achievement.name}</div>
                    <div class="achievement-description">${achievement.description}</div>
                    <div class="achievement-xp">+${achievement.xp} XP</div>
                    <div class="achievement-rarity" style="color: ${rarityColors[achievement.rarity]}">
                        ${achievement.rarity.toUpperCase()}
                    </div>
                </div>
                ${achievement.unlocked ? '<div class="unlocked-badge"><i class="fas fa-check-circle"></i></div>' : ''}
            </div>
        `;
    }

    updateBadgesDisplay() {
        const container = document.getElementById('badges-display');
        if (!container) return;

        if (this.user.badges.length === 0) {
            container.innerHTML = '<p class="no-badges">Aucun badge débloqué</p>';
            return;
        }

        const html = this.user.badges.slice(0, 10).map(badgeId => {
            const achievement = this.achievements[badgeId];
            if (!achievement) return '';

            return `
                <div class="badge-mini" title="${achievement.name}">
                    <i class="fas ${achievement.icon}"></i>
                </div>
            `;
        }).join('');

        container.innerHTML = html;
    }

    updateStreakDisplay() {
        const element = document.getElementById('streak-display');
        if (!element) return;

        element.innerHTML = `
            <i class="fas fa-fire" style="color: ${this.user.streak >= 7 ? '#ff8c00' : '#00ff41'}"></i>
            <span class="streak-count">${this.user.streak} jours</span>
        `;
    }

    updateChallengeDisplay() {
        const container = document.getElementById('weekly-challenge-container');
        if (!container || !this.weeklyChallenge) return;

        const timeLeft = this.getTimeLeft(this.weeklyChallenge.expiry);

        const html = `
            <div class="weekly-challenge ${this.weeklyChallenge.completed ? 'completed' : ''}">
                <div class="challenge-header">
                    <h3><i class="fas fa-trophy"></i> ${this.weeklyChallenge.title}</h3>
                    <div class="challenge-timer">
                        <i class="fas fa-clock"></i> ${timeLeft}
                    </div>
                </div>
                <p class="challenge-description">${this.weeklyChallenge.description}</p>
                <div class="challenge-objectives">
                    ${this.weeklyChallenge.objectives.map(obj => `
                        <div class="objective">
                            <div class="objective-header">
                                <span>${obj.task}</span>
                                <span>${obj.current} / ${obj.target}</span>
                            </div>
                            <div class="objective-progress-bar">
                                <div class="objective-progress-fill" style="width: ${(obj.current / obj.target) * 100}%"></div>
                            </div>
                            <div class="objective-reward">+${obj.reward} XP</div>
                        </div>
                    `).join('')}
                </div>
                <div class="challenge-reward">
                    <strong>Récompense Totale:</strong> ${this.weeklyChallenge.reward.xp} XP
                    ${this.weeklyChallenge.completed ? ' <span class="completed-badge">✓ COMPLÉTÉ</span>' : ''}
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    updateLeaderboardDisplay() {
        const container = document.getElementById('leaderboard-container');
        if (!container) return;

        const html = `
            <div class="leaderboard-list">
                ${this.leaderboard.map(entry => `
                    <div class="leaderboard-entry ${entry.username === this.user.username ? 'current-user' : ''}">
                        <div class="rank">
                            ${entry.rank <= 3 ? `<i class="fas fa-trophy" style="color: ${['#ffd700', '#c0c0c0', '#cd7f32'][entry.rank - 1]}"></i>` : `#${entry.rank}`}
                        </div>
                        <div class="user-info">
                            <div class="username">${entry.username}</div>
                            <div class="user-stats">
                                Niveau ${entry.level} • ${entry.achievements} achievements
                            </div>
                        </div>
                        <div class="user-xp">${entry.xp} XP</div>
                    </div>
                `).join('')}
            </div>
        `;

        container.innerHTML = html;
    }

    getCategoryName(category) {
        const names = {
            'security': '🛡️ Sécurité',
            'learning': '📚 Apprentissage',
            'exploration': '🔍 Exploration',
            'engagement': '🔥 Engagement',
            'mastery': '👑 Maîtrise'
        };
        return names[category] || category;
    }

    getTimeLeft(expiryDate) {
        const now = new Date();
        const expiry = new Date(expiryDate);
        const diff = expiry - now;

        if (diff <= 0) return 'Expiré';

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        if (days > 0) return `${days}j ${hours}h`;
        return `${hours}h`;
    }

    showAchievementUnlocked(achievement) {
        // Créer une notification spéciale pour achievement
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-notif-header">
                <i class="fas fa-star"></i> Achievement Débloqué !
            </div>
            <div class="achievement-notif-body">
                <i class="fas ${achievement.icon}"></i>
                <div>
                    <div class="achievement-notif-name">${achievement.name}</div>
                    <div class="achievement-notif-desc">${achievement.description}</div>
                    <div class="achievement-notif-xp">+${achievement.xp} XP</div>
                </div>
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 500);
        }, 5000);
    }

    celebrateLevelUp() {
        // Animation de confettis
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${['#00ff41', '#00d4ff', '#ffd700', '#ff8c00'][Math.floor(Math.random() * 4)]};
                left: ${Math.random() * 100}vw;
                top: -20px;
                animation: confettiFall ${3 + Math.random() * 2}s linear;
                z-index: 10000;
            `;
            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 5000);
        }
    }

    showNotification(message, type = 'info', duration = 3000) {
        if (window.NotificationSystem) {
            window.NotificationSystem.show(message, type, duration);
        } else {
            console.log(`[${type}] ${message}`);
        }
    }

    // API publique pour les autres modules
    recordAction(actionType, amount = 1) {
        const xpMap = {
            'scan': 5,
            'password': 3,
            'quiz': 15,
            'article': 2,
            'ssl': 4,
            'ssh': 3,
            '2fa': 4
        };

        const xp = xpMap[actionType] || 1;
        this.addXP(xp * amount, actionType);

        // Update challenge progress
        this.updateChallengeProgress(actionType, amount);

        // Check related achievements
        this.checkAchievements();
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    window.gamificationSystem = new GamificationSystem();

    // Mettre à jour le leaderboard toutes les 5 minutes
    setInterval(() => {
        window.gamificationSystem.updateLeaderboard();
    }, 300000);
});

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GamificationSystem;
}
