/**
 * CyberGuard Pro - Backend API Server
 * Serveur Express sécurisé pour gérer les API keys et requêtes sensibles
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

// Import routes
const safeBrowsingRoutes = require('./routes/safeBrowsing');
const hibpRoutes = require('./routes/hibp');
const newsletterRoutes = require('./routes/newsletter');
const healthRoutes = require('./routes/health');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// ===== MIDDLEWARE SECURITY =====

// Helmet - Sécurise les headers HTTP
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://www.googletagmanager.com"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: [
                "'self'",
                "https://cve.circl.lu",
                "https://safebrowsing.googleapis.com",
                "https://haveibeenpwned.com"
            ],
            fontSrc: ["'self'"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'none'"]
        }
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS - Configuration sécurisée
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400 // 24 hours
};
app.use(cors(corsOptions));

// Compression - Réduit la taille des réponses
app.use(compression());

// Body parser
app.use(express.json({ limit: '10kb' })); // Limite la taille des payloads
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Morgan - Logging des requêtes
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

// ===== RATE LIMITING =====

// Rate limiter global
const globalLimiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
    message: {
        error: 'Trop de requêtes depuis cette adresse IP, veuillez réessayer plus tard.',
        retryAfter: '15 minutes'
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        res.status(429).json({
            error: 'Trop de requêtes',
            message: 'Vous avez dépassé la limite de requêtes autorisées. Veuillez réessayer dans 15 minutes.',
            retryAfter: req.rateLimit.resetTime
        });
    }
});

// Rate limiter strict pour les API externes (Google Safe Browsing, HIBP)
const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10, // 10 requêtes par minute
    message: {
        error: 'Limite de requêtes API atteinte',
        retryAfter: '1 minute'
    },
    standardHeaders: true,
    legacyHeaders: false
});

// Appliquer rate limiting global
app.use('/api/', globalLimiter);

// ===== ROUTES =====

// Health check (pas de rate limiting)
app.use('/health', healthRoutes);

// API routes (avec rate limiting)
app.use('/api/safe-browsing', apiLimiter, safeBrowsingRoutes);
app.use('/api/hibp', apiLimiter, hibpRoutes);
app.use('/api/newsletter', newsletterRoutes);

// Route de base
app.get('/', (req, res) => {
    res.json({
        name: 'CyberGuard Pro API',
        version: '1.0.0',
        status: 'running',
        endpoints: {
            health: '/health',
            safeBrowsing: '/api/safe-browsing/check',
            hibp: '/api/hibp/check',
            newsletter: '/api/newsletter/subscribe'
        },
        documentation: 'https://docs.cyberguard-pro.com/api'
    });
});

// ===== ERROR HANDLING =====

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Endpoint non trouvé',
        path: req.originalUrl,
        method: req.method,
        timestamp: new Date().toISOString()
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);

    // Ne pas exposer les détails d'erreur en production
    const errorResponse = {
        error: 'Erreur serveur',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Une erreur est survenue',
        timestamp: new Date().toISOString()
    };

    if (process.env.NODE_ENV === 'development') {
        errorResponse.stack = err.stack;
    }

    res.status(err.status || 500).json(errorResponse);
});

// ===== SERVER START =====

const server = app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🛡️  CyberGuard Pro API Server                           ║
║                                                            ║
║   Status: ✅ Running                                       ║
║   Port: ${PORT}                                              ║
║   Environment: ${process.env.NODE_ENV || 'development'}                               ║
║   CORS Origin: ${process.env.FRONTEND_URL || 'http://localhost:3000'}        ║
║                                                            ║
║   Endpoints:                                               ║
║   • GET  /health                                           ║
║   • POST /api/safe-browsing/check                          ║
║   • POST /api/hibp/check                                   ║
║   • POST /api/newsletter/subscribe                         ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
    `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, closing server gracefully...');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT received, closing server gracefully...');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});

module.exports = app;
