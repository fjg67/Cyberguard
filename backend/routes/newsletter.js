/**
 * Newsletter Subscription API
 * Gère les inscriptions à la newsletter via Mailchimp
 */

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

/**
 * POST /api/newsletter/subscribe
 * Inscrit un email à la newsletter
 */
router.post('/subscribe',
    // Validation
    [
        body('email')
            .trim()
            .notEmpty().withMessage('Email requis')
            .isEmail().withMessage('Format email invalide')
            .normalizeEmail()
            .isLength({ max: 254 }).withMessage('Email trop long'),
        body('name')
            .optional()
            .trim()
            .isLength({ max: 100 }).withMessage('Nom trop long')
            .escape() // Prévention XSS
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

        const { email, name } = req.body;

        // Vérifier la configuration Mailchimp
        const apiKey = process.env.MAILCHIMP_API_KEY;
        const listId = process.env.MAILCHIMP_LIST_ID;
        const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX || 'us1';

        if (!apiKey || !listId) {
            console.error('Mailchimp not configured');

            // Mode simulation en développement
            if (process.env.NODE_ENV === 'development') {
                console.log(`[Newsletter] Simulation: ${email} subscribed`);
                return res.json({
                    success: true,
                    message: 'Inscription réussie (mode simulation)',
                    email: email,
                    simulation: true
                });
            }

            return res.status(500).json({
                success: false,
                error: 'Service newsletter non configuré'
            });
        }

        try {
            // Préparer les données pour Mailchimp
            const memberData = {
                email_address: email,
                status: 'subscribed', // ou 'pending' pour double opt-in
                merge_fields: {}
            };

            // Ajouter le nom si fourni
            if (name) {
                const nameParts = name.split(' ');
                memberData.merge_fields.FNAME = nameParts[0];
                if (nameParts.length > 1) {
                    memberData.merge_fields.LNAME = nameParts.slice(1).join(' ');
                }
            }

            // Tags pour segmentation
            memberData.tags = ['website', 'cyberguard-pro'];

            // Appeler l'API Mailchimp
            const response = await fetch(
                `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `apikey ${apiKey}`
                    },
                    body: JSON.stringify(memberData)
                }
            );

            const data = await response.json();

            // Email déjà inscrit
            if (response.status === 400 && data.title === 'Member Exists') {
                return res.json({
                    success: true,
                    message: 'Cet email est déjà inscrit à notre newsletter',
                    email: email,
                    alreadySubscribed: true
                });
            }

            // Succès
            if (response.ok) {
                console.log(`[Newsletter] New subscriber: ${email}`);

                return res.json({
                    success: true,
                    message: 'Inscription à la newsletter réussie ! Vous recevrez nos alertes de sécurité.',
                    email: email,
                    subscribedAt: new Date().toISOString()
                });
            }

            // Erreur Mailchimp
            console.error('Mailchimp API error:', response.status, data);

            return res.status(response.status).json({
                success: false,
                error: 'Erreur lors de l\'inscription',
                message: data.detail || 'Une erreur est survenue'
            });

        } catch (error) {
            console.error('Error subscribing to newsletter:', error);

            res.status(500).json({
                success: false,
                error: 'Erreur serveur',
                message: 'Impossible de finaliser l\'inscription pour le moment'
            });
        }
    }
);

/**
 * POST /api/newsletter/unsubscribe
 * Désinscrit un email de la newsletter
 */
router.post('/unsubscribe',
    [
        body('email')
            .trim()
            .notEmpty().withMessage('Email requis')
            .isEmail().withMessage('Format email invalide')
            .normalizeEmail()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                error: 'Validation échouée',
                details: errors.array()
            });
        }

        const { email } = req.body;

        const apiKey = process.env.MAILCHIMP_API_KEY;
        const listId = process.env.MAILCHIMP_LIST_ID;
        const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX || 'us1';

        if (!apiKey || !listId) {
            return res.status(500).json({
                success: false,
                error: 'Service non configuré'
            });
        }

        try {
            // Calculer le hash MD5 de l'email (requis par Mailchimp)
            const crypto = require('crypto');
            const subscriberHash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');

            // Mettre à jour le statut à 'unsubscribed'
            const response = await fetch(
                `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members/${subscriberHash}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `apikey ${apiKey}`
                    },
                    body: JSON.stringify({
                        status: 'unsubscribed'
                    })
                }
            );

            if (response.ok) {
                console.log(`[Newsletter] Unsubscribed: ${email}`);

                return res.json({
                    success: true,
                    message: 'Désinscription réussie',
                    email: email
                });
            }

            const data = await response.json();
            throw new Error(data.detail || 'Mailchimp API error');

        } catch (error) {
            console.error('Error unsubscribing:', error);

            res.status(500).json({
                success: false,
                error: 'Erreur lors de la désinscription',
                message: error.message
            });
        }
    }
);

module.exports = router;
