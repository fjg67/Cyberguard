/**
 * ═══════════════════════════════════════════════════════════════
 * HEADER OPTIMIZER - Regroupe les boutons UX
 * ═══════════════════════════════════════════════════════════════
 */

(function() {
    'use strict';

    function optimizeHeader() {
        const header = document.querySelector('.cyber-header .header-content');
        if (!header) return;

        // Créer un container pour tous les boutons UX
        const uxActionsContainer = document.createElement('div');
        uxActionsContainer.className = 'header-ux-actions';

        // Sélectionner tous les boutons UX (dans l'ordre souhaité)
        const themeToggle = header.querySelector('.theme-toggle-container');
        const langSwitcher = header.querySelector('.language-switcher-container');
        const notifications = header.querySelector('.notification-center-btn-container');
        const achievements = header.querySelector('.achievement-btn-container');

        // Déplacer tous les boutons dans le container
        if (themeToggle) uxActionsContainer.appendChild(themeToggle);
        if (langSwitcher) uxActionsContainer.appendChild(langSwitcher);
        if (notifications) uxActionsContainer.appendChild(notifications);
        if (achievements) uxActionsContainer.appendChild(achievements);

        // Trouver la navigation
        const nav = header.querySelector('.nav-menu');

        // Insérer le container UX après la navigation (ou à la fin)
        if (nav) {
            nav.after(uxActionsContainer);
        } else {
            header.appendChild(uxActionsContainer);
        }

        console.log('✅ Header optimized - UX buttons grouped');
    }

    // Attendre que tous les systèmes soient chargés
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            // Petit délai pour s'assurer que tous les boutons sont créés
            setTimeout(optimizeHeader, 100);
        });
    } else {
        setTimeout(optimizeHeader, 100);
    }
})();
