/**
 * Have I Been Pwned API Proxy
 * Vérifie si un email a été compromis dans des fuites de données
 */

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

/**
 * POST /api/hibp/check
 * Vérifie si un email a été compromis
 */
router.post('/check',
    // Validation
    [
        body('email')
            .trim()
            .notEmpty().withMessage('Email requis')
            .isEmail().withMessage('Format email invalide')
            .normalizeEmail()
            .isLength({ max: 254 }).withMessage('Email trop long')
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

        const { email } = req.body;

        // Vérifier que la clé API est configurée
        const apiKey = process.env.HIBP_API_KEY;
        if (!apiKey) {
            console.error('HIBP API key not configured');
            // Retourner une réponse de fallback en mode dégradé
            return res.json({
                success: true,
                email: email,
                breached: false,
                breaches: [],
                message: 'Service temporairement indisponible - Mode simulation',
                simulation: true
            });
        }

        try {
            // Appeler l'API HIBP
            const response = await fetch(
                `https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(email)}?truncateResponse=false`,
                {
                    headers: {
                        'hibp-api-key': apiKey,
                        'User-Agent': 'CyberGuard-Pro'
                    }
                }
            );

            // 404 = pas de breach trouvé (c'est une bonne nouvelle!)
            if (response.status === 404) {
                return res.json({
                    success: true,
                    email: email,
                    breached: false,
                    breaches: [],
                    message: 'Aucune fuite de données détectée pour cet email',
                    checkedAt: new Date().toISOString()
                });
            }

            // 200 = breaches trouvés
            if (response.ok) {
                const breaches = await response.json();

                // Formater les données de breach
                const formattedBreaches = breaches.map(breach => ({
                    name: breach.Name,
                    title: breach.Title,
                    domain: breach.Domain,
                    breachDate: breach.BreachDate,
                    addedDate: breach.AddedDate,
                    pwnCount: breach.PwnCount,
                    description: breach.Description,
                    dataClasses: breach.DataClasses,
                    isVerified: breach.IsVerified,
                    isFabricated: breach.IsFabricated,
                    isSensitive: breach.IsSensitive,
                    isRetired: breach.IsRetired
                }));

                return res.json({
                    success: true,
                    email: email,
                    breached: true,
                    breaches: formattedBreaches,
                    breachCount: formattedBreaches.length,
                    message: `${formattedBreaches.length} fuite(s) de données détectée(s)`,
                    checkedAt: new Date().toISOString()
                });
            }

            // Autres codes d'erreur
            if (response.status === 429) {
                return res.status(429).json({
                    success: false,
                    error: 'Limite de requêtes atteinte',
                    message: 'Trop de requêtes, veuillez réessayer dans quelques secondes'
                });
            }

            // Erreur générique
            throw new Error(`HIBP API returned status ${response.status}`);

        } catch (error) {
            console.error('Error checking email breach:', error);

            // En cas d'erreur, retourner une réponse de fallback
            res.json({
                success: true,
                email: email,
                breached: false,
                breaches: [],
                message: 'Service temporairement indisponible - Impossible de vérifier pour le moment',
                simulation: true,
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }
);

/**
 * GET /api/hibp/paste/:email
 * Vérifie si un email apparaît dans des pastes publics
 * Note: Endpoint optionnel, nécessite un plan HIBP payant
 */
router.get('/paste/:email', async (req, res) => {
    const email = req.params.email;

    // Validation basique
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            error: 'Format email invalide'
        });
    }

    const apiKey = process.env.HIBP_API_KEY;
    if (!apiKey) {
        return res.json({
            success: true,
            pastes: [],
            message: 'Service non configuré'
        });
    }

    try {
        const response = await fetch(
            `https://haveibeenpwned.com/api/v3/pasteaccount/${encodeURIComponent(email)}`,
            {
                headers: {
                    'hibp-api-key': apiKey,
                    'User-Agent': 'CyberGuard-Pro'
                }
            }
        );

        if (response.status === 404) {
            return res.json({
                success: true,
                pastes: [],
                message: 'Aucun paste trouvé'
            });
        }

        if (response.ok) {
            const pastes = await response.json();
            return res.json({
                success: true,
                pastes: pastes,
                count: pastes.length
            });
        }

        throw new Error(`HIBP Paste API returned status ${response.status}`);

    } catch (error) {
        console.error('Error checking pastes:', error);
        res.status(500).json({
            success: false,
            error: 'Erreur lors de la vérification des pastes'
        });
    }
});

module.exports = router;
