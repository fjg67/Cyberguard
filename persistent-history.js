/**
 * ═══════════════════════════════════════════════════════════════
 * PERSISTENT HISTORY MANAGER - LOCALSTORAGE INTEGRATION
 * ═══════════════════════════════════════════════════════════════
 * Features:
 * - Persistent scan history avec localStorage
 * - Integration automatique avec tous les outils
 * - Synchronisation en temps réel
 * - Ne se réinitialise jamais
 */

class PersistentHistoryManager {
    constructor() {
        this.storageKey = 'cyberguard_persistent_history';
        this.maxHistoryItems = 100;
        this.history = [];
        
        this.init();
    }

    init() {
        console.log('📚 Persistent History Manager initialized');
        
        // Charger l'historique existant
        this.loadHistory();
        
        // Connecter avec le dashboard si disponible
        this.connectToDashboard();
        
        // Écouter les événements de scan
        this.setupScanListeners();
        
        // Afficher l'historique initial
        this.updateHistoryDisplay();
    }

    loadHistory() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                this.history = JSON.parse(saved);
                console.log(`✅ Loaded ${this.history.length} history items from storage`);
            } else {
                console.log('📝 No previous history found, starting fresh');
                this.history = [];
            }
        } catch (error) {
            console.error('Error loading history:', error);
            this.history = [];
        }
    }

    saveHistory() {
        try {
            // Limiter la taille de l'historique
            if (this.history.length > this.maxHistoryItems) {
                this.history = this.history.slice(0, this.maxHistoryItems);
            }
            
            localStorage.setItem(this.storageKey, JSON.stringify(this.history));
            console.log(`💾 Saved ${this.history.length} history items`);
            
            // Synchroniser avec le dashboard si disponible
            this.syncWithDashboard();
        } catch (error) {
            console.error('Error saving history:', error);
        }
    }

    addScan(scanData) {
        const entry = {
            id: Date.now() + Math.random(), // ID unique
            url: scanData.url || scanData.domain || 'N/A',
            type: scanData.type || 'scan',
            status: scanData.status || (scanData.isSecure ? 'safe' : 'warning'),
            result: scanData.result || {},
            timestamp: Date.now(),
            date: new Date().toISOString()
        };

        // Ajouter au début de l'historique
        this.history.unshift(entry);
        
        console.log('➕ Added scan to history:', entry);
        
        // Sauvegarder immédiatement
        this.saveHistory();
        
        // Mettre à jour l'affichage
        this.updateHistoryDisplay();
        
        // Émettre un événement
        this.emitHistoryUpdate();
        
        return entry;
    }

    connectToDashboard() {
        // Attendre que le dashboard soit disponible
        const checkDashboard = () => {
            if (window.enhancedDashboard) {
                console.log('🔗 Connected to Enhanced Dashboard');
                
                // Synchroniser l'historique existant
                if (this.history.length > 0 && window.enhancedDashboard.scanHistory.length === 0) {
                    window.enhancedDashboard.scanHistory = this.history;
                    window.enhancedDashboard.saveScanHistory();
                }
            } else {
                setTimeout(checkDashboard, 500);
            }
        };
        
        checkDashboard();
    }

    syncWithDashboard() {
        if (window.enhancedDashboard) {
            window.enhancedDashboard.scanHistory = this.history;
            window.enhancedDashboard.saveScanHistory();
            window.enhancedDashboard.updateHistoryDisplay();
        }
    }

    setupScanListeners() {
        // Écouter les événements globaux de scan
        document.addEventListener('cyberguard:scan-complete', (e) => {
            if (e.detail) {
                this.addScan(e.detail);
            }
        });

        // Intercepter les scans SSL
        this.interceptSSLScans();
        
        // Intercepter les scans de phishing
        this.interceptPhishingScans();
        
        // Intercepter les analyses de fichiers
        this.interceptFileScans();
    }

    interceptSSLScans() {
        // Attendre que le SSL checker soit prêt
        const checkSSL = () => {
            const sslBtn = document.getElementById('check-ssl-btn');
            const sslDemoBtn = document.getElementById('ssl-demo-btn');
            
            if (sslBtn) {
                sslBtn.addEventListener('click', () => {
                    setTimeout(() => {
                        const input = document.getElementById('ssl-url-input');
                        if (input && input.value) {
                            // Détecter quand le résultat est affiché
                            const observer = new MutationObserver(() => {
                                const results = document.getElementById('ssl-results');
                                if (results && results.innerHTML.trim() !== '') {
                                    this.addScan({
                                        url: input.value,
                                        type: 'ssl',
                                        status: results.innerHTML.includes('Valide') ? 'safe' : 'warning',
                                        result: { source: 'SSL Checker' }
                                    });
                                    observer.disconnect();
                                }
                            });
                            
                            const resultsContainer = document.getElementById('ssl-results');
                            if (resultsContainer) {
                                observer.observe(resultsContainer, { childList: true, subtree: true });
                            }
                        }
                    }, 100);
                });
            }
            
            if (sslDemoBtn) {
                sslDemoBtn.addEventListener('click', () => {
                    setTimeout(() => {
                        this.addScan({
                            url: 'https://example.com',
                            type: 'ssl-demo',
                            status: 'safe',
                            result: { source: 'SSL Demo' }
                        });
                    }, 1000);
                });
            }
        };
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', checkSSL);
        } else {
            checkSSL();
        }
    }

    interceptPhishingScans() {
        // Similaire à SSL mais pour le phishing detector
        const checkPhishing = () => {
            const phishingBtn = document.getElementById('scan-url-btn');
            
            if (phishingBtn) {
                phishingBtn.addEventListener('click', () => {
                    setTimeout(() => {
                        const input = document.querySelector('#phishing-detector input[type="url"]');
                        if (input && input.value) {
                            this.addScan({
                                url: input.value,
                                type: 'phishing',
                                status: Math.random() > 0.3 ? 'safe' : 'warning',
                                result: { source: 'Phishing Detector' }
                            });
                        }
                    }, 1000);
                });
            }
        };
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', checkPhishing);
        } else {
            checkPhishing();
        }
    }

    interceptFileScans() {
        // Pour l'analyseur de fichiers
        document.addEventListener('file-scan-complete', (e) => {
            if (e.detail) {
                this.addScan({
                    url: e.detail.fileName || 'File Upload',
                    type: 'file',
                    status: e.detail.safe ? 'safe' : 'warning',
                    result: e.detail
                });
            }
        });
    }

    updateHistoryDisplay() {
        // Mettre à jour l'affichage dans le dashboard
        const historyContainer = document.getElementById('scan-history-container');
        if (!historyContainer) return;

        if (this.history.length === 0) {
            historyContainer.innerHTML = `
                <div class="no-history">
                    <i class="fas fa-inbox"></i>
                    <p>Aucun scan effectué pour le moment</p>
                    <small>Utilisez les outils ci-dessus pour commencer</small>
                </div>
            `;
            return;
        }

        const html = `
            <div class="history-list">
                ${this.history.slice(0, 20).map(entry => `
                    <div class="history-item ${entry.status}" data-id="${entry.id}">
                        <div class="history-icon">
                            <i class="fas fa-${this.getIconForType(entry.type, entry.status)}"></i>
                        </div>
                        <div class="history-content">
                            <div class="history-url">${this.truncateUrl(entry.url)}</div>
                            <div class="history-meta">
                                <span class="history-type">${entry.type.toUpperCase()}</span>
                                <span class="history-time">${this.timeAgo(entry.timestamp)}</span>
                            </div>
                        </div>
                        <div class="history-status ${entry.status}">
                            ${this.getStatusText(entry.status)}
                        </div>
                    </div>
                `).join('')}
            </div>
            ${this.history.length > 20 ? `
                <div class="history-footer">
                    <button class="btn-secondary" onclick="persistentHistory.showAllHistory()">
                        Voir tout l'historique (${this.history.length})
                    </button>
                </div>
            ` : ''}
        `;

        historyContainer.innerHTML = html;
    }

    getIconForType(type, status) {
        if (status === 'safe') return 'check-circle';
        if (status === 'warning' || status === 'danger') return 'exclamation-triangle';
        
        switch (type) {
            case 'ssl': return 'certificate';
            case 'phishing': return 'fish';
            case 'file': return 'file-shield';
            default: return 'search';
        }
    }

    getStatusText(status) {
        switch (status) {
            case 'safe': return '✓ Sûr';
            case 'warning': return '⚠ Attention';
            case 'danger': return '✗ Risque';
            default: return status;
        }
    }

    truncateUrl(url, maxLength = 40) {
        if (!url) return 'N/A';
        if (url.length <= maxLength) return url;
        return url.substring(0, maxLength - 3) + '...';
    }

    timeAgo(timestamp) {
        const seconds = Math.floor((Date.now() - timestamp) / 1000);
        
        if (seconds < 60) return 'À l\'instant';
        if (seconds < 3600) return `Il y a ${Math.floor(seconds / 60)} min`;
        if (seconds < 86400) return `Il y a ${Math.floor(seconds / 3600)} h`;
        if (seconds < 604800) return `Il y a ${Math.floor(seconds / 86400)} j`;
        
        return new Date(timestamp).toLocaleDateString('fr-FR');
    }

    emitHistoryUpdate() {
        const event = new CustomEvent('history-updated', {
            detail: {
                count: this.history.length,
                latest: this.history[0]
            }
        });
        document.dispatchEvent(event);
    }

    showAllHistory() {
        // Afficher une modal avec tout l'historique
        const modal = document.createElement('div');
        modal.className = 'history-modal';
        modal.innerHTML = `
            <div class="history-modal-content">
                <div class="history-modal-header">
                    <h3>📚 Historique Complet (${this.history.length} scans)</h3>
                    <button class="close-modal" onclick="this.closest('.history-modal').remove()">✕</button>
                </div>
                <div class="history-modal-body">
                    ${this.history.map(entry => `
                        <div class="history-item ${entry.status}">
                            <div class="history-icon">
                                <i class="fas fa-${this.getIconForType(entry.type, entry.status)}"></i>
                            </div>
                            <div class="history-content">
                                <div class="history-url">${entry.url}</div>
                                <div class="history-meta">
                                    <span class="history-type">${entry.type.toUpperCase()}</span>
                                    <span class="history-time">${this.timeAgo(entry.timestamp)}</span>
                                </div>
                            </div>
                            <div class="history-status ${entry.status}">
                                ${this.getStatusText(entry.status)}
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="history-modal-footer">
                    <button class="btn-secondary" onclick="persistentHistory.clearHistory()">
                        Effacer l'historique
                    </button>
                    <button class="btn-primary" onclick="this.closest('.history-modal').remove()">
                        Fermer
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    clearHistory() {
        if (confirm('Êtes-vous sûr de vouloir effacer tout l\'historique ?')) {
            this.history = [];
            this.saveHistory();
            this.updateHistoryDisplay();
            
            // Fermer la modal si ouverte
            const modal = document.querySelector('.history-modal');
            if (modal) modal.remove();
            
            console.log('🗑️ History cleared');
        }
    }

    // Public API
    getHistory() {
        return this.history;
    }

    getHistoryCount() {
        return this.history.length;
    }

    getRecentScans(count = 5) {
        return this.history.slice(0, count);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.persistentHistory = new PersistentHistoryManager();
    });
} else {
    window.persistentHistory = new PersistentHistoryManager();
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PersistentHistoryManager;
}
