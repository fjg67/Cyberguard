/**
 * Vercel Serverless Function Wrapper
 * Ce fichier adapte le serveur Express pour les Serverless Functions de Vercel
 */

const app = require('../backend/server');

// Export pour Vercel
module.exports = app;
