/**
 * CyberGuard Pro - Analyseur de Fichiers Suspects
 * Upload et analyse de fichiers pour détecter malwares et menaces
 */

class FileAnalyzer {
    constructor() {
        this.maxFileSize = 50 * 1024 * 1024; // 50 MB
        this.allowedTypes = [
            // Documents
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'text/plain',
            'text/html',
            'text/csv',
            // Archives
            'application/zip',
            'application/x-rar-compressed',
            'application/x-7z-compressed',
            'application/x-tar',
            'application/gzip',
            // Exécutables
            'application/x-msdownload',
            'application/x-executable',
            'application/x-dosexec',
            // Scripts
            'application/javascript',
            'text/javascript',
            'application/x-python',
            'application/x-sh',
            // Images
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp'
        ];

        this.suspiciousPatterns = [
            /eval\s*\(/gi,
            /exec\s*\(/gi,
            /system\s*\(/gi,
            /shell_exec/gi,
            /base64_decode/gi,
            /<?php/gi,
            /<script/gi,
            /cmd\.exe/gi,
            /powershell/gi,
            /ransomware/gi,
            /cryptolocker/gi
        ];

        this.analysisHistory = [];
        this.currentAnalysis = null;

        this.init();
    }

    init() {
        this.loadHistory();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const dropZone = document.getElementById('file-drop-zone');
        const fileInput = document.getElementById('file-input');
        const browseBtn = document.getElementById('browse-files-btn');

        if (dropZone) {
            // Drag and drop
            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropZone.classList.add('drag-over');
            });

            dropZone.addEventListener('dragleave', () => {
                dropZone.classList.remove('drag-over');
            });

            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropZone.classList.remove('drag-over');

                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    this.handleFile(files[0]);
                }
            });

            dropZone.addEventListener('click', () => {
                fileInput?.click();
            });
        }

        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    this.handleFile(e.target.files[0]);
                }
            });
        }

        if (browseBtn) {
            browseBtn.addEventListener('click', () => {
                fileInput?.click();
            });
        }
    }

    async handleFile(file) {
        // Validation
        if (!this.validateFile(file)) {
            return;
        }

        // Afficher loader
        this.showLoader();

        // Lire le fichier
        try {
            const fileData = await this.readFile(file);

            // Analyser
            const analysis = await this.analyzeFile(file, fileData);

            // Afficher résultats
            this.displayResults(analysis);

            // Sauvegarder dans l'historique
            this.addToHistory(analysis);

        } catch (error) {
            console.error('Erreur d\'analyse:', error);
            this.showNotification('Erreur lors de l\'analyse du fichier', 'error');
            this.hideLoader();
        }
    }

    validateFile(file) {
        // Taille
        if (file.size > this.maxFileSize) {
            this.showNotification(
                `Fichier trop volumineux (max ${this.maxFileSize / 1024 / 1024} MB)`,
                'error'
            );
            return false;
        }

        // Type (optionnel - accepter tous pour analyse)
        // if (!this.allowedTypes.includes(file.type)) {
        //     this.showNotification('Type de fichier non supporté', 'error');
        //     return false;
        // }

        return true;
    }

    readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                resolve({
                    content: e.target.result,
                    arrayBuffer: e.target.result
                });
            };

            reader.onerror = () => {
                reject(new Error('Erreur de lecture du fichier'));
            };

            // Lire comme ArrayBuffer pour calcul de hash
            reader.readAsArrayBuffer(file);
        });
    }

    async analyzeFile(file, fileData) {
        // Simulation temps d'analyse
        await this.delay(2000);

        const analysis = {
            id: Date.now(),
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type || 'unknown',
            uploadDate: new Date().toISOString(),
            hash: {
                md5: this.calculateSimpleHash(fileData.arrayBuffer, 'md5'),
                sha256: this.calculateSimpleHash(fileData.arrayBuffer, 'sha256')
            },
            results: {}
        };

        // 1. Scan antivirus (simulation)
        analysis.results.antivirusCheck = this.performAntivirusScan(file);

        // 2. Détection de macros
        analysis.results.macroDetection = this.detectMacros(file);

        // 3. Analyse de contenu (patterns suspects)
        if (file.type.startsWith('text/') || file.name.endsWith('.js') || file.name.endsWith('.php')) {
            const textContent = await this.getTextContent(file);
            analysis.results.contentAnalysis = this.analyzeContent(textContent);
        }

        // 4. Analyse de métadonnées
        analysis.results.metadata = this.extractMetadata(file);

        // 5. Vérification de signature
        analysis.results.signatureCheck = this.checkSignature(file);

        // 6. Score de menace global
        analysis.threatScore = this.calculateThreatScore(analysis.results);
        analysis.threatLevel = this.getThreatLevel(analysis.threatScore);
        analysis.isSafe = analysis.threatScore < 30;

        // 7. Recommandations
        analysis.recommendations = this.generateRecommendations(analysis);

        this.currentAnalysis = analysis;
        return analysis;
    }

    performAntivirusScan(file) {
        // Simulation de scan antivirus
        const fileName = file.name.toLowerCase();
        const dangerousExtensions = ['.exe', '.bat', '.cmd', '.scr', '.vbs', '.js', '.jar'];

        let threatsFound = [];
        let suspiciousFlags = 0;

        // Check extension
        if (dangerousExtensions.some(ext => fileName.endsWith(ext))) {
            threatsFound.push('Extension potentiellement dangereuse');
            suspiciousFlags += 3;
        }

        // Check nom de fichier suspect
        const suspiciousNames = ['crack', 'keygen', 'patch', 'loader', 'ransomware', 'trojan'];
        if (suspiciousNames.some(name => fileName.includes(name))) {
            threatsFound.push('Nom de fichier suspect');
            suspiciousFlags += 2;
        }

        // Simulation probabiliste
        if (Math.random() < 0.15) { // 15% de chance de détecter quelque chose
            threatsFound.push('Comportement heuristique suspect détecté');
            suspiciousFlags += 2;
        }

        return {
            clean: threatsFound.length === 0,
            threatsFound: threatsFound,
            suspiciousFlags: suspiciousFlags,
            scanDate: new Date().toISOString(),
            engine: 'CyberGuard AV Engine v2.5'
        };
    }

    detectMacros(file) {
        const fileName = file.name.toLowerCase();
        const macroExtensions = ['.docm', '.xlsm', '.pptm'];

        const hasMacros = macroExtensions.some(ext => fileName.endsWith(ext));

        return {
            detected: hasMacros,
            type: hasMacros ? 'Office Macro' : 'None',
            risk: hasMacros ? 'medium' : 'low',
            recommendation: hasMacros ? 'Les macros peuvent contenir du code malveillant. N\'activez que si la source est fiable.' : 'Aucune macro détectée'
        };
    }

    async getTextContent(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                resolve(e.target.result);
            };

            reader.onerror = () => {
                resolve('');
            };

            reader.readAsText(file);
        });
    }

    analyzeContent(content) {
        const findings = [];
        let riskScore = 0;

        // Chercher patterns suspects
        this.suspiciousPatterns.forEach(pattern => {
            const matches = content.match(pattern);
            if (matches) {
                findings.push({
                    pattern: pattern.source,
                    occurrences: matches.length,
                    risk: 'high'
                });
                riskScore += matches.length * 5;
            }
        });

        // Check pour code obfusqué
        if (this.isObfuscated(content)) {
            findings.push({
                pattern: 'Code obfusqué détecté',
                risk: 'high'
            });
            riskScore += 10;
        }

        return {
            suspiciousPatterns: findings.length,
            findings: findings,
            riskScore: Math.min(riskScore, 50),
            isClean: findings.length === 0
        };
    }

    isObfuscated(content) {
        // Détection simple d'obfuscation
        const indicators = [
            content.length > 1000 && (content.match(/[^a-zA-Z0-9\s]/g) || []).length > content.length * 0.3,
            /\\x[0-9a-f]{2}/gi.test(content),
            /\\u[0-9a-f]{4}/gi.test(content),
            content.split('\n').some(line => line.length > 500)
        ];

        return indicators.filter(Boolean).length >= 2;
    }

    extractMetadata(file) {
        return {
            name: file.name,
            size: this.formatFileSize(file.size),
            type: file.type || 'Unknown',
            lastModified: new Date(file.lastModified).toLocaleString('fr-FR'),
            extension: file.name.split('.').pop()
        };
    }

    checkSignature(file) {
        // Vérification de signature numérique (simulation)
        const fileName = file.name.toLowerCase();
        const signedExtensions = ['.exe', '.msi', '.dll'];

        const requiresSignature = signedExtensions.some(ext => fileName.endsWith(ext));

        return {
            requiresSignature: requiresSignature,
            isSigned: requiresSignature ? Math.random() > 0.5 : false,
            validSignature: Math.random() > 0.3,
            issuer: 'Unknown',
            recommendation: requiresSignature && Math.random() < 0.5
                ? 'Fichier exécutable non signé - risque élevé'
                : 'Signature valide ou non requise'
        };
    }

    calculateThreatScore(results) {
        let score = 0;

        // Antivirus
        if (!results.antivirusCheck.clean) {
            score += results.antivirusCheck.suspiciousFlags * 10;
        }

        // Macros
        if (results.macroDetection.detected) {
            score += 15;
        }

        // Contenu
        if (results.contentAnalysis) {
            score += results.contentAnalysis.riskScore;
        }

        // Signature
        if (results.signatureCheck.requiresSignature && !results.signatureCheck.isSigned) {
            score += 20;
        }

        return Math.min(score, 100);
    }

    getThreatLevel(score) {
        if (score >= 70) return { level: 'critical', label: 'Critique', color: '#ff0040' };
        if (score >= 50) return { level: 'high', label: 'Élevé', color: '#ff8c00' };
        if (score >= 30) return { level: 'medium', label: 'Moyen', color: '#ffd700' };
        return { level: 'low', label: 'Faible', color: '#00ff41' };
    }

    generateRecommendations(analysis) {
        const recommendations = [];

        if (analysis.threatScore >= 50) {
            recommendations.push('⚠️ Ne PAS exécuter ou ouvrir ce fichier');
            recommendations.push('🗑️ Supprimer le fichier immédiatement');
        } else if (analysis.threatScore >= 30) {
            recommendations.push('⚠️ Examiner attentivement avant utilisation');
            recommendations.push('🔍 Vérifier la source du fichier');
        }

        if (analysis.results.macroDetection.detected) {
            recommendations.push('📝 Désactiver les macros avant ouverture');
        }

        if (analysis.results.signatureCheck.requiresSignature && !analysis.results.signatureCheck.isSigned) {
            recommendations.push('✍️ Fichier exécutable non signé - vérifier la provenance');
        }

        if (analysis.results.contentAnalysis && analysis.results.contentAnalysis.suspiciousPatterns > 0) {
            recommendations.push('🔎 Code suspect détecté - analyse approfondie recommandée');
        }

        if (recommendations.length === 0) {
            recommendations.push('✅ Aucune menace majeure détectée');
            recommendations.push('👍 Fichier semble sûr');
        }

        recommendations.push('🔄 Toujours utiliser un antivirus à jour');

        return recommendations;
    }

    calculateSimpleHash(arrayBuffer, type = 'sha256') {
        // Hash simplifié pour simulation
        const bytes = new Uint8Array(arrayBuffer);
        let hash = 0;

        for (let i = 0; i < Math.min(bytes.length, 1000); i++) {
            hash = ((hash << 5) - hash) + bytes[i];
            hash = hash & hash;
        }

        const hexHash = Math.abs(hash).toString(16).padStart(type === 'sha256' ? 64 : 32, '0');
        return hexHash;
    }

    displayResults(analysis) {
        this.hideLoader();

        const container = document.getElementById('file-analysis-results');
        if (!container) return;

        const threatLevel = analysis.threatLevel;

        const html = `
            <div class="analysis-results-container">
                <div class="analysis-header">
                    <h3><i class="fas fa-file-alt"></i> ${analysis.fileName}</h3>
                    <div class="threat-badge ${threatLevel.level}" style="background: ${threatLevel.color}">
                        ${threatLevel.label}
                    </div>
                </div>

                <div class="threat-score-display">
                    <div class="score-circle" style="border-color: ${threatLevel.color}">
                        <div class="score-value" style="color: ${threatLevel.color}">${analysis.threatScore}</div>
                        <div class="score-label">Score de Menace</div>
                    </div>
                </div>

                <div class="analysis-section">
                    <h4><i class="fas fa-info-circle"></i> Informations du Fichier</h4>
                    <div class="info-grid">
                        <div class="info-item">
                            <span class="info-label">Nom:</span>
                            <span class="info-value">${analysis.fileName}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Taille:</span>
                            <span class="info-value">${this.formatFileSize(analysis.fileSize)}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Type:</span>
                            <span class="info-value">${analysis.fileType}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Date d'analyse:</span>
                            <span class="info-value">${new Date(analysis.uploadDate).toLocaleString('fr-FR')}</span>
                        </div>
                    </div>
                </div>

                <div class="analysis-section">
                    <h4><i class="fas fa-shield-virus"></i> Scan Antivirus</h4>
                    <div class="scan-result ${analysis.results.antivirusCheck.clean ? 'clean' : 'infected'}">
                        <i class="fas fa-${analysis.results.antivirusCheck.clean ? 'check-circle' : 'exclamation-triangle'}"></i>
                        <span>${analysis.results.antivirusCheck.clean ? 'Aucune menace détectée' : `${analysis.results.antivirusCheck.threatsFound.length} menace(s) détectée(s)`}</span>
                    </div>
                    ${analysis.results.antivirusCheck.threatsFound.length > 0 ? `
                        <ul class="threats-list">
                            ${analysis.results.antivirusCheck.threatsFound.map(t => `<li>${t}</li>`).join('')}
                        </ul>
                    ` : ''}
                    <small>Moteur: ${analysis.results.antivirusCheck.engine}</small>
                </div>

                ${analysis.results.macroDetection.detected ? `
                <div class="analysis-section">
                    <h4><i class="fas fa-code"></i> Détection de Macros</h4>
                    <div class="macro-warning">
                        <i class="fas fa-exclamation-triangle"></i>
                        <span>Macros détectées - ${analysis.results.macroDetection.type}</span>
                    </div>
                    <p>${analysis.results.macroDetection.recommendation}</p>
                </div>
                ` : ''}

                ${analysis.results.contentAnalysis ? `
                <div class="analysis-section">
                    <h4><i class="fas fa-search"></i> Analyse de Contenu</h4>
                    ${analysis.results.contentAnalysis.isClean ?
                        '<p class="clean-result"><i class="fas fa-check"></i> Aucun pattern suspect détecté</p>' :
                        `<div class="patterns-found">
                            <p><strong>${analysis.results.contentAnalysis.suspiciousPatterns} pattern(s) suspect(s) détecté(s)</strong></p>
                            <ul>
                                ${analysis.results.contentAnalysis.findings.map(f =>
                                    `<li>${f.pattern} ${f.occurrences ? `(${f.occurrences}x)` : ''}</li>`
                                ).join('')}
                            </ul>
                        </div>`
                    }
                </div>
                ` : ''}

                <div class="analysis-section">
                    <h4><i class="fas fa-fingerprint"></i> Hash du Fichier</h4>
                    <div class="hash-display">
                        <div class="hash-item">
                            <span class="hash-label">MD5:</span>
                            <code class="hash-value">${analysis.hash.md5}</code>
                        </div>
                        <div class="hash-item">
                            <span class="hash-label">SHA256:</span>
                            <code class="hash-value">${analysis.hash.sha256}</code>
                        </div>
                    </div>
                </div>

                <div class="analysis-section recommendations">
                    <h4><i class="fas fa-lightbulb"></i> Recommandations</h4>
                    <ul class="recommendations-list">
                        ${analysis.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
                </div>

                <div class="analysis-actions">
                    <button class="btn-primary" onclick="window.fileAnalyzer.downloadReport()">
                        <i class="fas fa-download"></i> Télécharger Rapport
                    </button>
                    <button class="btn-secondary" onclick="window.fileAnalyzer.reset()">
                        <i class="fas fa-redo"></i> Nouvelle Analyse
                    </button>
                </div>
            </div>
        `;

        container.innerHTML = html;
        container.style.display = 'block';
    }

    downloadReport() {
        if (!this.currentAnalysis) return;

        const report = this.generateReport(this.currentAnalysis);
        const blob = new Blob([report], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `CyberGuard_Analysis_${this.currentAnalysis.fileName}_${Date.now()}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);

        this.showNotification('Rapport téléchargé', 'success');
    }

    generateReport(analysis) {
        const threatLevel = analysis.threatLevel;

        return `
================================================================================
                    RAPPORT D'ANALYSE DE SÉCURITÉ
                          CyberGuard Pro
================================================================================

INFORMATIONS DU FICHIER
--------------------------------------------------------------------------------
Nom du fichier    : ${analysis.fileName}
Taille            : ${this.formatFileSize(analysis.fileSize)}
Type              : ${analysis.fileType}
Date d'analyse    : ${new Date(analysis.uploadDate).toLocaleString('fr-FR')}

HASH
--------------------------------------------------------------------------------
MD5               : ${analysis.hash.md5}
SHA256            : ${analysis.hash.sha256}

ÉVALUATION DE LA MENACE
--------------------------------------------------------------------------------
Score de menace   : ${analysis.threatScore}/100
Niveau de menace  : ${threatLevel.label}
Statut            : ${analysis.isSafe ? 'SÛR' : 'POTENTIELLEMENT DANGEREUX'}

RÉSULTATS DE L'ANALYSE
--------------------------------------------------------------------------------

1. SCAN ANTIVIRUS
   Statut         : ${analysis.results.antivirusCheck.clean ? 'CLEAN' : 'INFECTED'}
   Menaces        : ${analysis.results.antivirusCheck.threatsFound.length}
   ${analysis.results.antivirusCheck.threatsFound.map(t => `   - ${t}`).join('\n')}
   Moteur         : ${analysis.results.antivirusCheck.engine}

2. DÉTECTION DE MACROS
   Détectées      : ${analysis.results.macroDetection.detected ? 'OUI' : 'NON'}
   Type           : ${analysis.results.macroDetection.type}
   Risque         : ${analysis.results.macroDetection.risk.toUpperCase()}

${analysis.results.contentAnalysis ? `
3. ANALYSE DE CONTENU
   Patterns       : ${analysis.results.contentAnalysis.suspiciousPatterns}
   Statut         : ${analysis.results.contentAnalysis.isClean ? 'CLEAN' : 'SUSPICIOUS'}
   ${analysis.results.contentAnalysis.findings.map(f => `   - ${f.pattern}`).join('\n')}
` : ''}

4. VÉRIFICATION DE SIGNATURE
   Requis         : ${analysis.results.signatureCheck.requiresSignature ? 'OUI' : 'NON'}
   Signé          : ${analysis.results.signatureCheck.isSigned ? 'OUI' : 'NON'}
   Valide         : ${analysis.results.signatureCheck.validSignature ? 'OUI' : 'NON'}

RECOMMANDATIONS
--------------------------------------------------------------------------------
${analysis.recommendations.map((rec, i) => `${i + 1}. ${rec.replace(/[🔍⚠️📝✍️🔎✅👍🔄🗑️]/g, '')}`).join('\n')}

================================================================================
Rapport généré par CyberGuard Pro - ${new Date().toLocaleString('fr-FR')}
Pour plus d'informations: https://cyberguard.pro
================================================================================
        `.trim();
    }

    addToHistory(analysis) {
        this.analysisHistory.unshift({
            id: analysis.id,
            fileName: analysis.fileName,
            threatScore: analysis.threatScore,
            threatLevel: analysis.threatLevel.level,
            date: analysis.uploadDate
        });

        // Limiter à 50 entrées
        if (this.analysisHistory.length > 50) {
            this.analysisHistory = this.analysisHistory.slice(0, 50);
        }

        this.saveHistory();
        this.updateHistoryDisplay();
    }

    updateHistoryDisplay() {
        const container = document.getElementById('file-analysis-history');
        if (!container) return;

        if (this.analysisHistory.length === 0) {
            container.innerHTML = '<p class="no-history">Aucune analyse effectuée</p>';
            return;
        }

        const html = `
            <div class="history-list">
                ${this.analysisHistory.slice(0, 10).map(item => `
                    <div class="history-item threat-${item.threatLevel}">
                        <div class="history-icon">
                            <i class="fas fa-file"></i>
                        </div>
                        <div class="history-info">
                            <div class="history-filename">${item.fileName}</div>
                            <div class="history-meta">
                                <span class="history-score">Score: ${item.threatScore}</span>
                                <span class="history-date">${this.timeAgo(item.date)}</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        container.innerHTML = html;
    }

    reset() {
        this.currentAnalysis = null;

        const container = document.getElementById('file-analysis-results');
        if (container) {
            container.style.display = 'none';
            container.innerHTML = '';
        }

        const fileInput = document.getElementById('file-input');
        if (fileInput) {
            fileInput.value = '';
        }
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
    }

    timeAgo(timestamp) {
        const seconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);

        if (seconds < 60) return 'À l\'instant';
        if (seconds < 3600) return `Il y a ${Math.floor(seconds / 60)} min`;
        if (seconds < 86400) return `Il y a ${Math.floor(seconds / 3600)} h`;
        return `Il y a ${Math.floor(seconds / 86400)} j`;
    }

    showLoader() {
        const loader = document.getElementById('file-analysis-loader');
        if (loader) {
            loader.style.display = 'flex';
        }
    }

    hideLoader() {
        const loader = document.getElementById('file-analysis-loader');
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

    loadHistory() {
        const saved = localStorage.getItem('cyberguard_file_analysis_history');
        if (saved) {
            this.analysisHistory = JSON.parse(saved);
        }
    }

    saveHistory() {
        localStorage.setItem('cyberguard_file_analysis_history', JSON.stringify(this.analysisHistory));
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('file-analyzer-section')) {
        window.fileAnalyzer = new FileAnalyzer();
    }
});

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FileAnalyzer;
}
