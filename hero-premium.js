/**
 * ═══════════════════════════════════════════════════════════════
 * HERO SECTION - INTERACTIONS & ANIMATIONS
 * ═══════════════════════════════════════════════════════════════
 * Features:
 * - Particules dynamiques
 * - Statistiques temps réel
 * - Animations au scroll
 * - Effets interactifs
 */

class HeroPremium {
    constructor() {
        this.particles = [];
        this.statsAnimated = false;
        this.init();
    }

    init() {
        console.log('🚀 Hero Premium initialized');
        
        // Créer les particules
        this.createParticles();
        
        // Initialiser les statistiques
        this.initStats();
        
        // Setup scroll animations
        this.setupScrollAnimations();
        
        // Setup interactions
        this.setupInteractions();
        
        // Démarrer les animations
        this.startAnimations();
    }

    createParticles() {
        const container = document.querySelector('.hero-particles');
        if (!container) return;

        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Position aléatoire
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Taille aléatoire
            const size = Math.random() * 3 + 1;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Couleur aléatoire (cyan/bleu/violet)
            const colors = ['#00ffff', '#3B82F6', '#8B5CF6'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.background = color;
            particle.style.boxShadow = `0 0 ${size * 3}px ${color}`;
            
            // Animation delay aléatoire
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
            
            container.appendChild(particle);
            this.particles.push(particle);
        }
    }

    initStats() {
        // Observer pour animer les stats quand visibles
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.statsAnimated) {
                    this.animateStats();
                    this.statsAnimated = true;
                }
            });
        }, { threshold: 0.5 });

        const statsContainer = document.querySelector('.hero-stats-premium');
        if (statsContainer) {
            observer.observe(statsContainer);
        }
    }

    animateStats() {
        const statValues = document.querySelectorAll('.stat-value-premium');
        
        statValues.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target') || stat.textContent.replace(/[^0-9]/g, ''));
            const duration = 2000;
            const start = Date.now();
            const startValue = 0;
            
            const animate = () => {
                const elapsed = Date.now() - start;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);
                
                // Formatage du nombre
                if (target >= 1000000) {
                    stat.textContent = (currentValue / 1000000).toFixed(1) + 'M';
                } else if (target >= 1000) {
                    stat.textContent = (currentValue / 1000).toFixed(1) + 'K';
                } else {
                    stat.textContent = currentValue.toLocaleString();
                }
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            
            animate();
        });
    }

    setupScrollAnimations() {
        // Parallax effect sur le titre
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroTitle = document.querySelector('.hero-title-premium');
            const heroSubtitle = document.querySelector('.hero-subtitle-premium');
            
            if (heroTitle) {
                heroTitle.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
            
            if (heroSubtitle) {
                heroSubtitle.style.transform = `translateY(${scrolled * 0.2}px)`;
            }
        });
    }

    setupInteractions() {
        // Hover effect sur les stat cards
        const statCards = document.querySelectorAll('.stat-card-premium');
        
        statCards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.createCardRipple(e, card);
            });
        });

        // Click effect sur CTA
        const ctaButton = document.querySelector('.cta-button-premium');
        if (ctaButton) {
            ctaButton.addEventListener('click', (e) => {
                this.createCTARipple(e, ctaButton);
            });
        }

        // Mouse move effect sur le hero
        const heroSection = document.querySelector('.hero-section-premium');
        if (heroSection) {
            heroSection.addEventListener('mousemove', (e) => {
                this.handleMouseMove(e);
            });
        }
    }

    createCardRipple(event, card) {
        const ripple = document.createElement('div');
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        ripple.style.cssText = `
            position: absolute;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: rgba(59, 130, 246, 0.3);
            left: ${x - 50}px;
            top: ${y - 50}px;
            transform: scale(0);
            animation: cardRipple 0.6s ease-out;
            pointer-events: none;
            z-index: 100;
        `;
        
        card.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    createCTARipple(event, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            transform: translate(-50%, -50%);
            animation: ctaRipple 0.6s ease-out;
            pointer-events: none;
            z-index: 100;
        `;
        
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    handleMouseMove(event) {
        const x = (event.clientX / window.innerWidth - 0.5) * 20;
        const y = (event.clientY / window.innerHeight - 0.5) * 20;
        
        const heroContent = document.querySelector('.hero-content-premium');
        if (heroContent) {
            heroContent.style.transform = `translate(${x}px, ${y}px)`;
        }
    }

    startAnimations() {
        // Animation continue des particules
        this.animateParticles();
        
        // Update temps réel
        this.startRealTimeUpdates();
    }

    animateParticles() {
        this.particles.forEach((particle, index) => {
            // Mouvement aléatoire subtil
            setInterval(() => {
                const currentX = parseFloat(particle.style.left);
                const currentY = parseFloat(particle.style.top);
                
                const newX = currentX + (Math.random() - 0.5) * 2;
                const newY = currentY + (Math.random() - 0.5) * 2;
                
                particle.style.left = Math.max(0, Math.min(100, newX)) + '%';
                particle.style.top = Math.max(0, Math.min(100, newY)) + '%';
            }, 2000 + index * 100);
        });
    }

    startRealTimeUpdates() {
        // Simuler des mises à jour en temps réel
        setInterval(() => {
            this.updateRealTimeStats();
        }, 5000);
    }

    updateRealTimeStats() {
        // Mettre à jour le compteur de menaces
        const threatStat = document.querySelector('.stat-card-premium:nth-child(3) .stat-value-premium');
        if (threatStat) {
            const currentValue = parseInt(threatStat.getAttribute('data-target') || threatStat.textContent.replace(/[^0-9]/g, ''));
            const increment = Math.floor(Math.random() * 10) + 1;
            const newValue = currentValue + increment;
            
            threatStat.setAttribute('data-target', newValue);
            
            // Animation subtile de l'incrément
            threatStat.style.transform = 'scale(1.1)';
            setTimeout(() => {
                threatStat.style.transform = 'scale(1)';
            }, 200);
        }
    }

    // Public methods
    refreshStats() {
        this.statsAnimated = false;
        this.initStats();
    }

    addParticle() {
        const container = document.querySelector('.hero-particles');
        if (!container) return;

        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        const colors = ['#00ffff', '#3B82F6', '#8B5CF6'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        particle.style.boxShadow = `0 0 ${size * 3}px ${color}`;
        
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        
        container.appendChild(particle);
        this.particles.push(particle);
        
        // Supprimer la particule après l'animation
        setTimeout(() => {
            particle.remove();
            this.particles = this.particles.filter(p => p !== particle);
        }, 25000);
    }
}

// Ajouter les animations CSS manquantes
const style = document.createElement('style');
style.textContent = `
    @keyframes cardRipple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes ctaRipple {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.heroPremium = new HeroPremium();
    });
} else {
    window.heroPremium = new HeroPremium();
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HeroPremium;
}
