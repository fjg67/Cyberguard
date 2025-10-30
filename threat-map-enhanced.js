/**
 * CyberGuard Pro - Carte des Menaces Améliorée
 * Filtres par type d'attaque, historique 24h/7j/30j, alertes critiques
 */

class ThreatMapEnhanced {
    constructor() {
        this.threatTypes = {
            ddos: { name: 'DDoS', color: '#ff0040', icon: 'fa-bolt' },
            malware: { name: 'Malware', color: '#ff8c00', icon: 'fa-virus' },
            phishing: { name: 'Phishing', color: '#ffd700', icon: 'fa-fish' },
            ransomware: { name: 'Ransomware', color: '#a020f0', icon: 'fa-lock' },
            databreach: { name: 'Data Breach', color: '#00d4ff', icon: 'fa-database' },
            botnet: { name: 'Botnet', color: '#00ff41', icon: 'fa-network-wired' }
        };

        this.activeFilters = Object.keys(this.threatTypes);
        this.timeRange = '24h'; // 24h, 7d, 30d
        this.activeThreats = [];
        this.threatHistory = {
            '24h': [],
            '7d': [],
            '30d': []
        };

        this.criticalAlerts = [];
        this.attackCounters = {
            total: 0,
            byType: {},
            byCountry: {}
        };

        this.autoRefresh = true;
        this.refreshInterval = null;

        this.init();
    }

    init() {
        this.loadThreatHistory();
        this.setupEventListeners();
        this.generateThreats();
        this.updateDisplay();
        this.startAutoRefresh();
    }

    setupEventListeners() {
        // Filtres par type
        const filterButtons = document.querySelectorAll('.threat-filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const type = e.currentTarget.dataset.type;
                this.toggleFilter(type);
            });
        });

        // Sélecteur de période
        const timeRangeSelector = document.getElementById('threat-time-range');
        if (timeRangeSelector) {
            timeRangeSelector.addEventListener('change', (e) => {
                this.timeRange = e.target.value;
                this.updateHistoryDisplay();
            });
        }

        // Toggle auto-refresh
        const autoRefreshToggle = document.getElementById('auto-refresh-toggle');
        if (autoRefreshToggle) {
            autoRefreshToggle.addEventListener('change', (e) => {
                this.autoRefresh = e.target.checked;
                if (this.autoRefresh) {
                    this.startAutoRefresh();
                } else {
                    this.stopAutoRefresh();
                }
            });
        }

        // Bouton de refresh manuel
        const refreshBtn = document.getElementById('refresh-threats-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.generateThreats();
                this.updateDisplay();
            });
        }

        // Bouton "clear alerts"
        const clearAlertsBtn = document.getElementById('clear-alerts-btn');
        if (clearAlertsBtn) {
            clearAlertsBtn.addEventListener('click', () => {
                this.clearAlerts();
            });
        }
    }

    toggleFilter(type) {
        const index = this.activeFilters.indexOf(type);

        if (index > -1) {
            this.activeFilters.splice(index, 1);
        } else {
            this.activeFilters.push(type);
        }

        // Update button state
        const btn = document.querySelector(`[data-type="${type}"]`);
        if (btn) {
            btn.classList.toggle('active');
        }

        this.updateDisplay();
    }

    generateThreats() {
        // Génère de nouvelles menaces simulées
        const numThreats = Math.floor(Math.random() * 5) + 3; // 3-7 nouvelles menaces

        for (let i = 0; i < numThreats; i++) {
            const threat = this.generateRandomThreat();
            this.activeThreats.unshift(threat);

            // Ajouter à l'historique
            this.addToHistory(threat);

            // Vérifier si critique
            if (threat.severity === 'critical') {
                this.createCriticalAlert(threat);
            }
        }

        // Limiter à 100 menaces actives
        if (this.activeThreats.length > 100) {
            this.activeThreats = this.activeThreats.slice(0, 100);
        }

        // Mettre à jour les compteurs
        this.updateCounters();

        // Sauvegarder l'historique
        this.saveThreatHistory();
    }

    generateRandomThreat() {
        const types = Object.keys(this.threatTypes);
        const type = types[Math.floor(Math.random() * types.length)];

        const countries = ['US', 'CN', 'RU', 'KR', 'BR', 'IN', 'DE', 'GB', 'FR', 'JP'];
        const sourceCountry = countries[Math.floor(Math.random() * countries.length)];
        const targetCountry = countries[Math.floor(Math.random() * countries.length)];

        const severities = ['low', 'medium', 'high', 'critical'];
        const severityWeights = [40, 30, 20, 10]; // Probabilités
        const severity = this.weightedRandom(severities, severityWeights);

        const targets = [
            'Enterprise Network',
            'Government System',
            'Healthcare Facility',
            'Financial Institution',
            'E-commerce Platform',
            'Cloud Infrastructure',
            'IoT Devices',
            'Mobile Applications'
        ];

        return {
            id: Date.now() + Math.random(),
            type: type,
            severity: severity,
            sourceCountry: sourceCountry,
            targetCountry: targetCountry,
            sourceIP: this.generateRandomIP(),
            targetIP: this.generateRandomIP(),
            target: targets[Math.floor(Math.random() * targets.length)],
            timestamp: new Date().toISOString(),
            blocked: Math.random() > 0.3, // 70% de chances d'être bloqué
            affectedSystems: Math.floor(Math.random() * 5000) + 1
        };
    }

    weightedRandom(items, weights) {
        const totalWeight = weights.reduce((sum, w) => sum + w, 0);
        let random = Math.random() * totalWeight;

        for (let i = 0; i < items.length; i++) {
            random -= weights[i];
            if (random <= 0) {
                return items[i];
            }
        }

        return items[items.length - 1];
    }

    generateRandomIP() {
        return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
    }

    addToHistory(threat) {
        // Ajouter à tous les historiques
        ['24h', '7d', '30d'].forEach(range => {
            this.threatHistory[range].push(threat);
        });

        // Nettoyer les anciennes entrées
        const now = Date.now();
        const limits = {
            '24h': 24 * 60 * 60 * 1000,
            '7d': 7 * 24 * 60 * 60 * 1000,
            '30d': 30 * 24 * 60 * 60 * 1000
        };

        Object.keys(this.threatHistory).forEach(range => {
            this.threatHistory[range] = this.threatHistory[range].filter(t => {
                return (now - new Date(t.timestamp).getTime()) < limits[range];
            });
        });
    }

    createCriticalAlert(threat) {
        const alert = {
            id: threat.id,
            level: 'CRITICAL',
            type: this.threatTypes[threat.type].name,
            message: `Attaque ${this.threatTypes[threat.type].name} détectée`,
            source: threat.sourceCountry,
            target: threat.targetCountry,
            targetSystem: threat.target,
            timestamp: threat.timestamp,
            affectedSystems: threat.affectedSystems,
            dismissed: false
        };

        this.criticalAlerts.unshift(alert);

        // Limiter à 20 alertes
        if (this.criticalAlerts.length > 20) {
            this.criticalAlerts = this.criticalAlerts.slice(0, 20);
        }

        // Notification
        this.showCriticalNotification(alert);

        this.updateAlertsDisplay();
    }

    showCriticalNotification(alert) {
        if (window.NotificationSystem) {
            window.NotificationSystem.show(
                `⚠️ ALERTE CRITIQUE: ${alert.type} - ${alert.targetSystem}`,
                'error',
                5000
            );
        }
    }

    clearAlerts() {
        this.criticalAlerts = this.criticalAlerts.map(alert => ({
            ...alert,
            dismissed: true
        }));

        this.updateAlertsDisplay();
    }

    updateCounters() {
        // Reset counters
        this.attackCounters = {
            total: 0,
            byType: {},
            byCountry: {}
        };

        // Compter les menaces de la période sélectionnée
        const threats = this.threatHistory[this.timeRange];

        this.attackCounters.total = threats.length;

        threats.forEach(threat => {
            // Par type
            this.attackCounters.byType[threat.type] = (this.attackCounters.byType[threat.type] || 0) + 1;

            // Par pays source
            this.attackCounters.byCountry[threat.sourceCountry] = (this.attackCounters.byCountry[threat.sourceCountry] || 0) + 1;
        });
    }

    updateDisplay() {
        this.updateCountersDisplay();
        this.updateThreatsListDisplay();
        this.updateHistoryDisplay();
        this.updateMapVisualization();
    }

    updateCountersDisplay() {
        const container = document.getElementById('threat-counters');
        if (!container) return;

        const total = this.attackCounters.total;
        const byType = this.attackCounters.byType;

        const html = `
            <div class="counter-grid">
                <div class="counter-card total">
                    <div class="counter-icon"><i class="fas fa-exclamation-triangle"></i></div>
                    <div class="counter-value">${total.toLocaleString()}</div>
                    <div class="counter-label">Menaces Totales</div>
                    <div class="counter-period">${this.timeRange}</div>
                </div>
                ${Object.keys(this.threatTypes).map(type => {
                    const count = byType[type] || 0;
                    const info = this.threatTypes[type];
                    return `
                        <div class="counter-card" style="border-color: ${info.color}">
                            <div class="counter-icon" style="color: ${info.color}">
                                <i class="fas ${info.icon}"></i>
                            </div>
                            <div class="counter-value">${count}</div>
                            <div class="counter-label">${info.name}</div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;

        container.innerHTML = html;
    }

    updateThreatsListDisplay() {
        const container = document.getElementById('threats-list');
        if (!container) return;

        // Filtrer les menaces
        const filteredThreats = this.activeThreats.filter(t =>
            this.activeFilters.includes(t.type)
        ).slice(0, 50); // Limiter à 50 pour performance

        if (filteredThreats.length === 0) {
            container.innerHTML = '<p class="no-threats">Aucune menace détectée</p>';
            return;
        }

        const html = `
            <div class="threats-list-container">
                ${filteredThreats.map(threat => this.renderThreat(threat)).join('')}
            </div>
        `;

        container.innerHTML = html;
    }

    renderThreat(threat) {
        const typeInfo = this.threatTypes[threat.type];
        const severityColors = {
            low: '#00ff41',
            medium: '#ffd700',
            high: '#ff8c00',
            critical: '#ff0040'
        };

        return `
            <div class="threat-item severity-${threat.severity}">
                <div class="threat-icon" style="color: ${typeInfo.color}">
                    <i class="fas ${typeInfo.icon}"></i>
                </div>
                <div class="threat-details">
                    <div class="threat-header">
                        <span class="threat-type">${typeInfo.name}</span>
                        <span class="threat-severity" style="background: ${severityColors[threat.severity]}">
                            ${threat.severity.toUpperCase()}
                        </span>
                        ${threat.blocked ? '<span class="threat-blocked">BLOQUÉ</span>' : '<span class="threat-active">ACTIF</span>'}
                    </div>
                    <div class="threat-route">
                        <span class="country-flag">${this.getCountryFlag(threat.sourceCountry)}</span>
                        <span class="country-code">${threat.sourceCountry}</span>
                        <i class="fas fa-arrow-right"></i>
                        <span class="country-flag">${this.getCountryFlag(threat.targetCountry)}</span>
                        <span class="country-code">${threat.targetCountry}</span>
                    </div>
                    <div class="threat-info">
                        <span><i class="fas fa-bullseye"></i> ${threat.target}</span>
                        <span><i class="fas fa-server"></i> ${threat.affectedSystems}+ systèmes</span>
                        <span><i class="fas fa-clock"></i> ${this.timeAgo(threat.timestamp)}</span>
                    </div>
                    <div class="threat-ips">
                        <small>Source: ${threat.sourceIP} → Cible: ${threat.targetIP}</small>
                    </div>
                </div>
            </div>
        `;
    }

    updateHistoryDisplay() {
        const container = document.getElementById('threat-history-chart');
        if (!container) return;

        // Préparer les données pour le graphique
        const threats = this.threatHistory[this.timeRange];

        // Grouper par heure/jour selon la période
        const grouped = this.groupThreatsByTime(threats);

        // Créer le graphique avec Chart.js si disponible
        if (window.Chart) {
            this.renderHistoryChart(container, grouped);
        } else {
            // Fallback: affichage simple
            container.innerHTML = `
                <div class="history-summary">
                    <h4>Résumé ${this.timeRange}</h4>
                    <p>Total: ${threats.length} menaces</p>
                </div>
            `;
        }
    }

    groupThreatsByTime(threats) {
        const groups = {};
        const format = this.timeRange === '24h' ? 'hour' : 'day';

        threats.forEach(threat => {
            const date = new Date(threat.timestamp);
            let key;

            if (format === 'hour') {
                key = `${date.getHours()}h`;
            } else {
                key = date.toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' });
            }

            if (!groups[key]) {
                groups[key] = { total: 0, byType: {} };
            }

            groups[key].total++;
            groups[key].byType[threat.type] = (groups[key].byType[threat.type] || 0) + 1;
        });

        return groups;
    }

    renderHistoryChart(container, data) {
        const canvas = document.createElement('canvas');
        canvas.id = 'threat-history-canvas';
        container.innerHTML = '';
        container.appendChild(canvas);

        const labels = Object.keys(data);
        const values = Object.values(data).map(d => d.total);

        new Chart(canvas.getContext('2d'), {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Menaces',
                    data: values,
                    borderColor: '#ff0040',
                    backgroundColor: 'rgba(255, 0, 64, 0.1)',
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
                        labels: { color: '#fff', font: { family: 'Orbitron' } }
                    },
                    title: {
                        display: true,
                        text: `Historique des Menaces - ${this.timeRange}`,
                        color: '#00ff41',
                        font: { size: 16, family: 'Orbitron' }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { color: '#fff' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    },
                    x: {
                        ticks: { color: '#fff' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    }
                }
            }
        });
    }

    updateMapVisualization() {
        // Animation de la carte (optionnel, peut être implémenté avec Canvas/WebGL)
        const mapCanvas = document.getElementById('threat-map-canvas');
        if (!mapCanvas) return;

        // Pour l'instant, simple mise à jour du compteur
        const activeCount = this.activeThreats.filter(t => !t.blocked).length;
        const mapOverlay = document.getElementById('map-overlay-count');
        if (mapOverlay) {
            mapOverlay.textContent = `${activeCount} menaces actives`;
        }
    }

    updateAlertsDisplay() {
        const container = document.getElementById('critical-alerts-container');
        if (!container) return;

        const activeAlerts = this.criticalAlerts.filter(a => !a.dismissed);

        if (activeAlerts.length === 0) {
            container.innerHTML = '<p class="no-alerts">Aucune alerte critique</p>';
            container.style.display = 'none';
            return;
        }

        container.style.display = 'block';

        const html = `
            <div class="alerts-list">
                ${activeAlerts.map(alert => `
                    <div class="critical-alert">
                        <div class="alert-icon">
                            <i class="fas fa-exclamation-triangle"></i>
                        </div>
                        <div class="alert-content">
                            <div class="alert-header">
                                <span class="alert-level">${alert.level}</span>
                                <span class="alert-type">${alert.type}</span>
                                <span class="alert-time">${this.timeAgo(alert.timestamp)}</span>
                            </div>
                            <div class="alert-message">${alert.message}</div>
                            <div class="alert-details">
                                <span>${this.getCountryFlag(alert.source)} ${alert.source}</span>
                                <i class="fas fa-arrow-right"></i>
                                <span>${this.getCountryFlag(alert.target)} ${alert.target}</span>
                                <span>• ${alert.targetSystem}</span>
                                <span>• ${alert.affectedSystems}+ systèmes affectés</span>
                            </div>
                        </div>
                        <button class="dismiss-alert-btn" onclick="window.threatMapEnhanced.dismissAlert('${alert.id}')">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `).join('')}
            </div>
        `;

        container.innerHTML = html;
    }

    dismissAlert(alertId) {
        const alert = this.criticalAlerts.find(a => a.id === alertId);
        if (alert) {
            alert.dismissed = true;
            this.updateAlertsDisplay();
        }
    }

    getCountryFlag(countryCode) {
        const flags = {
            'US': '🇺🇸', 'CN': '🇨🇳', 'RU': '🇷🇺', 'KR': '🇰🇷', 'BR': '🇧🇷',
            'IN': '🇮🇳', 'DE': '🇩🇪', 'GB': '🇬🇧', 'FR': '🇫🇷', 'JP': '🇯🇵'
        };
        return flags[countryCode] || '🌐';
    }

    timeAgo(timestamp) {
        const seconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);

        if (seconds < 60) return 'À l\'instant';
        if (seconds < 3600) return `Il y a ${Math.floor(seconds / 60)} min`;
        if (seconds < 86400) return `Il y a ${Math.floor(seconds / 3600)} h`;
        return `Il y a ${Math.floor(seconds / 86400)} j`;
    }

    startAutoRefresh() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
        }

        this.refreshInterval = setInterval(() => {
            if (this.autoRefresh) {
                this.generateThreats();
                this.updateDisplay();
            }
        }, 5000); // Refresh toutes les 5 secondes
    }

    stopAutoRefresh() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
            this.refreshInterval = null;
        }
    }

    loadThreatHistory() {
        const saved = localStorage.getItem('cyberguard_threat_history');
        if (saved) {
            this.threatHistory = JSON.parse(saved);
        }
    }

    saveThreatHistory() {
        // Ne sauvegarder qu'un échantillon pour éviter de surcharger localStorage
        const toSave = {
            '24h': this.threatHistory['24h'].slice(0, 100),
            '7d': this.threatHistory['7d'].slice(0, 500),
            '30d': this.threatHistory['30d'].slice(0, 1000)
        };

        localStorage.setItem('cyberguard_threat_history', JSON.stringify(toSave));
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('threat-map-enhanced-section')) {
        window.threatMapEnhanced = new ThreatMapEnhanced();
    }
});

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThreatMapEnhanced;
}
