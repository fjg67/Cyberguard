/**
 * ═══════════════════════════════════════════════════════════════
 * DEFENSE TECHNOLOGIES - INTERACTIONS 3D & ANIMATIONS
 * ═══════════════════════════════════════════════════════════════
 * Features:
 * - Effet 3D au survol des cards
 * - Animations des compteurs
 * - Modal "Comment ça marche"
 * - Accordéon interactif
 * - Micro-interactions premium
 */

class DefenseTechnologiesPremium {
    constructor() {
        this.modal = null;
        this.currentCard = null;
        this.countersAnimated = false;
        this.init();
    }

    init() {
        console.log('🛡️ Defense Technologies Premium initialized');
        
        // Setup 3D card effects
        this.setup3DCards();
        
        // Initialize counters
        this.initCounters();
        
        // Setup modal
        this.setupModal();
        
        // Setup accordion
        this.setupAccordion();
        
        // Setup interactions
        this.setupInteractions();
    }

    setup3DCards() {
        const cards = document.querySelectorAll('.defense-card-3d');
        
        cards.forEach(card => {
            // 3D tilt effect
            card.addEventListener('mousemove', (e) => {
                this.handleCard3DTilt(e, card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.resetCard3D(card);
            });
            
            // Click for modal
            const button = card.querySelector('.defense-card-button');
            if (button) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.openModal(card);
                });
            }
        });
    }

    handleCard3DTilt(event, card) {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateZ(10px)
        `;
        
        // Dynamic glow based on mouse position
        const glowX = (x / rect.width) * 100;
        const glowY = (y / rect.height) * 100;
        
        card.style.boxShadow = `
            ${glowX - 50}px ${glowY - 50}px 60px rgba(59, 130, 246, 0.4),
            0 20px 40px rgba(59, 130, 246, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2)
        `;
    }

    resetCard3D(card) {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        card.style.boxShadow = `
            0 8px 32px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1)
        `;
    }

    initCounters() {
        // Observer pour animer les compteurs quand visibles
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.countersAnimated) {
                    this.animateCounters();
                    this.countersAnimated = true;
                }
            });
        }, { threshold: 0.5 });

        const section = document.querySelector('.defense-technologies-section');
        if (section) {
            observer.observe(section);
        }
    }

    animateCounters() {
        const statValues = document.querySelectorAll('.defense-stat-value');
        
        statValues.forEach(stat => {
            const text = stat.textContent;
            const target = this.parseValue(text);
            const suffix = this.getSuffix(text);
            
            if (target === 0) return;
            
            const duration = 2000;
            const start = Date.now();
            const startValue = 0;
            
            const animate = () => {
                const elapsed = Date.now() - start;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const currentValue = startValue + (target - startValue) * easeOutQuart;
                
                // Formatage du nombre
                if (suffix === '%') {
                    stat.textContent = Math.floor(currentValue) + suffix;
                } else if (suffix === 'M') {
                    stat.textContent = (currentValue / 1000000).toFixed(1) + suffix;
                } else if (suffix === 'K') {
                    stat.textContent = (currentValue / 1000).toFixed(1) + suffix;
                } else {
                    stat.textContent = Math.floor(currentValue).toLocaleString();
                }
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            
            animate();
        });
    }

    parseValue(text) {
        const number = parseFloat(text.replace(/[^0-9.]/g, ''));
        if (text.includes('M')) return number * 1000000;
        if (text.includes('K')) return number * 1000;
        return number;
    }

    getSuffix(text) {
        if (text.includes('%')) return '%';
        if (text.includes('M')) return 'M';
        if (text.includes('K')) return 'K';
        return '';
    }

    setupModal() {
        // Créer le modal s'il n'existe pas
        if (!document.querySelector('.defense-modal')) {
            this.createModal();
        }
        
        this.modal = document.querySelector('.defense-modal');
        
        // Close modal
        const closeBtn = this.modal.querySelector('.defense-modal-close');
        closeBtn.addEventListener('click', () => this.closeModal());
        
        // Close on backdrop click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
        
        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    createModal() {
        const modalHTML = `
            <div class="defense-modal">
                <div class="defense-modal-content">
                    <button class="defense-modal-close">&times;</button>
                    <h2 class="defense-modal-title">Comment ça marche</h2>
                    <div class="defense-modal-body">
                        <div class="defense-modal-section">
                            <h3>🔧 Technologie</h3>
                            <p id="modal-technology">Description de la technologie...</p>
                        </div>
                        <div class="defense-modal-section">
                            <h3>⚡ Fonctionnalités</h3>
                            <ul id="modal-features">
                                <li>Fonctionnalité 1</li>
                                <li>Fonctionnalité 2</li>
                                <li>Fonctionnalité 3</li>
                            </ul>
                        </div>
                        <div class="defense-modal-section">
                            <h3>🛡️ Avantages</h3>
                            <ul id="modal-benefits">
                                <li>Avantage 1</li>
                                <li>Avantage 2</li>
                                <li>Avantage 3</li>
                            </ul>
                        </div>
                        <div class="defense-modal-section">
                            <h3>📊 Performance</h3>
                            <p id="modal-performance">Détails de performance...</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    openModal(card) {
        this.currentCard = card;
        
        // Récupérer les données de la card
        const title = card.querySelector('.defense-card-title').textContent;
        const description = card.querySelector('.defense-card-description').textContent;
        
        // Mettre à jour le modal avec les données
        const modalTitle = this.modal.querySelector('.defense-modal-title');
        const modalTechnology = this.modal.querySelector('#modal-technology');
        const modalFeatures = this.modal.querySelector('#modal-features');
        const modalBenefits = this.modal.querySelector('#modal-benefits');
        const modalPerformance = this.modal.querySelector('#modal-performance');
        
        modalTitle.textContent = title;
        modalTechnology.textContent = description;
        
        // Générer du contenu basé sur le type de technologie
        this.updateModalContent(title, modalFeatures, modalBenefits, modalPerformance);
        
        // Afficher le modal
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    updateModalContent(title, featuresEl, benefitsEl, performanceEl) {
        const content = this.getTechnologyContent(title);
        
        featuresEl.innerHTML = content.features.map(f => `<li>${f}</li>`).join('');
        benefitsEl.innerHTML = content.benefits.map(b => `<li>${b}</li>`).join('');
        performanceEl.textContent = content.performance;
    }

    getTechnologyContent(title) {
        const contents = {
            'BITDEFENDER SHIELD': {
                features: [
                    'IA multicouche avancée',
                    'Détection Zero-Day en temps réel',
                    'Anti-Ransomware quantique',
                    'Scan comportemental intelligent',
                    'Protection cloud hybride'
                ],
                benefits: [
                    'Protection 99.9% contre les menaces connues',
                    'Détection proactive des menaces inconnues',
                    'Impact minimal sur les performances',
                    'Mises à jour automatiques en temps réel',
                    'Compatible tous les appareils'
                ],
                performance: 'Score de protection : 98/100 • Impact système : < 2% • Scan complet : < 5 minutes'
            },
            'VPN SÉCURISÉ': {
                features: [
                    'Chiffrement AES-256 militaire',
                    'Serveurs dans 50+ pays',
                    'Kill Switch automatique',
                    'Protection DNS avancée',
                    'Split tunneling intelligent'
                ],
                benefits: [
                    'Anonymat total en ligne',
                    'Accès geo-restreint débloqué',
                    'Vitesse jusqu\'à 1 Gbps',
                    'Zero-log policy certifiée',
                    'Protection sur tous les réseaux'
                ],
                performance: 'Vitesse moyenne : 850 Mbps • Latence : < 20ms • Uptime : 99.95%'
            },
            'FIREWALL NEXT-GEN': {
                features: [
                    'Inspection paquets deep (DPI)',
                    'Machine learning intégré',
                    'Prévention intrusion (IPS)',
                    'Filtrage application intelligent',
                    'Protection DDoS intégrée'
                ],
                benefits: [
                    'Blocage menaces avant infiltration',
                    'Visibilité réseau complète',
                    'Automatisation des réponses',
                    'Scalabilité infinie',
                    'Compatible architectures cloud'
                ],
                performance: 'Débit : 10 Gbps • Latence : < 1ms • Menaces bloquées : 1M+/jour'
            }
        };
        
        // Default content if not found
        const defaultContent = {
            features: [
                'Technologie de pointe',
                'Intégration transparente',
                'Monitoring 24/7',
                'Mises à jour automatiques',
                'Interface intuitive'
            ],
            benefits: [
                'Sécurité maximale',
                'Performance optimale',
                'Facilité d\'utilisation',
                'Support technique 24/7',
                'ROI rapide'
            ],
            performance: 'Performance supérieure • Fiabilité garantie • Scalabilité illimitée'
        };
        
        return contents[title.toUpperCase()] || defaultContent;
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.currentCard = null;
    }

    setupAccordion() {
        const accordionItems = document.querySelectorAll('.defense-accordion-item');
        
        accordionItems.forEach(item => {
            const header = item.querySelector('.defense-accordion-header');
            
            header.addEventListener('click', () => {
                // Toggle current item
                const isActive = item.classList.contains('active');
                
                // Close all items
                accordionItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                
                // Open current item if it was closed
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    setupInteractions() {
        // Badge animations
        const badges = document.querySelectorAll('.defense-badge');
        badges.forEach(badge => {
            badge.addEventListener('mouseenter', () => {
                badge.style.transform = 'scale(1.1) rotate(2deg)';
            });
            
            badge.addEventListener('mouseleave', () => {
                badge.style.transform = 'scale(1) rotate(0deg)';
            });
        });

        // Progress bar animations
        const progressBars = document.querySelectorAll('.defense-progress-fill');
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            
            // Animate when visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 200);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(bar);
        });

        // Card ripple effect
        const cards = document.querySelectorAll('.defense-card-3d');
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.defense-card-button')) {
                    this.createCardRipple(e, card);
                }
            });
        });
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

    // Public methods
    refreshCounters() {
        this.countersAnimated = false;
        this.initCounters();
    }

    openModalByTitle(title) {
        const cards = document.querySelectorAll('.defense-card-3d');
        cards.forEach(card => {
            const cardTitle = card.querySelector('.defense-card-title').textContent;
            if (cardTitle.toUpperCase() === title.toUpperCase()) {
                this.openModal(card);
                return;
            }
        });
    }

    // Add new card dynamically
    addCard(cardData) {
        const grid = document.querySelector('.defense-grid-3d');
        if (!grid) return;

        const cardHTML = `
            <div class="defense-card-3d" data-aos="fade-up">
                <div class="defense-card-header">
                    <div class="defense-card-icon">${cardData.icon}</div>
                    <div class="defense-card-badges">
                        ${cardData.badges.map(badge => 
                            `<span class="defense-badge ${badge.type}">${badge.text}</span>`
                        ).join('')}
                    </div>
                </div>
                
                <h3 class="defense-card-title">${cardData.title}</h3>
                <p class="defense-card-description">${cardData.description}</p>
                
                <div class="defense-card-stats">
                    ${cardData.stats.map(stat => 
                        `<div class="defense-stat-item">
                            <div class="defense-stat-value">${stat.value}</div>
                            <div class="defense-stat-label">${stat.label}</div>
                        </div>`
                    ).join('')}
                </div>
                
                <div class="defense-progress-container">
                    <div class="defense-progress-label">
                        <span>Efficacité</span>
                        <span>${cardData.efficiency}%</span>
                    </div>
                    <div class="defense-progress-bar">
                        <div class="defense-progress-fill" style="width: ${cardData.efficiency}%"></div>
                    </div>
                </div>
                
                <button class="defense-card-button">Comment ça marche</button>
            </div>
        `;
        
        grid.insertAdjacentHTML('beforeend', cardHTML);
        
        // Setup interactions for new card
        const newCard = grid.lastElementChild;
        this.setupCardInteractions(newCard);
    }

    setupCardInteractions(card) {
        // 3D tilt effect
        card.addEventListener('mousemove', (e) => {
            this.handleCard3DTilt(e, card);
        });
        
        card.addEventListener('mouseleave', () => {
            this.resetCard3D(card);
        });
        
        // Modal button
        const button = card.querySelector('.defense-card-button');
        if (button) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.openModal(card);
            });
        }
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
`;
document.head.appendChild(style);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.defenseTechnologiesPremium = new DefenseTechnologiesPremium();
    });
} else {
    window.defenseTechnologiesPremium = new DefenseTechnologiesPremium();
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DefenseTechnologiesPremium;
}
