/**
 * ═══════════════════════════════════════════════════════════════
 * ACHIEVEMENT SYSTEM - Gamification & User Engagement
 * ═══════════════════════════════════════════════════════════════
 * Features:
 * - 20+ achievements/badges to unlock
 * - Progress tracking
 * - Points/XP system
 * - Level progression
 * - Achievement notifications
 * - Leaderboard (local)
 * - Statistics dashboard
 */

class AchievementSystem {
    constructor() {
        this.achievements = this.defineAchievements();
        this.userProgress = this.loadProgress();
        this.stats = this.loadStats();
        this.levels = this.defineLevels();

        this.init();
    }

    init() {
        // Create achievements button in header
        this.createAchievementButton();

        // Create achievements modal
        this.createAchievementModal();

        // Track user actions
        this.trackUserActions();

        // Check for achievements on load
        this.checkAchievements();

        console.log('🏆 Achievement System initialized');
    }

    defineAchievements() {
        return [
            // Visitor Achievements
            {
                id: 'first_visit',
                name: 'First Contact',
                description: 'Visit CyberGuard for the first time',
                icon: '👋',
                points: 10,
                category: 'visitor',
                condition: () => this.stats.visits >= 1
            },
            {
                id: 'loyal_visitor',
                name: 'Loyal Guardian',
                description: 'Visit the site 10 times',
                icon: '🔄',
                points: 50,
                category: 'visitor',
                condition: () => this.stats.visits >= 10
            },
            {
                id: 'veteran',
                name: 'Veteran Guardian',
                description: 'Visit the site 50 times',
                icon: '⭐',
                points: 200,
                category: 'visitor',
                condition: () => this.stats.visits >= 50
            },

            // Exploration Achievements
            {
                id: 'explorer',
                name: 'Digital Explorer',
                description: 'Visit all sections of the site',
                icon: '🗺️',
                points: 30,
                category: 'exploration',
                condition: () => this.stats.sectionsVisited.size >= 8
            },
            {
                id: 'blog_reader',
                name: 'Knowledge Seeker',
                description: 'Read 5 blog articles',
                icon: '📚',
                points: 40,
                category: 'exploration',
                condition: () => this.stats.blogArticlesRead >= 5
            },
            {
                id: 'threat_watcher',
                name: 'Threat Watcher',
                description: 'View the threat map for 2 minutes',
                icon: '🌍',
                points: 25,
                category: 'exploration',
                condition: () => this.stats.threatMapTime >= 120
            },

            // Tool Usage Achievements
            {
                id: 'password_tester',
                name: 'Password Pro',
                description: 'Test 10 passwords',
                icon: '🔐',
                points: 35,
                category: 'tools',
                condition: () => this.stats.passwordsChecked >= 10
            },
            {
                id: 'scanner_expert',
                name: 'Scanner Expert',
                description: 'Scan 20 URLs for phishing',
                icon: '🔍',
                points: 45,
                category: 'tools',
                condition: () => this.stats.urlsScanned >= 20
            },
            {
                id: 'tool_master',
                name: 'Tool Master',
                description: 'Use all 4 security tools',
                icon: '🛠️',
                points: 60,
                category: 'tools',
                condition: () => this.stats.toolsUsed.size >= 4
            },

            // Engagement Achievements
            {
                id: 'quiz_taker',
                name: 'Decision Maker',
                description: 'Complete the product quiz',
                icon: '🎯',
                points: 30,
                category: 'engagement',
                condition: () => this.stats.quizCompleted >= 1
            },
            {
                id: 'comparator_user',
                name: 'Smart Shopper',
                description: 'Use the product comparator',
                icon: '⚖️',
                points: 20,
                category: 'engagement',
                condition: () => this.stats.comparatorUsed >= 1
            },
            {
                id: 'theme_switcher',
                name: 'Style Master',
                description: 'Switch themes 5 times',
                icon: '🎨',
                points: 15,
                category: 'engagement',
                condition: () => this.stats.themeSwitches >= 5
            },
            {
                id: 'multilingual',
                name: 'Polyglot',
                description: 'Switch languages 3 times',
                icon: '🌐',
                points: 15,
                category: 'engagement',
                condition: () => this.stats.languageSwitches >= 3
            },

            // Time-based Achievements
            {
                id: 'night_owl',
                name: 'Night Owl',
                description: 'Visit between midnight and 4am',
                icon: '🦉',
                points: 25,
                category: 'special',
                condition: () => {
                    const hour = new Date().getHours();
                    return hour >= 0 && hour < 4 && this.stats.nightVisits >= 1;
                }
            },
            {
                id: 'speed_reader',
                name: 'Speed Reader',
                description: 'Read 3 articles in under 5 minutes',
                icon: '⚡',
                points: 40,
                category: 'special',
                condition: () => this.stats.fastReading >= 3
            },

            // Social Achievements
            {
                id: 'notification_master',
                name: 'Alert Guardian',
                description: 'Receive 50 security notifications',
                icon: '🔔',
                points: 50,
                category: 'special',
                condition: () => this.stats.notificationsReceived >= 50
            },

            // Advanced Achievements
            {
                id: 'completionist',
                name: 'Completionist',
                description: 'Unlock 10 achievements',
                icon: '💯',
                points: 100,
                category: 'meta',
                condition: () => {
                    const unlockedCount = Object.values(this.userProgress.achievements)
                        .filter(a => a.unlocked).length;
                    return unlockedCount >= 10;
                }
            },
            {
                id: 'point_collector',
                name: 'Point Collector',
                description: 'Earn 500 points',
                icon: '💎',
                points: 50,
                category: 'meta',
                condition: () => this.userProgress.totalPoints >= 500
            },
            {
                id: 'level_10',
                name: 'Guardian Elite',
                description: 'Reach level 10',
                icon: '👑',
                points: 150,
                category: 'meta',
                condition: () => this.userProgress.level >= 10
            },
            {
                id: 'cyber_master',
                name: 'Cyber Master',
                description: 'Unlock all achievements',
                icon: '🏆',
                points: 500,
                category: 'meta',
                condition: () => {
                    const unlockedCount = Object.values(this.userProgress.achievements)
                        .filter(a => a.unlocked).length;
                    return unlockedCount >= this.achievements.length - 1; // -1 because this achievement itself
                }
            }
        ];
    }

    defineLevels() {
        const levels = [];
        for (let i = 1; i <= 50; i++) {
            levels.push({
                level: i,
                pointsRequired: Math.floor(100 * Math.pow(1.5, i - 1)),
                title: this.getLevelTitle(i)
            });
        }
        return levels;
    }

    getLevelTitle(level) {
        if (level < 5) return 'Novice Guardian';
        if (level < 10) return 'Guardian Apprentice';
        if (level < 15) return 'Guardian';
        if (level < 20) return 'Senior Guardian';
        if (level < 30) return 'Elite Guardian';
        if (level < 40) return 'Master Guardian';
        return 'Legendary Guardian';
    }

    loadProgress() {
        const saved = localStorage.getItem('cyberguard-achievements');
        if (saved) {
            return JSON.parse(saved);
        }

        return {
            achievements: {},
            totalPoints: 0,
            level: 1,
            xp: 0
        };
    }

    loadStats() {
        const saved = localStorage.getItem('cyberguard-stats');
        if (saved) {
            const stats = JSON.parse(saved);
            // Convert arrays back to Sets
            stats.sectionsVisited = new Set(stats.sectionsVisited || []);
            stats.toolsUsed = new Set(stats.toolsUsed || []);
            return stats;
        }

        return {
            visits: 0,
            sectionsVisited: new Set(),
            blogArticlesRead: 0,
            threatMapTime: 0,
            passwordsChecked: 0,
            urlsScanned: 0,
            toolsUsed: new Set(),
            quizCompleted: 0,
            comparatorUsed: 0,
            themeSwitches: 0,
            languageSwitches: 0,
            nightVisits: 0,
            fastReading: 0,
            notificationsReceived: 0,
            firstVisitDate: Date.now()
        };
    }

    saveProgress() {
        localStorage.setItem('cyberguard-achievements', JSON.stringify(this.userProgress));
    }

    saveStats() {
        // Convert Sets to arrays for JSON serialization
        const statsToSave = {
            ...this.stats,
            sectionsVisited: Array.from(this.stats.sectionsVisited),
            toolsUsed: Array.from(this.stats.toolsUsed)
        };
        localStorage.setItem('cyberguard-stats', JSON.stringify(statsToSave));
    }

    trackUserActions() {
        // Track visit
        this.stats.visits++;

        // Check for night visit
        const hour = new Date().getHours();
        if (hour >= 0 && hour < 4) {
            this.stats.nightVisits++;
        }

        this.saveStats();

        // Track section visits via scroll
        const sections = document.querySelectorAll('section[id]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.stats.sectionsVisited.add(entry.target.id);
                    this.saveStats();
                    this.checkAchievements();
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => observer.observe(section));

        // Track theme switches
        window.addEventListener('themeChange', () => {
            this.stats.themeSwitches++;
            this.saveStats();
            this.checkAchievements();
        });

        // Track language switches
        window.addEventListener('languageChange', () => {
            this.stats.languageSwitches++;
            this.saveStats();
            this.checkAchievements();
        });

        // Track notifications (hook into notification system)
        const originalNotificationShow = window.notificationSystem?.show;
        if (originalNotificationShow) {
            window.notificationSystem.show = (...args) => {
                this.stats.notificationsReceived++;
                this.saveStats();
                this.checkAchievements();
                return originalNotificationShow.apply(window.notificationSystem, args);
            };
        }
    }

    checkAchievements() {
        let newAchievements = [];

        this.achievements.forEach(achievement => {
            const isUnlocked = this.userProgress.achievements[achievement.id]?.unlocked;

            if (!isUnlocked && achievement.condition()) {
                this.unlockAchievement(achievement);
                newAchievements.push(achievement);
            }
        });

        // Check for level up
        this.checkLevelUp();
    }

    unlockAchievement(achievement) {
        this.userProgress.achievements[achievement.id] = {
            unlocked: true,
            unlockedAt: Date.now()
        };

        this.userProgress.totalPoints += achievement.points;
        this.userProgress.xp += achievement.points;

        this.saveProgress();

        // Show notification
        if (window.notificationSystem) {
            window.notificationSystem.show(
                `🏆 Achievement Unlocked!`,
                `${achievement.icon} ${achievement.name} (+${achievement.points} points)`,
                'success',
                6000
            );
        }

        // Show achievement popup
        this.showAchievementPopup(achievement);
    }

    checkLevelUp() {
        const currentLevel = this.userProgress.level;
        const nextLevel = this.levels.find(l => l.level === currentLevel + 1);

        if (nextLevel && this.userProgress.xp >= nextLevel.pointsRequired) {
            this.userProgress.level++;
            this.userProgress.xp -= nextLevel.pointsRequired;

            this.saveProgress();

            // Show level up notification
            if (window.notificationSystem) {
                window.notificationSystem.show(
                    `🎉 Level Up!`,
                    `You are now Level ${this.userProgress.level} - ${nextLevel.title}`,
                    'success',
                    5000
                );
            }

            this.checkAchievements(); // Check for level-based achievements
        }
    }

    showAchievementPopup(achievement) {
        const popup = document.createElement('div');
        popup.className = 'achievement-popup';
        popup.innerHTML = `
            <div class="achievement-popup-content">
                <div class="achievement-popup-icon">${achievement.icon}</div>
                <div class="achievement-popup-text">
                    <div class="achievement-popup-label">Achievement Unlocked!</div>
                    <div class="achievement-popup-name">${achievement.name}</div>
                    <div class="achievement-popup-points">+${achievement.points} points</div>
                </div>
            </div>
        `;

        document.body.appendChild(popup);

        setTimeout(() => popup.classList.add('show'), 10);

        setTimeout(() => {
            popup.classList.remove('show');
            setTimeout(() => popup.remove(), 500);
        }, 5000);
    }

    createAchievementButton() {
        const header = document.querySelector('.cyber-header .header-content');
        if (!header) return;

        const achievementBtn = document.createElement('div');
        achievementBtn.className = 'achievement-btn-container';
        achievementBtn.innerHTML = `
            <button class="achievement-btn" id="achievement-btn" aria-label="Achievements">
                <span class="achievement-icon">🏆</span>
                <span class="achievement-level">Lvl ${this.userProgress.level}</span>
            </button>
        `;

        // Insert before nav
        const notificationBtn = header.querySelector('.notification-center-btn-container');
        if (notificationBtn) {
            notificationBtn.after(achievementBtn);
        } else {
            const nav = header.querySelector('.nav-menu');
            if (nav) {
                header.insertBefore(achievementBtn, nav);
            }
        }

        document.getElementById('achievement-btn').addEventListener('click', () => {
            this.openAchievementModal();
        });
    }

    createAchievementModal() {
        const modal = document.createElement('div');
        modal.id = 'achievement-modal';
        modal.className = 'achievement-modal';
        modal.innerHTML = `
            <div class="achievement-modal-content">
                <div class="achievement-modal-header">
                    <h2>🏆 Achievements & Progress</h2>
                    <button class="achievement-modal-close" id="achievement-modal-close">✖</button>
                </div>

                <div class="achievement-modal-stats">
                    <div class="achievement-stat-card">
                        <div class="achievement-stat-icon">⭐</div>
                        <div class="achievement-stat-value">${this.userProgress.level}</div>
                        <div class="achievement-stat-label">Level</div>
                    </div>
                    <div class="achievement-stat-card">
                        <div class="achievement-stat-icon">💎</div>
                        <div class="achievement-stat-value">${this.userProgress.totalPoints}</div>
                        <div class="achievement-stat-label">Points</div>
                    </div>
                    <div class="achievement-stat-card">
                        <div class="achievement-stat-icon">🏆</div>
                        <div class="achievement-stat-value">${this.getUnlockedCount()}/${this.achievements.length}</div>
                        <div class="achievement-stat-label">Unlocked</div>
                    </div>
                </div>

                <div class="achievement-level-progress">
                    <div class="achievement-level-info">
                        <span>Level ${this.userProgress.level}</span>
                        <span>Level ${this.userProgress.level + 1}</span>
                    </div>
                    <div class="achievement-progress-bar">
                        <div class="achievement-progress-fill" style="width: ${this.getLevelProgress()}%"></div>
                    </div>
                    <div class="achievement-xp-info">${this.userProgress.xp} / ${this.getNextLevelXP()} XP</div>
                </div>

                <div class="achievement-modal-body" id="achievement-modal-body">
                    ${this.renderAchievements()}
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close button
        document.getElementById('achievement-modal-close').addEventListener('click', () => {
            this.closeAchievementModal();
        });

        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeAchievementModal();
            }
        });
    }

    renderAchievements() {
        const categories = {
            visitor: 'Visitor',
            exploration: 'Exploration',
            tools: 'Tool Mastery',
            engagement: 'Engagement',
            special: 'Special',
            meta: 'Meta'
        };

        let html = '';

        Object.entries(categories).forEach(([key, label]) => {
            const categoryAchievements = this.achievements.filter(a => a.category === key);

            html += `
                <div class="achievement-category">
                    <h3 class="achievement-category-title">${label}</h3>
                    <div class="achievement-grid">
                        ${categoryAchievements.map(achievement => this.renderAchievementCard(achievement)).join('')}
                    </div>
                </div>
            `;
        });

        return html;
    }

    renderAchievementCard(achievement) {
        const isUnlocked = this.userProgress.achievements[achievement.id]?.unlocked;
        const unlockedAt = this.userProgress.achievements[achievement.id]?.unlockedAt;

        return `
            <div class="achievement-card ${isUnlocked ? 'unlocked' : 'locked'}">
                <div class="achievement-card-icon">${isUnlocked ? achievement.icon : '🔒'}</div>
                <div class="achievement-card-name">${achievement.name}</div>
                <div class="achievement-card-desc">${achievement.description}</div>
                <div class="achievement-card-points">${achievement.points} pts</div>
                ${isUnlocked ? `<div class="achievement-card-date">Unlocked ${this.formatDate(unlockedAt)}</div>` : ''}
            </div>
        `;
    }

    openAchievementModal() {
        const modal = document.getElementById('achievement-modal');
        modal.classList.add('open');

        // Refresh content
        document.getElementById('achievement-modal-body').innerHTML = this.renderAchievements();
    }

    closeAchievementModal() {
        const modal = document.getElementById('achievement-modal');
        modal.classList.remove('open');
    }

    getUnlockedCount() {
        return Object.values(this.userProgress.achievements).filter(a => a.unlocked).length;
    }

    getLevelProgress() {
        const nextLevelXP = this.getNextLevelXP();
        return Math.min((this.userProgress.xp / nextLevelXP) * 100, 100);
    }

    getNextLevelXP() {
        const nextLevel = this.levels.find(l => l.level === this.userProgress.level + 1);
        return nextLevel ? nextLevel.pointsRequired : 999999;
    }

    formatDate(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'today';
        if (diffDays === 1) return 'yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return date.toLocaleDateString();
    }

    // Public API for tracking specific actions
    trackAction(action, value = 1) {
        switch (action) {
            case 'blogRead':
                this.stats.blogArticlesRead += value;
                break;
            case 'threatMapView':
                this.stats.threatMapTime += value;
                break;
            case 'passwordCheck':
                this.stats.passwordsChecked += value;
                break;
            case 'urlScan':
                this.stats.urlsScanned += value;
                break;
            case 'toolUse':
                this.stats.toolsUsed.add(value);
                break;
            case 'quizComplete':
                this.stats.quizCompleted += value;
                break;
            case 'comparatorUse':
                this.stats.comparatorUsed += value;
                break;
        }

        this.saveStats();
        this.checkAchievements();
    }
}

// Initialize achievement system when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.achievementSystem = new AchievementSystem();
    });
} else {
    window.achievementSystem = new AchievementSystem();
}
