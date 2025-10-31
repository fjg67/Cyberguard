/**
 * ═══════════════════════════════════════════════════════════════
 * GAMIFICATION PREMIUM - ANIMATIONS & INTERACTIONS
 * ═══════════════════════════════════════════════════════════════
 * Features:
 * - Animated counters
 * - Dynamic progress bars
 * - Interactive hover effects
 * - Achievement unlock animations
 * - Particle effects
 */

class GamificationPremium {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        console.log('🎮 Gamification Premium initialized');
        
        // Add entrance animations
        this.addEntranceAnimations();
        
        // Animate counters
        this.animateCounters();
        
        // Add particle effects
        this.addParticleEffects();
        
        // Setup interactive elements
        this.setupInteractiveElements();
        
        // Animate progress bars
        this.animateProgressBars();
        
        // Add achievement unlock effects
        this.setupAchievementEffects();
    }

    addEntranceAnimations() {
        const gamificationSection = document.querySelector('.gamification-wrapper');
        if (!gamificationSection) return;

        // Add stagger animation to cards
        const cards = gamificationSection.querySelectorAll('.level-display, .xp-display, .streak-display');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 200 * index);
        });

        // Animate achievements
        const achievements = gamificationSection.querySelectorAll('.achievement-card');
        achievements.forEach((achievement, index) => {
            achievement.style.opacity = '0';
            achievement.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                achievement.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                achievement.style.opacity = '1';
                achievement.style.transform = 'scale(1)';
            }, 100 * index + 400);
        });
    }

    animateCounters() {
        const counters = document.querySelectorAll('.level-number, .streak-number, .leaderboard-score');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/[^0-9]/g, '')) || 0;
            const duration = 1500;
            const start = 0;
            const increment = target / (duration / 16);
            
            let current = start;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = this.formatNumber(target) + (counter.classList.contains('leaderboard-score') ? ' pts' : '');
                    clearInterval(timer);
                } else {
                    counter.textContent = this.formatNumber(Math.floor(current)) + (counter.classList.contains('leaderboard-score') ? ' pts' : '');
                }
            }, 16);
        });
    }

    formatNumber(num) {
        if (num >= 1000) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
        return num;
    }

    addParticleEffects() {
        const gamificationSection = document.querySelector('.gamification-wrapper');
        if (!gamificationSection) return;

        // Create particles container
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
            z-index: 1;
        `;
        gamificationSection.insertBefore(particlesContainer, gamificationSection.firstChild);

        // Create floating particles
        for (let i = 0; i < 20; i++) {
            this.createParticle(particlesContainer);
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        const size = Math.random() * 3 + 1;
        const x = Math.random() * 100;
        const duration = Math.random() * 15 + 15;
        const delay = Math.random() * 5;
        
        const colors = ['#00ff41', '#00ffff', '#00ff41', '#00ffff'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${x}%;
            bottom: -10px;
            box-shadow: 0 0 10px ${color};
            animation: floatUp ${duration}s linear ${delay}s infinite;
            opacity: 0.6;
        `;
        
        container.appendChild(particle);
        
        // Add keyframes if not already added
        if (!document.getElementById('particle-animations')) {
            const style = document.createElement('style');
            style.id = 'particle-animations';
            style.textContent = `
                @keyframes floatUp {
                    0% {
                        transform: translateY(0) translateX(0);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.6;
                    }
                    90% {
                        opacity: 0.6;
                    }
                    100% {
                        transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    setupInteractiveElements() {
        // Add ripple effect on cards
        const cards = document.querySelectorAll('.achievement-card, .level-display, .xp-display, .streak-display');
        
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                this.createRipple(e, card);
            });
        });

        // Add tilt effect on hover
        const tiltElements = document.querySelectorAll('.achievement-card, .badge-item');
        
        tiltElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transition = 'transform 0.1s ease';
            });
            
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transition = 'transform 0.3s ease';
                element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }

    createRipple(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(0, 255, 65, 0.5);
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 10;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        // Add ripple animation
        if (!document.getElementById('ripple-animation')) {
            const style = document.createElement('style');
            style.id = 'ripple-animation';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => ripple.remove(), 600);
    }

    animateProgressBars() {
        const progressBars = document.querySelectorAll('.xp-progress-fill, .challenge-progress-fill');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const targetWidth = bar.style.width;
                    bar.style.width = '0%';
                    
                    setTimeout(() => {
                        bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                        bar.style.width = targetWidth;
                    }, 100);
                    
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });
        
        progressBars.forEach(bar => observer.observe(bar));
    }

    setupAchievementEffects() {
        const achievementCards = document.querySelectorAll('.achievement-card.unlocked');
        
        achievementCards.forEach((card, index) => {
            // Add pulse animation on hover
            card.addEventListener('mouseenter', () => {
                const icon = card.querySelector('.achievement-icon');
                if (icon) {
                    icon.style.animation = 'iconPulse 0.6s ease';
                    setTimeout(() => {
                        icon.style.animation = '';
                    }, 600);
                }
            });
            
            // Add sparkle effect
            setInterval(() => {
                this.addSparkle(card);
            }, 3000 + Math.random() * 2000);
        });
    }

    addSparkle(element) {
        const sparkle = document.createElement('div');
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        sparkle.style.cssText = `
            position: absolute;
            left: ${x}%;
            top: ${y}%;
            width: 4px;
            height: 4px;
            background: #00ff41;
            border-radius: 50%;
            pointer-events: none;
            animation: sparkleEffect 1s ease-out;
            z-index: 10;
            box-shadow: 0 0 10px #00ff41;
        `;
        
        element.appendChild(sparkle);
        
        // Add sparkle animation
        if (!document.getElementById('sparkle-effect')) {
            const style = document.createElement('style');
            style.id = 'sparkle-effect';
            style.textContent = `
                @keyframes sparkleEffect {
                    0% {
                        transform: scale(0) rotate(0deg);
                        opacity: 1;
                    }
                    50% {
                        transform: scale(1.5) rotate(180deg);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(0) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => sparkle.remove(), 1000);
    }

    // Public method to trigger achievement unlock animation
    unlockAchievement(achievementElement) {
        if (!achievementElement) return;
        
        achievementElement.classList.remove('locked');
        achievementElement.classList.add('unlocked');
        
        // Create confetti effect
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                this.createConfetti(achievementElement);
            }, i * 30);
        }
        
        // Pulse animation
        achievementElement.style.animation = 'achievementUnlock 1s ease';
        setTimeout(() => {
            achievementElement.style.animation = '';
        }, 1000);
    }

    createConfetti(element) {
        const confetti = document.createElement('div');
        const colors = ['#00ff41', '#00ffff', '#00ff41', '#00ffff'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 8 + 4;
        
        confetti.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            left: 50%;
            top: 50%;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            pointer-events: none;
            z-index: 100;
            animation: confetti ${Math.random() * 2 + 1}s ease-out forwards;
        `;
        
        element.appendChild(confetti);
        
        // Add confetti animation
        if (!document.getElementById('confetti-animation')) {
            const style = document.createElement('style');
            style.id = 'confetti-animation';
            style.textContent = `
                @keyframes confetti {
                    0% {
                        transform: translate(0, 0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 + 100}px) rotate(${Math.random() * 720}deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => confetti.remove(), 2000);
    }
}

// Initialize when ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.gamificationPremium = new GamificationPremium();
    });
} else {
    window.gamificationPremium = new GamificationPremium();
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GamificationPremium;
}
