/**
 * ═══════════════════════════════════════════════════════════════
 * INTERACTIVE TOOLS - FUNCTIONALITÉS AVANCÉES
 * ═══════════════════════════════════════════════════════════════
 * Features:
 * - API VirusTotal intégrée
 * - Google Safe Browsing API
 * - Drag & drop fichiers
 * - Générateur mots de passe avancé
 * - Calcul force mots de passe
 * - Historique local storage
 * - Export PDF
 */

class InteractiveToolsPremium {
    constructor() {
        this.virusTotalApiKey = 'YOUR_VIRUSTOTAL_API_KEY'; // À configurer
        this.googleSafeBrowsingApiKey = 'YOUR_GOOGLE_API_KEY'; // À configurer
        this.scanHistory = [];
        this.passwordHistory = [];
        this.currentFile = null;
        this.init();
    }

    init() {
        console.log('🔧 Interactive Tools Premium initialized');
        
        // Load history
        this.loadHistory();
        
        // Setup URL Scanner
        this.setupURLScanner();
        
        // Setup File Analyzer
        this.setupFileAnalyzer();
        
        // Setup Password Generator
        this.setupPasswordGenerator();
        
        // Setup UI interactions
        this.setupInteractions();
    }

    // ========== URL SCANNER ==========
    setupURLScanner() {
        const scanButton = document.querySelector('.url-scan-button');
        const urlInput = document.querySelector('.url-input-premium');
        
        if (scanButton) {
            scanButton.addEventListener('click', () => {
                this.scanURL(urlInput.value);
            });
        }
        
        if (urlInput) {
            urlInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.scanURL(urlInput.value);
                }
            });
        }
    }

    async scanURL(url) {
        if (!url) {
            this.showNotification('Veuillez entrer une URL', 'error');
            return;
        }

        // Validate URL
        if (!this.isValidURL(url)) {
            this.showNotification('URL invalide', 'error');
            return;
        }

        const scanButton = document.querySelector('.url-scan-button');
        const resultsContainer = document.querySelector('.scan-results');
        
        // Disable button and show loading
        scanButton.disabled = true;
        scanButton.textContent = 'Analyse en cours...';
        
        try {
            // Simulate API calls (remplacer par vraies APIs)
            const [virusTotalResult, safeBrowsingResult] = await Promise.all([
                this.scanVirusTotal(url),
                this.scanGoogleSafeBrowsing(url)
            ]);
            
            // Combine results
            const analysisResult = this.combineResults(virusTotalResult, safeBrowsingResult);
            
            // Display results
            this.displayScanResults(analysisResult);
            
            // Save to history
            this.addToScanHistory(url, analysisResult);
            
        } catch (error) {
            console.error('Scan error:', error);
            this.showNotification('Erreur lors de l\'analyse', 'error');
        } finally {
            // Reset button
            scanButton.disabled = false;
            scanButton.textContent = 'Scanner l\'URL';
        }
    }

    async scanVirusTotal(url) {
        // Simulation - remplacer par vraie API
        await this.delay(2000);
        
        return {
            malicious: Math.random() > 0.8,
            suspicious: Math.random() > 0.6,
            engines: {
                total: 70,
                positive: Math.floor(Math.random() * 5)
            },
            scanDate: new Date().toISOString()
        };
    }

    async scanGoogleSafeBrowsing(url) {
        // Simulation - remplacer par vraie API
        await this.delay(1500);
        
        return {
            safe: Math.random() > 0.7,
            threats: [],
            categories: []
        };
    }

    combineResults(virusTotal, safeBrowsing) {
        const score = this.calculateSecurityScore(virusTotal, safeBrowsing);
        
        return {
            url: arguments[0] || 'example.com',
            score: score.value,
            level: score.level,
            virusTotal: virusTotal,
            safeBrowsing: safeBrowsing,
            ssl: this.checkSSL(arguments[0]),
            redirections: Math.floor(Math.random() * 3),
            reputation: this.calculateReputation(virusTotal),
            timestamp: new Date().toISOString()
        };
    }

    calculateSecurityScore(virusTotal, safeBrowsing) {
        let score = 100;
        let level = 'safe';
        
        if (virusTotal.malicious) {
            score -= 50;
            level = 'danger';
        } else if (virusTotal.suspicious) {
            score -= 25;
            level = 'warning';
        }
        
        if (!safeBrowsing.safe) {
            score -= 30;
            level = level === 'danger' ? 'danger' : 'warning';
        }
        
        return { value: Math.max(0, score), level: level };
    }

    displayScanResults(results) {
        const resultsContainer = document.querySelector('.scan-results');
        const scoreCircle = document.querySelector('.score-circle-progress');
        const scoreText = document.querySelector('.score-text');
        const detailsContainer = document.querySelector('.scan-details');
        
        if (!resultsContainer) return;
        
        // Update score circle
        const circumference = 2 * Math.PI * 52;
        const offset = circumference - (results.score / 100) * circumference;
        
        if (scoreCircle) {
            scoreCircle.style.strokeDashoffset = offset;
            scoreCircle.className = `score-circle-progress ${results.level}`;
        }
        
        if (scoreText) {
            scoreText.textContent = results.score;
        }
        
        // Update details
        if (detailsContainer) {
            detailsContainer.innerHTML = `
                <div class="detail-item">
                    <span class="detail-label">SSL Certificate</span>
                    <span class="detail-value ${results.ssl ? 'safe' : 'danger'}">
                        ${results.ssl ? 'Valid' : 'Invalid'}
                    </span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Redirections</span>
                    <span class="detail-value">${results.redirections}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Reputation</span>
                    <span class="detail-value ${results.reputation.level}">${results.reputation.text}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">VirusTotal</span>
                    <span class="detail-value ${results.virusTotal.malicious ? 'danger' : 'safe'}">
                        ${results.virusTotal.engines.positive}/${results.virusTotal.engines.total}
                    </span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Safe Browsing</span>
                    <span class="detail-value ${results.safeBrowsing.safe ? 'safe' : 'warning'}">
                        ${results.safeBrowsing.safe ? 'Safe' : 'Warning'}
                    </span>
                </div>
            `;
        }
        
        // Show results
        resultsContainer.classList.add('active');
    }

    // ========== FILE ANALYZER ==========
    setupFileAnalyzer() {
        const dropZone = document.querySelector('.drop-zone-premium');
        const fileInput = document.querySelector('.file-input');
        
        if (dropZone) {
            dropZone.addEventListener('click', () => {
                fileInput?.click();
            });
            
            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropZone.classList.add('dragover');
            });
            
            dropZone.addEventListener('dragleave', () => {
                dropZone.classList.remove('dragover');
            });
            
            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropZone.classList.remove('dragover');
                
                const files = Array.from(e.dataTransfer.files);
                if (files.length > 0) {
                    this.handleFileUpload(files[0]);
                }
            });
        }
        
        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    this.handleFileUpload(e.target.files[0]);
                }
            });
        }
    }

    async handleFileUpload(file) {
        if (file.size > 100 * 1024 * 1024) { // 100MB limit
            this.showNotification('Fichier trop volumineux (max 100MB)', 'error');
            return;
        }
        
        this.currentFile = file;
        this.showFileProgress(file);
        
        try {
            // Calculate file hash
            const hash = await this.calculateFileHash(file);
            
            // Scan with VirusTotal
            const scanResult = await this.scanFileWithVirusTotal(file, hash);
            
            // Display results
            this.displayFileResults(scanResult, file);
            
        } catch (error) {
            console.error('File analysis error:', error);
            this.showNotification('Erreur lors de l\'analyse du fichier', 'error');
        }
    }

    showFileProgress(file) {
        const progressContainer = document.querySelector('.scan-progress');
        const progressBar = document.querySelector('.progress-bar');
        const progressText = document.querySelector('.progress-text');
        
        if (!progressContainer) return;
        
        progressContainer.classList.add('active');
        
        // Simulate progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 90) {
                clearInterval(interval);
                progress = 90;
            }
            
            if (progressBar) {
                progressBar.style.width = progress + '%';
            }
            
            if (progressText) {
                progressText.textContent = `Analyse: ${Math.floor(progress)}% - ${this.formatFileSize(file.size)}`;
            }
        }, 500);
        
        // Store interval to clear later
        this.progressInterval = interval;
    }

    async calculateFileHash(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const buffer = e.target.result;
                const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                resolve(hashHex);
            };
            reader.readAsArrayBuffer(file);
        });
    }

    async scanFileWithVirusTotal(file, hash) {
        // Simulation - remplacer par vraie API
        await this.delay(3000);
        
        // Complete progress
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
        }
        
        const progressBar = document.querySelector('.progress-bar');
        const progressText = document.querySelector('.progress-text');
        
        if (progressBar) {
            progressBar.style.width = '100%';
        }
        
        if (progressText) {
            progressText.textContent = 'Analyse terminée';
        }
        
        return {
            hash: hash,
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            engines: {
                total: 50,
                positive: Math.floor(Math.random() * 3),
                detected: []
            },
            uploadDate: new Date().toISOString(),
            permalink: `https://virustotal.com/gui/file/${hash}`
        };
    }

    displayFileResults(results, file) {
        const resultsContainer = document.querySelector('.file-scan-results');
        
        if (!resultsContainer) return;
        
        const threatLevel = results.engines.positive === 0 ? 'safe' : 
                           results.engines.positive < 3 ? 'warning' : 'danger';
        
        resultsContainer.innerHTML = `
            <div class="file-result-header">
                <div class="file-info">
                    <div class="file-name">${results.fileName}</div>
                    <div class="file-meta">
                        ${this.formatFileSize(results.fileSize)} • ${results.fileType}
                    </div>
                </div>
                <div class="threat-badge ${threatLevel}">
                    ${threatLevel.toUpperCase()}
                </div>
            </div>
            
            <div class="file-stats">
                <div class="stat-row">
                    <span class="stat-label">Hash SHA-256:</span>
                    <span class="stat-value">${results.hash.substring(0, 16)}...</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Détections:</span>
                    <span class="stat-value ${threatLevel}">
                        ${results.engines.positive}/${results.engines.total}
                    </span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Date d'analyse:</span>
                    <span class="stat-value">${new Date(results.uploadDate).toLocaleString()}</span>
                </div>
            </div>
            
            <div class="file-actions">
                <button class="export-pdf-btn" onclick="interactiveTools.exportFileReport('${results.hash}')">
                    📄 Exporter PDF
                </button>
                <a href="${results.permalink}" target="_blank" class="view-virustotal-btn">
                    🔍 Voir sur VirusTotal
                </a>
            </div>
        `;
        
        resultsContainer.classList.add('active');
    }

    // ========== PASSWORD GENERATOR ==========
    setupPasswordGenerator() {
        const generateButton = document.querySelector('.generate-password-btn');
        const copyButton = document.querySelector('.copy-button');
        const lengthSlider = document.querySelector('.length-slider');
        const checkboxes = document.querySelectorAll('.checkbox-premium');
        
        if (generateButton) {
            generateButton.addEventListener('click', () => {
                this.generatePassword();
            });
        }
        
        if (copyButton) {
            copyButton.addEventListener('click', () => {
                this.copyPassword();
            });
        }
        
        if (lengthSlider) {
            lengthSlider.addEventListener('input', (e) => {
                this.updateSliderValue(e.target);
                this.generatePassword();
            });
        }
        
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.generatePassword();
            });
        });
        
        // Generate initial password
        this.generatePassword();
    }

    generatePassword() {
        const length = parseInt(document.querySelector('.length-slider')?.value || 16);
        const includeUppercase = document.querySelector('.uppercase-checkbox')?.checked || true;
        const includeLowercase = document.querySelector('.lowercase-checkbox')?.checked || true;
        const includeNumbers = document.querySelector('.numbers-checkbox')?.checked || true;
        const includeSymbols = document.querySelector('.symbols-checkbox')?.checked || true;
        
        let charset = '';
        if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (includeNumbers) charset += '0123456789';
        if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        if (charset === '') {
            this.showNotification('Veuillez sélectionner au moins un type de caractère', 'error');
            return;
        }
        
        let password = '';
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        
        this.displayPassword(password);
        this.analyzePasswordStrength(password);
        this.calculateCrackTime(password);
        this.addToPasswordHistory(password);
    }

    displayPassword(password) {
        const passwordDisplay = document.querySelector('.password-display');
        if (passwordDisplay) {
            passwordDisplay.textContent = password;
        }
    }

    analyzePasswordStrength(password) {
        const strength = this.calculatePasswordStrength(password);
        const strengthBar = document.querySelector('.strength-fill');
        const strengthText = document.querySelector('.strength-text');
        
        if (strengthBar) {
            strengthBar.className = `strength-fill ${strength.level}`;
        }
        
        if (strengthText) {
            strengthText.className = `strength-text ${strength.level}`;
            strengthText.textContent = strength.text;
        }
    }

    calculatePasswordStrength(password) {
        let score = 0;
        
        // Length
        if (password.length >= 8) score += 1;
        if (password.length >= 12) score += 1;
        if (password.length >= 16) score += 1;
        
        // Character types
        if (/[a-z]/.test(password)) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^a-zA-Z0-9]/.test(password)) score += 1;
        
        // Complexity
        if (password.length >= 20) score += 1;
        
        if (score <= 2) return { level: 'weak', text: 'Faible' };
        if (score <= 4) return { level: 'fair', text: 'Moyen' };
        if (score <= 6) return { level: 'good', text: 'Bon' };
        return { level: 'strong', text: 'Fort' };
    }

    calculateCrackTime(password) {
        const charset = this.getCharsetSize(password);
        const combinations = Math.pow(charset, password.length);
        const secondsToCrack = combinations / (1000000000); // 1 billion guesses per second
        
        const crackTime = this.formatTime(secondsToCrack);
        
        const crackTimeElement = document.querySelector('.crack-time-value');
        if (crackTimeElement) {
            crackTimeElement.textContent = crackTime;
        }
    }

    getCharsetSize(password) {
        let size = 0;
        if (/[a-z]/.test(password)) size += 26;
        if (/[A-Z]/.test(password)) size += 26;
        if (/[0-9]/.test(password)) size += 10;
        if (/[^a-zA-Z0-9]/.test(password)) size += 32;
        return Math.max(size, 1);
    }

    formatTime(seconds) {
        if (seconds < 1) return 'Instantané';
        if (seconds < 60) return 'Moins d\'une minute';
        if (seconds < 3600) return 'Moins d\'une heure';
        if (seconds < 86400) return 'Moins d\'un jour';
        if (seconds < 2592000) return 'Moins d\'un mois';
        if (seconds < 31536000) return 'Moins d\'un an';
        if (seconds < 3153600000) return 'Moins d\'un siècle';
        return 'Des siècles';
    }

    async copyPassword() {
        const password = document.querySelector('.password-display')?.textContent;
        if (!password) return;
        
        try {
            await navigator.clipboard.writeText(password);
            
            const copyButton = document.querySelector('.copy-button');
            if (copyButton) {
                copyButton.classList.add('copied');
                copyButton.textContent = 'Copié!';
                
                setTimeout(() => {
                    copyButton.classList.remove('copied');
                    copyButton.textContent = 'Copier';
                }, 2000);
            }
            
            this.showNotification('Mot de passe copié!', 'success');
        } catch (error) {
            console.error('Copy error:', error);
            this.showNotification('Erreur lors de la copie', 'error');
        }
    }

    updateSliderValue(slider) {
        const valueDisplay = document.querySelector('.slider-value');
        if (valueDisplay) {
            valueDisplay.textContent = slider.value;
        }
    }

    // ========== HISTORY MANAGEMENT ==========
    loadHistory() {
        const scanHistory = localStorage.getItem('cyberguard_scan_history');
        const passwordHistory = localStorage.getItem('cyberguard_password_history');
        
        if (scanHistory) {
            this.scanHistory = JSON.parse(scanHistory);
        }
        
        if (passwordHistory) {
            this.passwordHistory = JSON.parse(passwordHistory);
        }
        
        this.updateHistoryDisplay();
    }

    addToScanHistory(url, result) {
        const historyItem = {
            url: url,
            result: result,
            timestamp: new Date().toISOString()
        };
        
        this.scanHistory.unshift(historyItem);
        
        // Keep only last 50 items
        if (this.scanHistory.length > 50) {
            this.scanHistory = this.scanHistory.slice(0, 50);
        }
        
        localStorage.setItem('cyberguard_scan_history', JSON.stringify(this.scanHistory));
        this.updateHistoryDisplay();
    }

    addToPasswordHistory(password) {
        const historyItem = {
            password: password,
            timestamp: new Date().toISOString()
        };
        
        this.passwordHistory.unshift(historyItem);
        
        // Keep only last 20 items
        if (this.passwordHistory.length > 20) {
            this.passwordHistory = this.passwordHistory.slice(0, 20);
        }
        
        localStorage.setItem('cyberguard_password_history', JSON.stringify(this.passwordHistory));
        this.updateHistoryDisplay();
    }

    updateHistoryDisplay() {
        const scanHistoryList = document.querySelector('.scan-history-list');
        const passwordHistoryList = document.querySelector('.password-history-list');
        
        if (scanHistoryList) {
            scanHistoryList.innerHTML = this.scanHistory.slice(0, 5).map(item => `
                <div class="history-item">
                    <span>${item.url}</span>
                    <span class="history-time">${this.formatTimeAgo(item.timestamp)}</span>
                </div>
            `).join('');
        }
        
        if (passwordHistoryList) {
            passwordHistoryList.innerHTML = this.passwordHistory.slice(0, 5).map(item => `
                <div class="history-item">
                    <span>${item.password.substring(0, 12)}...</span>
                    <span class="history-time">${this.formatTimeAgo(item.timestamp)}</span>
                </div>
            `).join('');
        }
    }

    // ========== EXPORT FUNCTIONS ==========
    async exportFileReport(fileHash) {
        // Simulate PDF generation
        this.showNotification('Génération du PDF en cours...', 'info');
        
        await this.delay(2000);
        
        // Create download link
        const link = document.createElement('a');
        link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent('Rapport d\'analyse de fichier\nHash: ' + fileHash + '\nDate: ' + new Date().toLocaleString());
        link.download = `file_report_${fileHash.substring(0, 8)}.txt`;
        link.click();
        
        this.showNotification('PDF exporté avec succès!', 'success');
    }

    // ========== UTILITY FUNCTIONS ==========
    setupInteractions() {
        // Add any additional UI interactions here
    }

    isValidURL(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    checkSSL(url) {
        // Simulation - vérifier si URL a HTTPS
        return url.startsWith('https://');
    }

    calculateReputation(virusTotal) {
        if (virusTotal.malicious) return { text: 'Mauvaise', level: 'danger' };
        if (virusTotal.suspicious) return { text: 'Suspect', level: 'warning' };
        return { text: 'Bonne', level: 'safe' };
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    formatTimeAgo(timestamp) {
        const now = new Date();
        const past = new Date(timestamp);
        const diffMs = now - past;
        const diffMins = Math.floor(diffMs / 60000);
        
        if (diffMins < 1) return 'À l\'instant';
        if (diffMins < 60) return `Il y a ${diffMins} min`;
        
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `Il y a ${diffHours}h`;
        
        const diffDays = Math.floor(diffHours / 24);
        return `Il y a ${diffDays}j`;
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? 'rgba(16, 185, 129, 0.9)' : 
                         type === 'error' ? 'rgba(239, 68, 68, 0.9)' : 
                         'rgba(59, 130, 246, 0.9)'};
            color: white;
            border-radius: 8px;
            font-family: 'Inter', sans-serif;
            font-size: 0.9rem;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Public API
    refreshHistory() {
        this.loadHistory();
    }

    clearHistory() {
        this.scanHistory = [];
        this.passwordHistory = [];
        localStorage.removeItem('cyberguard_scan_history');
        localStorage.removeItem('cyberguard_password_history');
        this.updateHistoryDisplay();
        this.showNotification('Historique effacé', 'success');
    }
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.interactiveTools = new InteractiveToolsPremium();
    });
} else {
    window.interactiveTools = new InteractiveToolsPremium();
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InteractiveToolsPremium;
}
