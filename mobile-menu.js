/**
 * ═══════════════════════════════════════════════════════════════
 * MOBILE MENU - Menu hamburger responsive
 * ═══════════════════════════════════════════════════════════════
 */

class MobileMenu {
    constructor() {
        this.isOpen = false;
        this.breakpoint = 768;
        this.init();
    }

    init() {
        // Créer le bouton hamburger
        this.createHamburgerButton();

        // Gérer le resize
        window.addEventListener('resize', () => this.handleResize());

        // Check initial state
        this.handleResize();

        console.log('📱 Mobile Menu initialized');
    }

    createHamburgerButton() {
        const header = document.querySelector('.cyber-header .header-content');
        if (!header) return;

        const logo = header.querySelector('.logo-cyber');
        if (!logo) return;

        // Créer le bouton hamburger
        const hamburger = document.createElement('button');
        hamburger.className = 'mobile-menu-toggle';
        hamburger.id = 'mobile-menu-toggle';
        hamburger.setAttribute('aria-label', 'Toggle menu');
        hamburger.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;

        // Insérer après le logo
        logo.after(hamburger);

        // Event listener
        hamburger.addEventListener('click', () => this.toggle());

        // Wrapper pour la navigation mobile
        const nav = document.querySelector('.nav-menu');
        if (nav) {
            nav.classList.add('mobile-nav');
        }
    }

    toggle() {
        this.isOpen = !this.isOpen;

        const hamburger = document.getElementById('mobile-menu-toggle');
        const nav = document.querySelector('.nav-menu');

        if (this.isOpen) {
            hamburger?.classList.add('active');
            nav?.classList.add('mobile-open');
            document.body.style.overflow = 'hidden'; // Prevent scroll
        } else {
            hamburger?.classList.remove('active');
            nav?.classList.remove('mobile-open');
            document.body.style.overflow = '';
        }
    }

    handleResize() {
        const width = window.innerWidth;
        const hamburger = document.getElementById('mobile-menu-toggle');
        const nav = document.querySelector('.nav-menu');

        if (width <= this.breakpoint) {
            // Mobile mode
            hamburger?.style.setProperty('display', 'flex');

            // Fermer le menu si ouvert lors du resize
            if (this.isOpen) {
                this.toggle();
            }
        } else {
            // Desktop mode
            hamburger?.style.setProperty('display', 'none');
            nav?.classList.remove('mobile-open');
            document.body.style.overflow = '';
            this.isOpen = false;
        }
    }
}

// Initialize mobile menu
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.mobileMenu = new MobileMenu();
    });
} else {
    window.mobileMenu = new MobileMenu();
}
