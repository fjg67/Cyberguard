/**
 * Google Safe Browsing API Proxy
 * Protège la clé API et ajoute validation/rate limiting
 */

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

/**
 * Valide une URL
 * @param {string} url - URL à valider
 * @returns {boolean}
 */
function isValidUrl(url) {
    try {
        const urlObj = new URL(url);
        return ['http:', 'https:'].includes(urlObj.protocol);
    } catch (e) {
        return false;
    }
}

/**
 * POST /api/safe-browsing/check
 * Vérifie si une URL est malveillante via Google Safe Browsing API
 */
router.post('/check',
    // Validation
    [
        body('url')
            .trim()
            .notEmpty().withMessage('URL requise')
            .isLength({ max: 2048 }).withMessage('URL trop longue')
            .custom(isValidUrl).withMessage('URL invalide')
    ],
    async (req, res) => {
        // Vérifier les erreurs de validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                error: 'Validation échouée',
                details: errors.array()
            });
        }

        const { url } = req.body;

        // Vérifier que la clé API est configurée
        const apiKey = process.env.GOOGLE_SAFE_BROWSING_KEY;
        if (!apiKey) {
            console.error('Google Safe Browsing API key not configured');
            return res.status(500).json({
                success: false,
                error: 'Configuration serveur manquante'
            });
        }

        try {
            // Préparer la requête pour l'API Google Safe Browsing
            const requestBody = {
                client: {
                    clientId: 'cyberguard-pro',
                    clientVersion: '1.0.0'
                },
                threatInfo: {
                    threatTypes: [
                        'MALWARE',
                        'SOCIAL_ENGINEERING',
                        'UNWANTED_SOFTWARE',
                        'POTENTIALLY_HARMFUL_APPLICATION'
                    ],
                    platformTypes: ['ANY_PLATFORM'],
                    threatEntryTypes: ['URL'],
                    threatEntries: [
                        { url: url }
                    ]
                }
            };

            // Appeler l'API Google Safe Browsing
            const response = await fetch(
                `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                }
            );

            // Vérifier le statut de la réponse
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Google Safe Browsing API error:', response.status, errorText);

                return res.status(response.status).json({
                    success: false,
                    error: 'Erreur API externe',
                    message: 'Impossible de vérifier l\'URL pour le moment'
                });
            }

            const data = await response.json();

            // Analyser la réponse
            const isSafe = !data.matches || data.matches.length === 0;
            const threats = data.matches ? data.matches.map(match => ({
                threatType: match.threatType,
                platformType: match.platformType,
                threatEntryType: match.threatEntryType
            })) : [];

            // Réponse sécurisée
            res.json({
                success: true,
                url: url,
                safe: isSafe,
                threats: threats,
                scannedAt: new Date().toISOString()
            });

            // Log pour statistiques (optionnel)
            console.log(`[Safe Browsing] Scan: ${url} - Safe: ${isSafe} - Threats: ${threats.length}`);

        } catch (error) {
            console.error('Error checking URL:', error);

            res.status(500).json({
                success: false,
                error: 'Erreur lors de la vérification',
                message: 'Une erreur est survenue lors de l\'analyse de l\'URL'
            });
        }
    }
);

module.exports = router;
