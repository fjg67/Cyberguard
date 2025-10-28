/**
 * ═══════════════════════════════════════════════════════════════
 * I18N MANAGER - Internationalization System (EN/FR)
 * ═══════════════════════════════════════════════════════════════
 * Features:
 * - Complete French/English translations
 * - LocalStorage persistence
 * - Dynamic content replacement
 * - Language switcher in header
 * - Browser language detection
 */

class I18nManager {
    constructor() {
        this.currentLang = this.getStoredLanguage() || this.getBrowserLanguage();
        this.translations = this.getTranslations();
        this.init();
    }

    init() {
        // Apply initial language
        this.applyLanguage(this.currentLang, false);

        // Create language switcher in header
        this.createLanguageSwitcher();

        console.log(`🌍 I18n Manager initialized - Current language: ${this.currentLang}`);
    }

    getTranslations() {
        return {
            fr: {
                // Header & Navigation
                'nav.home': 'ACCUEIL',
                'nav.protection': 'PROTECTION',
                'nav.tools': 'OUTILS',
                'nav.comparator': 'COMPARATEUR',
                'nav.pricing': 'TARIFS',
                'nav.blog': 'BLOG',
                'nav.testimonials': 'TÉMOIGNAGES',
                'nav.faq': 'FAQ',
                'nav.contact': 'CONTACT',

                // Hero Section
                'hero.subtitle': 'SYSTÈME DE SÉCURITÉ v4.5',
                'hero.title': 'PROTECTION CYBERNÉTIQUE',
                'hero.title2': 'DE NOUVELLE GÉNÉRATION',
                'hero.description': 'Technologie de défense quantique. Protection en temps réel contre les menaces APT, ransomwares et attaques zero-day.',
                'hero.cta.primary': 'DÉPLOYER LA PROTECTION',
                'hero.cta.secondary': 'VOIR DÉMO',
                'hero.stats.threats': 'Menaces Bloquées',
                'hero.stats.uptime': 'Uptime',
                'hero.stats.response': 'Temps de Réponse',

                // Protection Section
                'protection.title': 'SYSTÈMES DE PROTECTION',
                'protection.subtitle': 'Arsenal de Cybersécurité',
                'protection.firewall.title': 'Pare-feu Quantique',
                'protection.firewall.desc': 'Filtrage multi-couches avec IA prédictive',
                'protection.ai.title': 'Détection IA',
                'protection.ai.desc': 'Machine learning temps réel',
                'protection.encryption.title': 'Chiffrement AES-256',
                'protection.encryption.desc': 'Protection des données de bout en bout',
                'protection.realtime.title': 'Monitoring 24/7',
                'protection.realtime.desc': 'Surveillance continue des menaces',

                // Tools Section
                'tools.title': 'OUTILS INTERACTIFS',
                'tools.subtitle': 'Testez Votre Sécurité',
                'tools.password.title': 'Analyseur de Mots de Passe',
                'tools.password.desc': 'Testez la force de vos mots de passe',
                'tools.password.cta': 'Analyser',
                'tools.leak.title': 'Détecteur de Fuites',
                'tools.leak.desc': 'Vérifiez si vos données ont été compromises',
                'tools.leak.cta': 'Vérifier',
                'tools.phishing.title': 'Scanner Anti-Phishing',
                'tools.phishing.desc': 'Analysez la sécurité des sites web',
                'tools.phishing.cta': 'Scanner',
                'tools.breach.title': 'Vérificateur de Violations',
                'tools.breach.desc': 'Découvrez les violations de données',
                'tools.breach.cta': 'Vérifier',

                // Threat Map
                'threats.title': 'CARTE DES MENACES',
                'threats.subtitle': 'Cyberattaques en Temps Réel',
                'threats.legend': 'Légende des Menaces',
                'threats.ddos': 'Attaque DDoS',
                'threats.ransomware': 'Ransomware',
                'threats.phishing': 'Phishing',
                'threats.malware': 'Malware',
                'threats.breach': 'Vol de Données',

                // Comparator
                'comparator.title': 'COMPARATEUR DE SOLUTIONS',
                'comparator.subtitle': 'Trouvez la Protection Optimale',
                'comparator.quiz.title': 'Pas sûr de votre choix ?',
                'comparator.quiz.desc': 'Répondez à 5 questions et obtenez une recommandation personnalisée',
                'comparator.quiz.cta': 'Démarrer le quiz',
                'comparator.quiz.time': '1 min',

                // Blog
                'blog.title': 'ACTUALITÉS CYBERSÉCURITÉ',
                'blog.subtitle': 'Articles, Guides & Analyses',
                'blog.filter.all': 'Tous',
                'blog.filter.news': 'Actualités',
                'blog.filter.guide': 'Guides',
                'blog.filter.analysis': 'Analyses',
                'blog.filter.alert': 'Alertes',
                'blog.filter.tutorial': 'Tutoriels',
                'blog.filter.review': 'Tests',
                'blog.featured': 'Article À La Une',
                'blog.readmore': 'Lire la suite',
                'blog.readtime': 'min de lecture',
                'blog.loadmore': 'Charger plus d\'articles',

                // Pricing
                'pricing.title': 'TARIFS & LICENCES',
                'pricing.subtitle': 'Choisissez Votre Arsenal',
                'pricing.basic.name': 'BASIQUE',
                'pricing.basic.desc': 'Protection essentielle',
                'pricing.pro.name': 'PRO',
                'pricing.pro.desc': 'Sécurité avancée',
                'pricing.enterprise.name': 'ENTERPRISE',
                'pricing.enterprise.desc': 'Solution complète',
                'pricing.month': 'mois',
                'pricing.cta': 'CHOISIR',
                'pricing.popular': 'PLUS POPULAIRE',

                // Testimonials
                'testimonials.title': 'TÉMOIGNAGES',
                'testimonials.subtitle': 'Retours d\'Experts',

                // FAQ
                'faq.title': 'QUESTIONS FRÉQUENTES',
                'faq.subtitle': 'Base de Connaissances',

                // Footer
                'footer.description': 'Solution de cybersécurité de nouvelle génération avec protection quantique et IA',
                'footer.links': 'LIENS RAPIDES',
                'footer.legal': 'LÉGAL',
                'footer.social': 'RÉSEAUX SOCIAUX',
                'footer.privacy': 'Confidentialité',
                'footer.terms': 'Conditions',
                'footer.cookies': 'Cookies',
                'footer.contact': 'Contact',
                'footer.copyright': 'Tous droits réservés.',

                // Common
                'common.loading': 'Chargement...',
                'common.error': 'Erreur',
                'common.success': 'Succès',
                'common.close': 'Fermer',
                'common.cancel': 'Annuler',
                'common.confirm': 'Confirmer',
                'common.learnmore': 'En savoir plus'
            },
            en: {
                // Header & Navigation
                'nav.home': 'HOME',
                'nav.protection': 'PROTECTION',
                'nav.tools': 'TOOLS',
                'nav.comparator': 'COMPARATOR',
                'nav.pricing': 'PRICING',
                'nav.blog': 'BLOG',
                'nav.testimonials': 'TESTIMONIALS',
                'nav.faq': 'FAQ',
                'nav.contact': 'CONTACT',

                // Hero Section
                'hero.subtitle': 'SECURITY SYSTEM v4.5',
                'hero.title': 'NEXT-GENERATION',
                'hero.title2': 'CYBER PROTECTION',
                'hero.description': 'Quantum defense technology. Real-time protection against APT threats, ransomware and zero-day attacks.',
                'hero.cta.primary': 'DEPLOY PROTECTION',
                'hero.cta.secondary': 'VIEW DEMO',
                'hero.stats.threats': 'Threats Blocked',
                'hero.stats.uptime': 'Uptime',
                'hero.stats.response': 'Response Time',

                // Protection Section
                'protection.title': 'PROTECTION SYSTEMS',
                'protection.subtitle': 'Cybersecurity Arsenal',
                'protection.firewall.title': 'Quantum Firewall',
                'protection.firewall.desc': 'Multi-layer filtering with predictive AI',
                'protection.ai.title': 'AI Detection',
                'protection.ai.desc': 'Real-time machine learning',
                'protection.encryption.title': 'AES-256 Encryption',
                'protection.encryption.desc': 'End-to-end data protection',
                'protection.realtime.title': '24/7 Monitoring',
                'protection.realtime.desc': 'Continuous threat surveillance',

                // Tools Section
                'tools.title': 'INTERACTIVE TOOLS',
                'tools.subtitle': 'Test Your Security',
                'tools.password.title': 'Password Analyzer',
                'tools.password.desc': 'Test your password strength',
                'tools.password.cta': 'Analyze',
                'tools.leak.title': 'Leak Detector',
                'tools.leak.desc': 'Check if your data has been compromised',
                'tools.leak.cta': 'Check',
                'tools.phishing.title': 'Anti-Phishing Scanner',
                'tools.phishing.desc': 'Analyze website security',
                'tools.phishing.cta': 'Scan',
                'tools.breach.title': 'Breach Checker',
                'tools.breach.desc': 'Discover data breaches',
                'tools.breach.cta': 'Check',

                // Threat Map
                'threats.title': 'THREAT MAP',
                'threats.subtitle': 'Real-Time Cyberattacks',
                'threats.legend': 'Threat Legend',
                'threats.ddos': 'DDoS Attack',
                'threats.ransomware': 'Ransomware',
                'threats.phishing': 'Phishing',
                'threats.malware': 'Malware',
                'threats.breach': 'Data Breach',

                // Comparator
                'comparator.title': 'SOLUTION COMPARATOR',
                'comparator.subtitle': 'Find Optimal Protection',
                'comparator.quiz.title': 'Not sure about your choice?',
                'comparator.quiz.desc': 'Answer 5 questions and get a personalized recommendation',
                'comparator.quiz.cta': 'Start quiz',
                'comparator.quiz.time': '1 min',

                // Blog
                'blog.title': 'CYBERSECURITY NEWS',
                'blog.subtitle': 'Articles, Guides & Analysis',
                'blog.filter.all': 'All',
                'blog.filter.news': 'News',
                'blog.filter.guide': 'Guides',
                'blog.filter.analysis': 'Analysis',
                'blog.filter.alert': 'Alerts',
                'blog.filter.tutorial': 'Tutorials',
                'blog.filter.review': 'Reviews',
                'blog.featured': 'Featured Article',
                'blog.readmore': 'Read more',
                'blog.readtime': 'min read',
                'blog.loadmore': 'Load more articles',

                // Pricing
                'pricing.title': 'PRICING & LICENSES',
                'pricing.subtitle': 'Choose Your Arsenal',
                'pricing.basic.name': 'BASIC',
                'pricing.basic.desc': 'Essential protection',
                'pricing.pro.name': 'PRO',
                'pricing.pro.desc': 'Advanced security',
                'pricing.enterprise.name': 'ENTERPRISE',
                'pricing.enterprise.desc': 'Complete solution',
                'pricing.month': 'month',
                'pricing.cta': 'CHOOSE',
                'pricing.popular': 'MOST POPULAR',

                // Testimonials
                'testimonials.title': 'TESTIMONIALS',
                'testimonials.subtitle': 'Expert Reviews',

                // FAQ
                'faq.title': 'FREQUENTLY ASKED QUESTIONS',
                'faq.subtitle': 'Knowledge Base',

                // Footer
                'footer.description': 'Next-generation cybersecurity solution with quantum protection and AI',
                'footer.links': 'QUICK LINKS',
                'footer.legal': 'LEGAL',
                'footer.social': 'SOCIAL MEDIA',
                'footer.privacy': 'Privacy',
                'footer.terms': 'Terms',
                'footer.cookies': 'Cookies',
                'footer.contact': 'Contact',
                'footer.copyright': 'All rights reserved.',

                // Common
                'common.loading': 'Loading...',
                'common.error': 'Error',
                'common.success': 'Success',
                'common.close': 'Close',
                'common.cancel': 'Cancel',
                'common.confirm': 'Confirm',
                'common.learnmore': 'Learn more'
            }
        };
    }

    createLanguageSwitcher() {
        const header = document.querySelector('.cyber-header .header-content');
        if (!header) return;

        const switcherContainer = document.createElement('div');
        switcherContainer.className = 'language-switcher-container';
        switcherContainer.innerHTML = `
            <div class="language-switcher" id="language-switcher">
                <button class="lang-btn ${this.currentLang === 'fr' ? 'active' : ''}" data-lang="fr">
                    <span class="flag">🇫🇷</span>
                    <span class="lang-code">FR</span>
                </button>
                <button class="lang-btn ${this.currentLang === 'en' ? 'active' : ''}" data-lang="en">
                    <span class="flag">🇬🇧</span>
                    <span class="lang-code">EN</span>
                </button>
                <div class="lang-indicator"></div>
            </div>
        `;

        // Insert after theme toggle or before nav
        const themeToggle = header.querySelector('.theme-toggle-container');
        if (themeToggle) {
            themeToggle.after(switcherContainer);
        } else {
            const nav = header.querySelector('.nav-menu');
            if (nav) {
                header.insertBefore(switcherContainer, nav);
            } else {
                header.appendChild(switcherContainer);
            }
        }

        // Add click events
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                this.switchLanguage(lang);
            });
        });
    }

    switchLanguage(lang) {
        if (lang === this.currentLang) return;

        this.currentLang = lang;
        this.applyLanguage(lang, true);
        this.saveLanguage(lang);
        this.updateSwitcherState();

        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('languageChange', {
            detail: { language: lang }
        }));

        console.log(`🌍 Language switched to: ${lang}`);
    }

    applyLanguage(lang, animate = true) {
        const translations = this.translations[lang];

        // Update HTML lang attribute
        document.documentElement.setAttribute('lang', lang);

        // Find and replace all translatable elements
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[key];
                } else {
                    if (animate) {
                        element.style.opacity = '0';
                        setTimeout(() => {
                            element.textContent = translations[key];
                            element.style.opacity = '1';
                        }, 200);
                    } else {
                        element.textContent = translations[key];
                    }
                }
            }
        });

        // Update elements with data-i18n-html (for HTML content)
        document.querySelectorAll('[data-i18n-html]').forEach(element => {
            const key = element.getAttribute('data-i18n-html');
            if (translations[key]) {
                if (animate) {
                    element.style.opacity = '0';
                    setTimeout(() => {
                        element.innerHTML = translations[key];
                        element.style.opacity = '1';
                    }, 200);
                } else {
                    element.innerHTML = translations[key];
                }
            }
        });
    }

    updateSwitcherState() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            const lang = btn.getAttribute('data-lang');
            if (lang === this.currentLang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Move indicator
        const indicator = document.querySelector('.lang-indicator');
        if (indicator) {
            indicator.style.transform = this.currentLang === 'en' ? 'translateX(100%)' : 'translateX(0)';
        }
    }

    getStoredLanguage() {
        return localStorage.getItem('cyberguard-language');
    }

    saveLanguage(lang) {
        localStorage.setItem('cyberguard-language', lang);
    }

    getBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        return browserLang.startsWith('fr') ? 'fr' : 'en';
    }

    getCurrentLanguage() {
        return this.currentLang;
    }

    translate(key) {
        return this.translations[this.currentLang][key] || key;
    }
}

// Initialize I18n manager when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.i18nManager = new I18nManager();
    });
} else {
    window.i18nManager = new I18nManager();
}
