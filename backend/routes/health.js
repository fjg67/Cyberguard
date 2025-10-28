/**
 * Health Check Endpoint
 * Vérifie que le serveur fonctionne correctement
 */

const express = require('express');
const router = express.Router();

/**
 * GET /health
 * Endpoint de santé pour monitoring
 */
router.get('/', (req, res) => {
    const healthcheck = {
        status: 'OK',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        version: '1.0.0',
        services: {
            safeBrowsing: !!process.env.GOOGLE_SAFE_BROWSING_KEY,
            hibp: !!process.env.HIBP_API_KEY,
            mailchimp: !!(process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_LIST_ID)
        },
        memory: {
            usage: process.memoryUsage(),
            heapTotal: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)}MB`,
            heapUsed: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`
        }
    };

    res.json(healthcheck);
});

/**
 * GET /health/ready
 * Readiness probe pour Kubernetes/Docker
 */
router.get('/ready', (req, res) => {
    // Vérifier que les services essentiels sont configurés
    const isReady = !!process.env.GOOGLE_SAFE_BROWSING_KEY;

    if (isReady) {
        res.json({
            status: 'ready',
            timestamp: new Date().toISOString()
        });
    } else {
        res.status(503).json({
            status: 'not ready',
            reason: 'Missing essential configuration',
            timestamp: new Date().toISOString()
        });
    }
});

/**
 * GET /health/live
 * Liveness probe
 */
router.get('/live', (req, res) => {
    res.json({
        status: 'alive',
        timestamp: new Date().toISOString()
    });
});

module.exports = router;
