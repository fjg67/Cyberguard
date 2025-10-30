/**
 * CyberGuard Pro - Générateur de Clés SSH
 * Générateur de paires de clés SSH (simulation côté client pour éducation)
 * NOTE: En production, utilisez ssh-keygen côté serveur
 */

class SSHKeyGenerator {
    constructor() {
        this.keyTypes = {
            'rsa-2048': { name: 'RSA 2048', bits: 2048, security: 'Moyenne', speed: 'Rapide' },
            'rsa-4096': { name: 'RSA 4096', bits: 4096, security: 'Élevée', speed: 'Moyen' },
            'ed25519': { name: 'Ed25519', bits: 256, security: 'Très Élevée', speed: 'Très Rapide' },
            'ecdsa-256': { name: 'ECDSA P-256', bits: 256, security: 'Élevée', speed: 'Rapide' },
            'ecdsa-384': { name: 'ECDSA P-384', bits: 384, security: 'Très Élevée', speed: 'Rapide' }
        };

        this.currentKeyType = 'ed25519';
        this.generatedKeys = null;

        this.stats = {
            totalGenerated: 0,
            lastGenerated: null,
            keyTypes: {}
        };

        this.init();
    }

    init() {
        this.loadStats();
        this.setupEventListeners();
        this.updateKeyTypeInfo();
    }

    setupEventListeners() {
        const keyTypeSelect = document.getElementById('ssh-key-type-select');
        const generateBtn = document.getElementById('generate-ssh-key-btn');
        const copyPublicBtn = document.getElementById('copy-ssh-public-btn');
        const copyPrivateBtn = document.getElementById('copy-ssh-private-btn');
        const downloadBtn = document.getElementById('download-ssh-keys-btn');
        const passphraseCheckbox = document.getElementById('ssh-use-passphrase');

        if (keyTypeSelect) {
            keyTypeSelect.addEventListener('change', (e) => {
                this.currentKeyType = e.target.value;
                this.updateKeyTypeInfo();
            });
        }

        if (generateBtn) {
            generateBtn.addEventListener('click', () => this.generateKeys());
        }

        if (copyPublicBtn) {
            copyPublicBtn.addEventListener('click', () => this.copyKey('public'));
        }

        if (copyPrivateBtn) {
            copyPrivateBtn.addEventListener('click', () => this.copyKey('private'));
        }

        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => this.downloadKeys());
        }
    }

    updateKeyTypeInfo() {
        const info = this.keyTypes[this.currentKeyType];
        const infoDisplay = document.getElementById('ssh-key-type-info');

        if (!infoDisplay) return;

        const recommendations = this.getRecommendations(this.currentKeyType);

        infoDisplay.innerHTML = `
            <div class="key-type-info-box">
                <h4>${info.name}</h4>
                <div class="info-grid">
                    <div class="info-item">
                        <span class="info-label">Taille:</span>
                        <span class="info-value">${info.bits} bits</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Sécurité:</span>
                        <span class="info-value">${info.security}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Vitesse:</span>
                        <span class="info-value">${info.speed}</span>
                    </div>
                </div>
                <div class="recommendations">
                    <strong><i class="fas fa-lightbulb"></i> Recommandation:</strong>
                    <p>${recommendations}</p>
                </div>
            </div>
        `;
    }

    getRecommendations(keyType) {
        const recs = {
            'rsa-2048': 'Acceptable pour la plupart des usages, mais RSA 4096 ou Ed25519 sont préférables.',
            'rsa-4096': 'Très sécurisé mais plus lent. Bon choix pour une sécurité maximale avec compatibilité étendue.',
            'ed25519': '🌟 RECOMMANDÉ - Moderne, très sécurisé, rapide. Meilleur choix pour nouveaux systèmes.',
            'ecdsa-256': 'Bon compromis vitesse/sécurité. Préférez Ed25519 si possible.',
            'ecdsa-384': 'Très sécurisé pour usages critiques. Préférez Ed25519 sauf si exigence spécifique.'
        };

        return recs[keyType] || 'Clé standard';
    }

    async generateKeys() {
        const commentInput = document.getElementById('ssh-key-comment');
        const passphraseCheckbox = document.getElementById('ssh-use-passphrase');
        const passphraseInput = document.getElementById('ssh-passphrase-input');

        const comment = commentInput?.value.trim() || `cyberguard-${this.currentKeyType}-${Date.now()}`;
        const usePassphrase = passphraseCheckbox?.checked || false;
        const passphrase = usePassphrase ? (passphraseInput?.value || '') : '';

        if (usePassphrase && !passphrase) {
            this.showNotification('Veuillez entrer une passphrase', 'error');
            return;
        }

        // Afficher loader
        this.showLoader();

        // Simulation de génération (en production, utiliser crypto.subtle ou backend)
        await this.delay(1500);

        const keys = this.simulateKeyGeneration(comment, passphrase, usePassphrase);

        this.generatedKeys = keys;
        this.displayKeys(keys);
        this.hideLoader();

        // Stats
        this.stats.totalGenerated++;
        this.stats.lastGenerated = new Date().toISOString();
        this.stats.keyTypes[this.currentKeyType] = (this.stats.keyTypes[this.currentKeyType] || 0) + 1;
        this.saveStats();
        this.updateStatsDisplay();

        this.showNotification('Paire de clés SSH générée avec succès !', 'success');
    }

    simulateKeyGeneration(comment, passphrase, encrypted) {
        const keyInfo = this.keyTypes[this.currentKeyType];
        const timestamp = new Date().toISOString();

        // Génération simulée de clés (format OpenSSH)
        const publicKey = this.generatePublicKey(comment);
        const privateKey = this.generatePrivateKey(encrypted, passphrase);
        const fingerprint = this.generateFingerprint(publicKey);

        return {
            keyType: this.currentKeyType,
            keyName: keyInfo.name,
            bits: keyInfo.bits,
            publicKey: publicKey,
            privateKey: privateKey,
            fingerprint: fingerprint,
            comment: comment,
            encrypted: encrypted,
            timestamp: timestamp
        };
    }

    generatePublicKey(comment) {
        const keyTypes = {
            'rsa-2048': 'ssh-rsa',
            'rsa-4096': 'ssh-rsa',
            'ed25519': 'ssh-ed25519',
            'ecdsa-256': 'ecdsa-sha2-nistp256',
            'ecdsa-384': 'ecdsa-sha2-nistp384'
        };

        const keyType = keyTypes[this.currentKeyType];

        // Génère une clé publique simulée (base64 aléatoire)
        const keyData = this.generateRandomBase64(this.keyTypes[this.currentKeyType].bits / 8);

        return `${keyType} ${keyData} ${comment}`;
    }

    generatePrivateKey(encrypted, passphrase) {
        const keyHeaders = {
            'rsa-2048': 'RSA PRIVATE KEY',
            'rsa-4096': 'RSA PRIVATE KEY',
            'ed25519': 'OPENSSH PRIVATE KEY',
            'ecdsa-256': 'EC PRIVATE KEY',
            'ecdsa-384': 'EC PRIVATE KEY'
        };

        const header = keyHeaders[this.currentKeyType];
        const lines = [];

        lines.push(`-----BEGIN ${header}-----`);

        if (encrypted && passphrase) {
            lines.push('Proc-Type: 4,ENCRYPTED');
            lines.push('DEK-Info: AES-256-CBC,' + this.generateRandomHex(32));
            lines.push('');
        }

        // Génère des lignes de données simulées
        const keyData = this.generateRandomBase64(this.keyTypes[this.currentKeyType].bits * 4);
        const dataLines = keyData.match(/.{1,64}/g) || [];
        lines.push(...dataLines);

        lines.push(`-----END ${header}-----`);

        return lines.join('\n');
    }

    generateFingerprint(publicKey) {
        // Génère un fingerprint SHA256 simulé
        let hash = 0;
        for (let i = 0; i < publicKey.length; i++) {
            hash = ((hash << 5) - hash) + publicKey.charCodeAt(i);
            hash = hash & hash;
        }

        const hex = Math.abs(hash).toString(16).padStart(64, '0');
        const formatted = hex.match(/.{1,2}/g)?.join(':').substring(0, 47) || hex;

        return `SHA256:${this.generateRandomBase64(32)}`;
    }

    generateRandomBase64(length) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        return result;
    }

    generateRandomHex(length) {
        const chars = '0123456789ABCDEF';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        return result;
    }

    displayKeys(keys) {
        const keysDisplay = document.getElementById('ssh-keys-display');
        if (!keysDisplay) return;

        keysDisplay.innerHTML = `
            <div class="ssh-keys-container">
                <div class="key-header">
                    <h3><i class="fas fa-key"></i> Clés SSH Générées</h3>
                    <div class="key-info-badges">
                        <span class="badge">${keys.keyName}</span>
                        <span class="badge">${keys.bits} bits</span>
                        ${keys.encrypted ? '<span class="badge encrypted-badge"><i class="fas fa-lock"></i> Chiffrée</span>' : ''}
                    </div>
                </div>

                <div class="key-section public-key-section">
                    <div class="key-section-header">
                        <h4><i class="fas fa-globe"></i> Clé Publique</h4>
                        <button id="copy-pub-inline" class="btn-icon" title="Copier">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                    <pre class="key-content"><code>${keys.publicKey}</code></pre>
                    <div class="key-usage">
                        <strong>Usage:</strong> Ajoutez cette clé à <code>~/.ssh/authorized_keys</code> sur le serveur distant
                    </div>
                </div>

                <div class="key-section private-key-section">
                    <div class="key-section-header">
                        <h4><i class="fas fa-lock"></i> Clé Privée</h4>
                        <button id="copy-priv-inline" class="btn-icon" title="Copier">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                    <pre class="key-content private-key-blur"><code>${keys.privateKey}</code></pre>
                    <div class="key-warning">
                        <i class="fas fa-exclamation-triangle"></i>
                        <strong>ATTENTION:</strong> Ne partagez JAMAIS votre clé privée !
                        Stockez-la en sécurité dans <code>~/.ssh/id_${this.currentKeyType}</code>
                    </div>
                    <button id="reveal-private-key-btn" class="btn-secondary">
                        <i class="fas fa-eye"></i> Révéler la clé privée
                    </button>
                </div>

                <div class="key-fingerprint">
                    <strong>Fingerprint:</strong> <code>${keys.fingerprint}</code>
                </div>

                <div class="key-metadata">
                    <div class="metadata-item">
                        <i class="fas fa-comment"></i> <strong>Commentaire:</strong> ${keys.comment}
                    </div>
                    <div class="metadata-item">
                        <i class="fas fa-calendar"></i> <strong>Généré:</strong> ${new Date(keys.timestamp).toLocaleString('fr-FR')}
                    </div>
                </div>

                <div class="ssh-instructions">
                    <h4><i class="fas fa-terminal"></i> Instructions d'Installation</h4>
                    <div class="instruction-step">
                        <strong>1. Sauvegardez la clé privée:</strong>
                        <pre><code>chmod 600 ~/.ssh/id_${this.currentKeyType}
cat > ~/.ssh/id_${this.currentKeyType} << EOF
[Collez la clé privée ici]
EOF</code></pre>
                    </div>
                    <div class="instruction-step">
                        <strong>2. Ajoutez la clé publique au serveur:</strong>
                        <pre><code>ssh-copy-id -i ~/.ssh/id_${this.currentKeyType}.pub user@server</code></pre>
                        <p>Ou manuellement:</p>
                        <pre><code>cat >> ~/.ssh/authorized_keys << EOF
${keys.publicKey}
EOF</code></pre>
                    </div>
                    <div class="instruction-step">
                        <strong>3. Testez la connexion:</strong>
                        <pre><code>ssh -i ~/.ssh/id_${this.currentKeyType} user@server</code></pre>
                    </div>
                </div>
            </div>
        `;

        keysDisplay.style.display = 'block';

        // Event listeners pour boutons inline
        document.getElementById('copy-pub-inline')?.addEventListener('click', () => this.copyKey('public'));
        document.getElementById('copy-priv-inline')?.addEventListener('click', () => this.copyKey('private'));

        // Révéler clé privée
        const revealBtn = document.getElementById('reveal-private-key-btn');
        const privateKeyBlur = document.querySelector('.private-key-blur');

        if (revealBtn && privateKeyBlur) {
            revealBtn.addEventListener('click', () => {
                if (privateKeyBlur.classList.contains('private-key-blur')) {
                    privateKeyBlur.classList.remove('private-key-blur');
                    revealBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Masquer la clé privée';
                } else {
                    privateKeyBlur.classList.add('private-key-blur');
                    revealBtn.innerHTML = '<i class="fas fa-eye"></i> Révéler la clé privée';
                }
            });
        }
    }

    copyKey(type) {
        if (!this.generatedKeys) {
            this.showNotification('Aucune clé générée', 'error');
            return;
        }

        const key = type === 'public' ? this.generatedKeys.publicKey : this.generatedKeys.privateKey;

        navigator.clipboard.writeText(key).then(() => {
            this.showNotification(`Clé ${type === 'public' ? 'publique' : 'privée'} copiée !`, 'success');
        }).catch(err => {
            console.error('Erreur de copie:', err);
            this.showNotification('Erreur lors de la copie', 'error');
        });
    }

    downloadKeys() {
        if (!this.generatedKeys) {
            this.showNotification('Aucune clé générée', 'error');
            return;
        }

        // Télécharge les deux clés en fichiers séparés
        this.downloadFile(
            `id_${this.currentKeyType}.pub`,
            this.generatedKeys.publicKey,
            'text/plain'
        );

        this.downloadFile(
            `id_${this.currentKeyType}`,
            this.generatedKeys.privateKey,
            'text/plain'
        );

        this.showNotification('Clés téléchargées ! N\'oubliez pas de sécuriser la clé privée.', 'success');
    }

    downloadFile(filename, content, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    showLoader() {
        const loader = document.getElementById('ssh-loader');
        if (loader) {
            loader.style.display = 'flex';
        }
    }

    hideLoader() {
        const loader = document.getElementById('ssh-loader');
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

    loadStats() {
        const saved = localStorage.getItem('cyberguard_ssh_stats');
        if (saved) {
            this.stats = JSON.parse(saved);
        }
    }

    saveStats() {
        localStorage.setItem('cyberguard_ssh_stats', JSON.stringify(this.stats));
    }

    updateStatsDisplay() {
        const statsDisplay = document.getElementById('ssh-stats-display');
        if (!statsDisplay) return;

        const topKeyType = Object.entries(this.stats.keyTypes)
            .sort((a, b) => b[1] - a[1])[0];

        statsDisplay.innerHTML = `
            <div class="stats-mini">
                <div class="stat-item">
                    <strong>Total généré:</strong> ${this.stats.totalGenerated}
                </div>
                ${topKeyType ? `
                <div class="stat-item">
                    <strong>Type favori:</strong> ${this.keyTypes[topKeyType[0]].name}
                </div>
                ` : ''}
            </div>
        `;
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('ssh-key-generator-section')) {
        window.sshKeyGenerator = new SSHKeyGenerator();
    }
});

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SSHKeyGenerator;
}
