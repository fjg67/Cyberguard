/**
 * CyberGuard Pro - Dashboard Amélioré avec Chart.js
 * Tableau de bord complet avec graphiques, historique et statistiques
 */

class EnhancedDashboard {
    constructor() {
        this.charts = {};
        this.scanHistory = [];
        this.userStats = {
            urlScans: 0,
            emailChecks: 0,
            passwordsGenerated: 0,
            quizzesTaken: 0,
            achievementsUnlocked: 0,
            securityScore: 0,
            lastActivity: null
        };

        this.threatData = {
            labels: [],
            datasets: []
        };

        this.init();
    }

    init() {
        this.loadUserData();
        this.loadScanHistory();
        this.initializeCharts();
        this.updateAllStats();
        this.startRealtimeUpdates();
    }

    loadUserData() {
        const saved = localStorage.getItem('cyberguard_user_stats');
        if (saved) {
            this.userStats = { ...this.userStats, ...JSON.parse(saved) };
        }

        // Agrégation depuis tous les modules
        this.aggregateStats();
    }

    aggregateStats() {
        // Récupère les stats de tous les outils
        const modules = [
            'cyberguard_passphrase_stats',
            'cyberguard_2fa_stats',
            'cyberguard_ssl_stats',
            'cyberguard_ssh_stats'
        ];

        modules.forEach(module => {
            const data = localStorage.getItem(module);
            if (data) {
                const stats = JSON.parse(data);
                // Aggrégation basée sur le module
                if (module.includes('passphrase') || module.includes('ssh')) {
                    this.userStats.passwordsGenerated += stats.totalGenerated || 0;
                } else if (module.includes('2fa')) {
                    this.userStats.quizzesTaken += stats.totalTests || 0;
                } else if (module.includes('ssl')) {
                    this.userStats.urlScans += stats.totalChecks || 0;
                }
            }
        });

        // Calcul du score de sécurité
        this.calculateSecurityScore();
    }

    calculateSecurityScore() {
        let score = 0;

        // Points basés sur l'activité
        score += Math.min(this.userStats.urlScans * 5, 25);
        score += Math.min(this.userStats.passwordsGenerated * 3, 20);
        score += Math.min(this.userStats.quizzesTaken * 4, 20);
        score += Math.min(this.userStats.achievementsUnlocked * 7, 35);

        this.userStats.securityScore = Math.min(score, 100);
        this.saveUserData();
    }

    loadScanHistory() {
        const saved = localStorage.getItem('cyberguard_scan_history');
        if (saved) {
            this.scanHistory = JSON.parse(saved);
        }
    }

    saveScanHistory() {
        localStorage.setItem('cyberguard_scan_history', JSON.stringify(this.scanHistory));
    }

    saveUserData() {
        localStorage.setItem('cyberguard_user_stats', JSON.stringify(this.userStats));
    }

    addScanToHistory(url, result, type = 'url') {
        const entry = {
            id: Date.now(),
            url: url,
            type: type,
            result: result,
            timestamp: new Date().toISOString(),
            status: result.safe ? 'safe' : 'danger'
        };

        this.scanHistory.unshift(entry);

        // Limite à 100 entrées
        if (this.scanHistory.length > 100) {
            this.scanHistory = this.scanHistory.slice(0, 100);
        }

        this.saveScanHistory();
        this.updateHistoryDisplay();
        this.updateActivityChart();
    }

    initializeCharts() {
        this.createActivityChart();
        this.createSecurityScoreChart();
        this.createThreatDistributionChart();
        this.createWeeklyActivityChart();
    }

    createActivityChart() {
        const canvas = document.getElementById('activity-chart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        // Données des 7 derniers jours
        const last7Days = this.getLast7DaysData();

        this.charts.activity = new Chart(ctx, {
            type: 'line',
            data: {
                labels: last7Days.labels,
                datasets: [{
                    label: 'Scans effectués',
                    data: last7Days.scans,
                    borderColor: '#00ff41',
                    backgroundColor: 'rgba(0, 255, 65, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'Outils utilisés',
                    data: last7Days.tools,
                    borderColor: '#00d4ff',
                    backgroundColor: 'rgba(0, 212, 255, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            color: '#fff',
                            font: {
                                family: 'Orbitron'
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Activité des 7 derniers jours',
                        color: '#00ff41',
                        font: {
                            size: 16,
                            family: 'Orbitron'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: '#fff'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#fff'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    }
                }
            }
        });
    }

    createSecurityScoreChart() {
        const canvas = document.getElementById('security-score-chart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const score = this.userStats.securityScore;

        this.charts.securityScore = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Score', 'Restant'],
                datasets: [{
                    data: [score, 100 - score],
                    backgroundColor: [
                        score >= 80 ? '#00ff41' : score >= 60 ? '#ffd700' : '#ff0040',
                        'rgba(255, 255, 255, 0.1)'
                    ],
                    borderColor: ['transparent'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: `Score de Sécurité: ${score}/100`,
                        color: '#00ff41',
                        font: {
                            size: 16,
                            family: 'Orbitron'
                        }
                    }
                }
            }
        });
    }

    createThreatDistributionChart() {
        const canvas = document.getElementById('threat-distribution-chart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        const threatTypes = ['Phishing', 'Malware', 'Ransomware', 'DDoS', 'Autre'];
        const threatCounts = [35, 25, 20, 15, 5]; // Simulation

        this.charts.threatDistribution = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: threatTypes,
                datasets: [{
                    label: 'Menaces détectées',
                    data: threatCounts,
                    backgroundColor: [
                        'rgba(255, 0, 64, 0.8)',
                        'rgba(255, 140, 0, 0.8)',
                        'rgba(255, 215, 0, 0.8)',
                        'rgba(0, 212, 255, 0.8)',
                        'rgba(0, 255, 65, 0.8)'
                    ],
                    borderColor: [
                        '#ff0040',
                        '#ff8c00',
                        '#ffd700',
                        '#00d4ff',
                        '#00ff41'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Distribution des Menaces',
                        color: '#00ff41',
                        font: {
                            size: 16,
                            family: 'Orbitron'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: '#fff'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#fff'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    }
                }
            }
        });
    }

    createWeeklyActivityChart() {
        const canvas = document.getElementById('weekly-activity-chart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        this.charts.weeklyActivity = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Scans', 'Outils', 'Quiz', 'Articles', 'Guides', 'Achievements'],
                datasets: [{
                    label: 'Cette semaine',
                    data: [
                        this.userStats.urlScans % 20,
                        this.userStats.passwordsGenerated % 15,
                        this.userStats.quizzesTaken % 10,
                        Math.floor(Math.random() * 8),
                        Math.floor(Math.random() * 6),
                        this.userStats.achievementsUnlocked % 12
                    ],
                    borderColor: '#00ff41',
                    backgroundColor: 'rgba(0, 255, 65, 0.2)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#fff',
                            font: {
                                family: 'Orbitron'
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Activité Hebdomadaire',
                        color: '#00ff41',
                        font: {
                            size: 16,
                            family: 'Orbitron'
                        }
                    }
                },
                scales: {
                    r: {
                        ticks: {
                            color: '#fff',
                            backdropColor: 'transparent'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.2)'
                        },
                        pointLabels: {
                            color: '#fff',
                            font: {
                                family: 'Orbitron'
                            }
                        }
                    }
                }
            }
        });
    }

    getLast7DaysData() {
        const labels = [];
        const scans = [];
        const tools = [];

        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            labels.push(date.toLocaleDateString('fr-FR', { weekday: 'short' }));

            // Simulation basée sur l'historique
            const dayScans = this.scanHistory.filter(entry => {
                const entryDate = new Date(entry.timestamp);
                return entryDate.toDateString() === date.toDateString();
            }).length;

            scans.push(dayScans || Math.floor(Math.random() * 10));
            tools.push(Math.floor(Math.random() * 8));
        }

        return { labels, scans, tools };
    }

    updateHistoryDisplay() {
        const historyContainer = document.getElementById('scan-history-container');
        if (!historyContainer) return;

        if (this.scanHistory.length === 0) {
            historyContainer.innerHTML = '<p class="no-history">Aucun scan effectué récemment</p>';
            return;
        }

        const html = `
            <div class="history-list">
                ${this.scanHistory.slice(0, 20).map(entry => `
                    <div class="history-item ${entry.status}">
                        <div class="history-icon">
                            <i class="fas fa-${entry.status === 'safe' ? 'check-circle' : 'exclamation-triangle'}"></i>
                        </div>
                        <div class="history-content">
                            <div class="history-url">${this.truncateUrl(entry.url)}</div>
                            <div class="history-meta">
                                <span class="history-type">${entry.type.toUpperCase()}</span>
                                <span class="history-time">${this.timeAgo(entry.timestamp)}</span>
                            </div>
                        </div>
                        <div class="history-status ${entry.status}">
                            ${entry.status === 'safe' ? 'Sûr' : 'Risque'}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        historyContainer.innerHTML = html;
    }

    updateAllStats() {
        // Cartes de statistiques
        this.updateStatCard('total-scans', this.userStats.urlScans, 'Scans Total');
        this.updateStatCard('passwords-generated', this.userStats.passwordsGenerated, 'Mots de passe');
        this.updateStatCard('quizzes-taken', this.userStats.quizzesTaken, 'Quiz complétés');
        this.updateStatCard('achievements', this.userStats.achievementsUnlocked, 'Achievements');

        // Score de sécurité
        this.updateSecurityScoreDisplay();

        // Historique
        this.updateHistoryDisplay();
    }

    updateStatCard(elementId, value, label) {
        const element = document.getElementById(elementId);
        if (!element) return;

        element.innerHTML = `
            <div class="stat-card-value">${value}</div>
            <div class="stat-card-label">${label}</div>
        `;
    }

    updateSecurityScoreDisplay() {
        const element = document.getElementById('security-score-display');
        if (!element) return;

        const score = this.userStats.securityScore;
        let level = 'Débutant';
        let color = '#ff0040';

        if (score >= 80) {
            level = 'Expert';
            color = '#00ff41';
        } else if (score >= 60) {
            level = 'Avancé';
            color = '#00d4ff';
        } else if (score >= 40) {
            level = 'Intermédiaire';
            color = '#ffd700';
        }

        element.innerHTML = `
            <div class="score-display">
                <div class="score-value" style="color: ${color}">${score}</div>
                <div class="score-level">${level}</div>
            </div>
        `;
    }

    updateActivityChart() {
        if (this.charts.activity) {
            const last7Days = this.getLast7DaysData();
            this.charts.activity.data.labels = last7Days.labels;
            this.charts.activity.data.datasets[0].data = last7Days.scans;
            this.charts.activity.data.datasets[1].data = last7Days.tools;
            this.charts.activity.update();
        }
    }

    startRealtimeUpdates() {
        // Mise à jour toutes les 30 secondes
        setInterval(() => {
            this.aggregateStats();
            this.updateAllStats();

            // Mise à jour des graphiques si nécessaire
            if (this.charts.securityScore) {
                this.charts.securityScore.data.datasets[0].data = [
                    this.userStats.securityScore,
                    100 - this.userStats.securityScore
                ];
                this.charts.securityScore.update();
            }
        }, 30000);
    }

    truncateUrl(url, maxLength = 50) {
        if (url.length <= maxLength) return url;
        return url.substring(0, maxLength) + '...';
    }

    timeAgo(timestamp) {
        const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);

        if (seconds < 60) return 'À l\'instant';
        if (seconds < 3600) return `Il y a ${Math.floor(seconds / 60)} min`;
        if (seconds < 86400) return `Il y a ${Math.floor(seconds / 3600)} h`;
        if (seconds < 604800) return `Il y a ${Math.floor(seconds / 86400)} j`;

        return new Date(timestamp).toLocaleDateString('fr-FR');
    }

    // API publique pour les autres modules
    recordScan(url, result, type = 'url') {
        this.userStats.urlScans++;
        this.addScanToHistory(url, result, type);
        this.calculateSecurityScore();
        this.updateAllStats();
    }

    recordPasswordGeneration() {
        this.userStats.passwordsGenerated++;
        this.calculateSecurityScore();
        this.saveUserData();
        this.updateAllStats();
    }

    recordQuizCompletion() {
        this.userStats.quizzesTaken++;
        this.calculateSecurityScore();
        this.saveUserData();
        this.updateAllStats();
    }

    unlockAchievement() {
        this.userStats.achievementsUnlocked++;
        this.calculateSecurityScore();
        this.saveUserData();
        this.updateAllStats();
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('enhanced-dashboard-section')) {
        window.enhancedDashboard = new EnhancedDashboard();
    }
});

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EnhancedDashboard;
}
