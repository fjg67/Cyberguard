/**
 * CyberGuard API Client
 * Client sécurisé pour communiquer avec le backend
 */

class CyberGuardAPIClient {
    constructor() {
        // Configuration de l'API backend
        this.baseURL = this.getBackendURL();
        this.timeout = 30000; // 30 secondes

        console.log(`[API Client] Initialized with backend: ${this.baseURL}`);
    }

    /**
     * Détermine l'URL du backend selon l'environnement
     */
    getBackendURL() {
        // En production, utilisez votre domaine backend
        // Ex: 'https://api.cyberguard-pro.com'

        // En développement local
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            return 'http://localhost:3001';
        }

        // En production (à ajuster selon votre déploiement)
        return 'https://api.cyberguard-pro.com';
    }

    /**
     * Effectue une requête HTTP vers le backend
     * @param {string} endpoint - Endpoint API (ex: '/api/safe-browsing/check')
     * @param {object} options - Options fetch
     * @returns {Promise<object>}
     */
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;

        // Configuration par défaut
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        // Timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);
        config.signal = controller.signal;

        try {
            const response = await fetch(url, config);
            clearTimeout(timeoutId);

            // Parse JSON response
            const data = await response.json();

            // Si erreur HTTP, throw avec les détails
            if (!response.ok) {
                throw {
                    status: response.status,
                    message: data.message || data.error || 'Erreur API',
                    data: data
                };
            }

            return data;

        } catch (error) {
            clearTimeout(timeoutId);

            // Erreur timeout
            if (error.name === 'AbortError') {
                throw {
                    status: 408,
                    message: 'Délai d\'attente dépassé. Veuillez réessayer.',
                    error: 'TIMEOUT'
                };
            }

            // Erreur réseau
            if (error instanceof TypeError && error.message === 'Failed to fetch') {
                throw {
                    status: 0,
                    message: 'Impossible de contacter le serveur. Vérifiez votre connexion internet.',
                    error: 'NETWORK_ERROR'
                };
            }

            // Autres erreurs
            throw error;
        }
    }

    /**
     * Vérifie la santé du backend
     * @returns {Promise<object>}
     */
    async checkHealth() {
        try {
            return await this.request('/health', { method: 'GET' });
        } catch (error) {
            console.error('[API Client] Health check failed:', error);
            return { status: 'ERROR', available: false };
        }
    }

    /**
     * Vérifie si une URL est sûre via Google Safe Browsing
     * @param {string} url - URL à vérifier
     * @returns {Promise<object>}
     */
    async checkUrlSafety(url) {
        try {
            const response = await this.request('/api/safe-browsing/check', {
                method: 'POST',
                body: JSON.stringify({ url })
            });

            return {
                success: true,
                safe: response.safe,
                threats: response.threats || [],
                url: response.url,
                scannedAt: response.scannedAt
            };

        } catch (error) {
            console.error('[API Client] Safe Browsing check failed:', error);

            // En cas d'erreur API, utiliser le fallback local
            return this.fallbackUrlCheck(url, error);
        }
    }

    /**
     * Fallback local si l'API backend n'est pas disponible
     * @param {string} url - URL à vérifier
     * @param {object} error - Erreur originale
     * @returns {object}
     */
    fallbackUrlCheck(url, error) {
        console.warn('[API Client] Using local fallback for URL check');

        // Liste locale de domaines dangereux connus
        const knownThreats = [
            'malware',
            'phishing',
            'fake-paypal',
            'fake-bank',
            'scam',
            'virus',
            'trojan',
            'testsafebrowsing.appspot.com' // Site test Google
        ];

        try {
            const urlObj = new URL(url);
            const hostname = urlObj.hostname.toLowerCase();

            // Vérifier contre la liste locale
            for (const threat of knownThreats) {
                if (hostname.includes(threat)) {
                    return {
                        success: true,
                        safe: false,
                        threats: ['LOCAL_PATTERN_MATCH'],
                        url: url,
                        fallback: true,
                        warning: 'Vérification locale uniquement (backend indisponible)'
                    };
                }
            }

            // URL semble OK selon vérification locale
            return {
                success: true,
                safe: true,
                threats: [],
                url: url,
                fallback: true,
                warning: 'Vérification locale uniquement (backend indisponible)'
            };

        } catch (parseError) {
            return {
                success: false,
                error: 'URL invalide',
                fallback: true
            };
        }
    }

    /**
     * Vérifie si un email a été compromis (Have I Been Pwned)
     * @param {string} email - Email à vérifier
     * @returns {Promise<object>}
     */
    async checkEmailBreach(email) {
        try {
            const response = await this.request('/api/hibp/check', {
                method: 'POST',
                body: JSON.stringify({ email })
            });

            return {
                success: true,
                breached: response.breached,
                breaches: response.breaches || [],
                breachCount: response.breachCount || 0,
                email: response.email,
                message: response.message,
                simulation: response.simulation || false
            };

        } catch (error) {
            console.error('[API Client] HIBP check failed:', error);

            // Retourner erreur mais pas de panique
            return {
                success: false,
                error: error.message || 'Impossible de vérifier l\'email',
                email: email
            };
        }
    }

    /**
     * Inscription à la newsletter
     * @param {string} email - Email à inscrire
     * @param {string} name - Nom (optionnel)
     * @returns {Promise<object>}
     */
    async subscribeNewsletter(email, name = null) {
        try {
            const response = await this.request('/api/newsletter/subscribe', {
                method: 'POST',
                body: JSON.stringify({ email, name })
            });

            return {
                success: true,
                message: response.message,
                email: response.email,
                alreadySubscribed: response.alreadySubscribed || false,
                simulation: response.simulation || false
            };

        } catch (error) {
            console.error('[API Client] Newsletter subscription failed:', error);

            return {
                success: false,
                error: error.message || 'Erreur lors de l\'inscription',
                details: error.data
            };
        }
    }

    /**
     * Désinscription de la newsletter
     * @param {string} email - Email à désinscrire
     * @returns {Promise<object>}
     */
    async unsubscribeNewsletter(email) {
        try {
            const response = await this.request('/api/newsletter/unsubscribe', {
                method: 'POST',
                body: JSON.stringify({ email })
            });

            return {
                success: true,
                message: response.message,
                email: response.email
            };

        } catch (error) {
            console.error('[API Client] Newsletter unsubscription failed:', error);

            return {
                success: false,
                error: error.message || 'Erreur lors de la désinscription'
            };
        }
    }
}

// Instance globale
window.cyberGuardAPI = new CyberGuardAPIClient();

// Health check au chargement (optionnel)
document.addEventListener('DOMContentLoaded', async () => {
    const health = await window.cyberGuardAPI.checkHealth();

    if (health.status === 'OK') {
        console.log('✅ Backend API disponible:', health);
    } else {
        console.warn('⚠️ Backend API indisponible - Mode fallback activé');
    }
});
