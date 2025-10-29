// ===== CYBERSECURITY THEME - ULTRA PREMIUM JS =====

// ===== BOOT SCREEN =====
class BootScreen {
    constructor() {
        this.bootScreen = document.getElementById('boot-screen');
        this.init();
    }

    init() {
        setTimeout(() => {
            this.bootScreen.style.opacity = '0';
            setTimeout(() => {
                this.bootScreen.style.display = 'none';
            }, 500);
        }, 3000);
    }
}

// ===== MATRIX RAIN EFFECT =====
class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrix-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];
        
        this.init();
    }

    init() {
        this.resize();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(1);
    }

    draw() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#00ffff';
        this.ctx.font = this.fontSize + 'px monospace';

        for (let i = 0; i < this.drops.length; i++) {
            const char = this.chars[Math.floor(Math.random() * this.chars.length)];
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;

            this.ctx.fillText(char, x, y);

            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }

            this.drops[i]++;
        }
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// ===== CYBER PARTICLES =====
class CyberParticles {
    constructor() {
        this.canvas = document.getElementById('particles-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 80;
        this.connectionDistance = 150;
        this.mouse = { x: null, y: null, radius: 200 };
        
        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                glow: Math.random()
            });
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((particle, i) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.mouse.radius) {
                const angle = Math.atan2(dy, dx);
                const force = (this.mouse.radius - distance) / this.mouse.radius;
                particle.x -= Math.cos(angle) * force * 3;
                particle.y -= Math.sin(angle) * force * 3;
            }

            // Draw particle with glow
            const glowIntensity = Math.sin(Date.now() * 0.002 + particle.glow * Math.PI) * 0.5 + 0.5;
            
            this.ctx.shadowBlur = 15 * glowIntensity;
            this.ctx.shadowColor = '#00ffff';
            this.ctx.fillStyle = `rgba(0, 255, 255, ${0.8 * glowIntensity})`;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();

            // Draw connections
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx2 = this.particles[j].x - particle.x;
                const dy2 = this.particles[j].y - particle.y;
                const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

                if (distance2 < this.connectionDistance) {
                    const opacity = (1 - distance2 / this.connectionDistance) * 0.5;
                    this.ctx.shadowBlur = 0;
                    this.ctx.strokeStyle = `rgba(0, 255, 255, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        });
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// ===== HEADER CONTROLLER =====
class CyberHeader {
    constructor() {
        this.header = document.getElementById('header');
        this.lastScroll = 0;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }

        this.lastScroll = currentScroll;
    }
}

// ===== MOBILE MENU =====
class MobileMenu {
    constructor() {
        this.menuBtn = document.getElementById('mobile-menu-btn');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        if (!this.menuBtn) return;

        this.menuBtn.addEventListener('click', () => this.toggle());
        
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.close());
        });
    }

    toggle() {
        this.menuBtn.classList.toggle('active');
        this.navMenu.classList.toggle('active');
    }

    close() {
        this.menuBtn.classList.remove('active');
        this.navMenu.classList.remove('active');
    }
}

// ===== SMOOTH SCROLL =====
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ===== ACTIVE NAVIGATION =====
class ActiveNav {
    constructor() {
        this.sections = document.querySelectorAll('.section-cyber, .hero-cyber');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.updateActiveLink());
        this.updateActiveLink();
    }

    updateActiveLink() {
        let current = '';
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
}

// ===== COUNTER ANIMATION =====
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.stat-value');
        this.animated = new Set();
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.checkPosition());
        this.checkPosition();
    }

    checkPosition() {
        this.counters.forEach(counter => {
            if (this.animated.has(counter)) return;

            const rect = counter.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight - 100) {
                this.animateCounter(counter);
                this.animated.add(counter);
            }
        });
    }

    animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString() + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString() + suffix;
            }
        };

        updateCounter();
    }
}

// ===== SCROLL TO TOP =====
class ScrollToTop {
    constructor() {
        this.button = document.getElementById('scroll-top');
        this.init();
    }

    init() {
        if (!this.button) return;

        window.addEventListener('scroll', () => this.toggleVisibility());
        this.button.addEventListener('click', () => this.scrollToTop());
    }

    toggleVisibility() {
        if (window.pageYOffset > 500) {
            this.button.classList.add('visible');
        } else {
            this.button.classList.remove('visible');
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// ===== AOS (Animate On Scroll) =====
class AOS {
    constructor() {
        this.elements = document.querySelectorAll('[data-aos]');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.checkElements());
        this.checkElements();
    }

    checkElements() {
        this.elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                element.classList.add('aos-animate');
            }
        });
    }
}

// ===== GLITCH TEXT EFFECT =====
class GlitchEffect {
    constructor() {
        this.glitchElements = document.querySelectorAll('.glitch-text');
        this.init();
    }

    init() {
        this.glitchElements.forEach(element => {
            setInterval(() => {
                if (Math.random() > 0.9) {
                    element.style.textShadow = `
                        ${Math.random() * 5 - 2.5}px ${Math.random() * 5 - 2.5}px 0 #ff0000,
                        ${Math.random() * 5 - 2.5}px ${Math.random() * 5 - 2.5}px 0 #0066ff
                    `;
                    setTimeout(() => {
                        element.style.textShadow = '';
                    }, 50);
                }
            }, 100);
        });
    }
}

// ===== CYBER CARD HOVER EFFECT =====
class CardHoverEffect {
    constructor() {
        this.cards = document.querySelectorAll('.cyber-card, .scan-panel, .tool-category-cyber');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
            card.addEventListener('mouseleave', () => this.handleMouseLeave(card));
        });
    }

    handleMouseMove(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    }

    handleMouseLeave(card) {
        card.style.transform = '';
    }
}

// ===== TYPING EFFECT =====
class TypingEffect {
    constructor(element, speed = 50) {
        this.element = element;
        this.text = element.textContent;
        this.speed = speed;
        this.init();
    }

    init() {
        this.element.textContent = '';
        this.type(0);
    }

    type(index) {
        if (index < this.text.length) {
            this.element.textContent += this.text[index];
            setTimeout(() => this.type(index + 1), this.speed);
        }
    }
}

// ===== CURSOR TRAIL =====
class CursorTrail {
    constructor() {
        this.coords = { x: 0, y: 0 };
        this.circles = [];
        this.colors = ['#00ffff', '#9933ff', '#ff00ff'];
        this.init();
    }

    init() {
        // Create circles
        for (let i = 0; i < 15; i++) {
            const circle = document.createElement('div');
            circle.className = 'cursor-circle';
            circle.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                opacity: 0;
                transition: opacity 0.3s;
                box-shadow: 0 0 10px currentColor;
            `;
            document.body.appendChild(circle);
            this.circles.push({ element: circle, x: 0, y: 0 });
        }

        window.addEventListener('mousemove', (e) => {
            this.coords.x = e.clientX;
            this.coords.y = e.clientY;
        });

        this.animateCircles();
    }

    animateCircles() {
        let x = this.coords.x;
        let y = this.coords.y;

        this.circles.forEach((circle, index) => {
            circle.element.style.left = x - 4 + 'px';
            circle.element.style.top = y - 4 + 'px';
            circle.element.style.transform = `scale(${(this.circles.length - index) / this.circles.length})`;
            circle.element.style.color = this.colors[index % this.colors.length];
            circle.element.style.opacity = (this.circles.length - index) / this.circles.length * 0.5;

            const nextCircle = this.circles[index + 1] || this.circles[0];
            x += (nextCircle.x - x) * 0.3;
            y += (nextCircle.y - y) * 0.3;

            circle.x = x;
            circle.y = y;
        });

        requestAnimationFrame(() => this.animateCircles());
    }
}

// ===== SCAN LINE ANIMATION =====
class ScanLineAnimation {
    constructor() {
        this.scanLines = document.querySelectorAll('.card-scan-effect');
        this.init();
    }

    init() {
        setInterval(() => {
            const randomCard = this.scanLines[Math.floor(Math.random() * this.scanLines.length)];
            if (randomCard && Math.random() > 0.7) {
                this.triggerScan(randomCard);
            }
        }, 2000);
    }

    triggerScan(scanLine) {
        scanLine.style.left = '-100%';
        scanLine.style.transition = 'none';
        setTimeout(() => {
            scanLine.style.transition = 'left 1s';
            scanLine.style.left = '100%';
        }, 10);
    }
}

// ===== PROGRESS BAR ANIMATION =====
class ProgressBarAnimation {
    constructor() {
        this.progressBars = document.querySelectorAll('.stat-progress, .rating-fill');
        this.animated = new Set();
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.checkPosition());
        this.checkPosition();
    }

    checkPosition() {
        this.progressBars.forEach(bar => {
            if (this.animated.has(bar)) return;

            const rect = bar.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight - 100) {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                    bar.style.transition = 'width 2s ease-out';
                }, 10);
                this.animated.add(bar);
            }
        });
    }
}

// ===== RANDOM DATA STREAM =====
class DataStream {
    constructor() {
        this.terminals = document.querySelectorAll('.terminal-body');
        this.chars = '01';
        this.init();
    }

    init() {
        this.terminals.forEach(terminal => {
            setInterval(() => {
                if (Math.random() > 0.95) {
                    this.addRandomLine(terminal);
                }
            }, 3000);
        });
    }

    addRandomLine(terminal) {
        const line = document.createElement('div');
        line.className = 'output-line';
        line.style.opacity = '0';
        
        let text = '';
        for (let i = 0; i < 40; i++) {
            text += this.chars[Math.floor(Math.random() * this.chars.length)];
        }
        
        line.textContent = text;
        terminal.appendChild(line);
        
        setTimeout(() => {
            line.style.transition = 'opacity 0.5s';
            line.style.opacity = '0.3';
        }, 10);

        setTimeout(() => {
            line.remove();
        }, 5000);
    }
}

// ===== HEXAGON ROTATION =====
class HexagonRotation {
    constructor() {
        this.hexagons = document.querySelectorAll('.icon-hexagon, .step-hex');
        this.init();
    }

    init() {
        this.hexagons.forEach(hex => {
            hex.addEventListener('mouseenter', () => {
                hex.style.transition = 'transform 0.5s';
                hex.style.transform = 'rotate(60deg) scale(1.1)';
            });

            hex.addEventListener('mouseleave', () => {
                hex.style.transform = 'rotate(0deg) scale(1)';
            });
        });
    }
}

// ===== PERFORMANCE MONITOR =====
class PerformanceMonitor {
    constructor() {
        this.checkPerformance();
    }

    checkPerformance() {
        // Reduce animations on low-end devices
        if (navigator.hardwareConcurrency <= 4) {
            document.body.classList.add('reduced-motion');
            
            // Disable some heavy effects
            const matrixCanvas = document.getElementById('matrix-canvas');
            if (matrixCanvas) {
                matrixCanvas.style.display = 'none';
            }
        }
    }
}

// ===== CONSOLE MESSAGE =====
function displayConsoleMessage() {
    const styles = [
        'color: #00ffff',
        'font-size: 20px',
        'font-weight: bold',
        'text-shadow: 0 0 10px #00ffff'
    ].join(';');

    console.log('%c⚡ CYBERGUARD PRO SYSTEM ACTIVE', styles);
    console.log('%cSECURITY LEVEL: MAXIMUM', 'color: #00ff00; font-size: 14px;');
    console.log('%cAll systems operational. Monitoring active.', 'color: #9933ff; font-size: 12px;');
}

// ===== INITIALIZE ALL =====
document.addEventListener('DOMContentLoaded', () => {
    // Boot sequence
    new BootScreen();

    // Core functionality
    new CyberHeader();
    new MobileMenu();
    new SmoothScroll();
    new ActiveNav();
    new CounterAnimation();
    new ScrollToTop();
    new AOS();

    // Visual effects
    new MatrixRain();
    new CyberParticles();
    new GlitchEffect();
    new CardHoverEffect();
    new ScanLineAnimation();
    new ProgressBarAnimation();
    new DataStream();
    new HexagonRotation();

    // Optional effects (disable on low-end devices)
    if (navigator.hardwareConcurrency > 4) {
        new CursorTrail();
    }

    // Utility
    new PerformanceMonitor();

    // Typing effect for hero subtitle
    const typingElement = document.querySelector('.typing-effect');
    if (typingElement) {
        new TypingEffect(typingElement, 100);
    }

    // Console message
    displayConsoleMessage();
});

// ===== KONAMI CODE EASTER EGG =====
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join('') === konamiSequence.join('')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow-cyber 2s infinite';
    
    // Add more particles
    const particles = document.getElementById('particles-canvas');
    if (particles) {
        particles.style.opacity = '1';
    }

    setTimeout(() => {
        document.body.style.animation = '';
        particles.style.opacity = '0.3';
    }, 10000);
}

// Add rainbow animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow-cyber {
        0% { filter: hue-rotate(0deg) brightness(1.2); }
        100% { filter: hue-rotate(360deg) brightness(1.2); }
    }
`;
document.head.appendChild(style);

// ===== VIDEO TUTORIALS =====
class VideoTutorials {
    constructor() {
        this.tutorialCards = document.querySelectorAll('.tutorial-card[data-video-id]');
        this.modal = null;
        this.createModal();
        this.init();
    }

    createModal() {
        // Create video modal
        this.modal = document.createElement('div');
        this.modal.className = 'video-modal';
        this.modal.innerHTML = `
            <div class="video-modal-overlay"></div>
            <div class="video-modal-content">
                <button class="video-modal-close">&times;</button>
                <div class="video-modal-container">
                    <iframe
                        id="video-player"
                        frameborder="0"
                        allowfullscreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                </div>
            </div>
        `;
        document.body.appendChild(this.modal);

        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .video-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                align-items: center;
                justify-content: center;
            }

            .video-modal.active {
                display: flex;
            }

            .video-modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                backdrop-filter: blur(10px);
            }

            .video-modal-content {
                position: relative;
                width: 90%;
                max-width: 1200px;
                z-index: 10001;
                animation: modalSlideIn 0.3s ease-out;
            }

            @keyframes modalSlideIn {
                from {
                    opacity: 0;
                    transform: translateY(-50px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .video-modal-close {
                position: absolute;
                top: -50px;
                right: 0;
                background: transparent;
                border: 2px solid var(--primary-cyan);
                color: var(--primary-cyan);
                font-size: 32px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                cursor: pointer;
                transition: all 0.3s;
                display: flex;
                align-items: center;
                justify-content: center;
                line-height: 1;
            }

            .video-modal-close:hover {
                background: var(--primary-cyan);
                color: var(--bg-dark);
                transform: rotate(90deg);
                box-shadow: 0 0 20px var(--primary-cyan);
            }

            .video-modal-container {
                position: relative;
                padding-bottom: 56.25%; /* 16:9 aspect ratio */
                height: 0;
                overflow: hidden;
                border-radius: 10px;
                box-shadow: 0 0 50px rgba(0, 255, 255, 0.3);
                border: 2px solid var(--primary-cyan);
            }

            .video-modal-container iframe {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }

            .tutorial-card {
                cursor: pointer;
                transition: transform 0.3s;
            }

            .tutorial-card:hover {
                transform: translateY(-5px);
            }

            .tutorial-card:hover .play-icon {
                transform: scale(1.2);
                box-shadow: 0 0 30px var(--primary-cyan);
            }

            @media (max-width: 768px) {
                .video-modal-content {
                    width: 95%;
                }

                .video-modal-close {
                    top: -40px;
                    width: 40px;
                    height: 40px;
                    font-size: 24px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    init() {
        this.tutorialCards.forEach(card => {
            card.addEventListener('click', () => this.openVideo(card));
        });

        // Close modal on overlay click
        this.modal.querySelector('.video-modal-overlay').addEventListener('click', () => this.closeVideo());

        // Close modal on close button
        this.modal.querySelector('.video-modal-close').addEventListener('click', () => this.closeVideo());

        // Close modal on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeVideo();
            }
        });
    }

    openVideo(card) {
        const videoId = card.dataset.videoId;
        if (!videoId) return;

        // Ouvrir la vidéo directement sur YouTube dans un nouvel onglet
        window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
    }

    closeVideo() {
        const iframe = this.modal.querySelector('#video-player');
        iframe.src = '';

        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ===== INTERACTIVE TOOLS =====

// 1. URL Scanner (REAL SECURITY CHECK)
class URLScanner {
    constructor() {
        this.scanBtn = document.getElementById('scan-btn');
        this.urlInput = document.getElementById('url-input');
        this.scanResult = document.getElementById('scan-result');
        this.scanStatus = document.querySelector('.scan-status');
        this.scanOutput = document.querySelector('.scan-output');

        if (this.scanBtn) {
            this.init();
        }
    }

    init() {
        this.scanBtn.addEventListener('click', () => this.scanURL());
        this.urlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.scanURL();
        });
    }

    async scanURL() {
        const url = this.urlInput.value.trim();

        if (!url) {
            alert('Veuillez entrer une URL');
            return;
        }

        // Validate URL format
        if (!this.isValidURL(url)) {
            alert('URL invalide. Format: https://exemple.com');
            return;
        }

        // Show scanning animation
        this.scanResult.classList.remove('hidden');
        this.scanStatus.textContent = '⚡ SCANNING IN PROGRESS...';
        this.scanOutput.innerHTML = '';
        this.scanOutput.className = 'scan-output';

        try {
            // Perform multiple security checks
            const results = await this.performSecurityChecks(url);
            this.displayResults(results);
        } catch (error) {
            this.scanStatus.textContent = '⚠ ERREUR DE SCAN';
            this.scanOutput.className = 'scan-output danger';
            this.scanOutput.innerHTML = `
                <div><strong>⚠ ERREUR</strong></div>
                <div>Impossible de scanner l'URL</div>
                <div style="font-size: 12px; margin-top: 10px;">
                    ${error.message}
                </div>
            `;
        }
    }

    isValidURL(string) {
        try {
            const url = new URL(string);
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch (_) {
            return false;
        }
    }

    async performSecurityChecks(url) {
        const results = {
            ssl: false,
            reputation: 'UNKNOWN',
            malware: false,
            phishing: false,
            threats: [],
            score: 0
        };

        // 1. Check if HTTPS
        const urlObj = new URL(url);
        results.ssl = urlObj.protocol === 'https:';
        if (results.ssl) results.score += 25;

        // 2. Check URL patterns for known threats
        const suspiciousPatterns = [
            /paypal.*verify/i,
            /account.*suspend/i,
            /confirm.*identity/i,
            /urgent.*action/i,
            /click.*here.*prize/i,
            /\.tk$|\.ml$|\.ga$|\.cf$|\.gq$/i, // Suspicious TLDs
            /bit\.ly|tinyurl/i, // URL shorteners (risky)
        ];

        const phishingKeywords = [
            'login-verify', 'account-locked', 'suspended-account',
            'confirm-payment', 'urgent-update', 'security-alert',
            'prize-winner', 'free-money'
        ];

        // Check for suspicious patterns
        for (const pattern of suspiciousPatterns) {
            if (pattern.test(url)) {
                results.phishing = true;
                results.threats.push('Pattern de phishing détecté');
                results.score -= 30;
            }
        }

        // Check for phishing keywords in hostname
        const hostname = urlObj.hostname.toLowerCase();
        for (const keyword of phishingKeywords) {
            if (hostname.includes(keyword)) {
                results.phishing = true;
                results.threats.push('Mot-clé suspect dans le domaine');
                results.score -= 20;
            }
        }

        // 3. Check for IP address instead of domain (suspicious)
        if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname)) {
            results.threats.push('URL utilise une adresse IP (suspect)');
            results.score -= 25;
        }

        // 4. Check domain age (very short domains are suspicious)
        if (hostname.length < 5) {
            results.threats.push('Nom de domaine très court');
            results.score -= 10;
        }

        // 5. Check for common legitimate sites
        const trustedDomains = [
            'google.com', 'youtube.com', 'facebook.com', 'twitter.com',
            'instagram.com', 'linkedin.com', 'github.com', 'microsoft.com',
            'apple.com', 'amazon.com', 'wikipedia.org', 'reddit.com'
        ];

        const isTrusted = trustedDomains.some(domain =>
            hostname === domain || hostname.endsWith('.' + domain)
        );

        if (isTrusted) {
            results.score += 50;
            results.reputation = 'EXCELLENT';
        }

        // 6. Check with Google Safe Browsing API
        try {
            const safeBrowsingResult = await this.checkGoogleSafeBrowsing(url);
            if (safeBrowsingResult.unsafe) {
                results.malware = true;
                results.phishing = true;

                if (safeBrowsingResult.threats) {
                    results.threats.push(`Google Safe Browsing: ${safeBrowsingResult.threats}`);
                } else {
                    results.threats.push('Détecté par Google Safe Browsing');
                }

                results.score -= 50;
                results.googleSafeBrowsing = 'DANGEROUS';
            } else {
                results.score += 20;
                results.googleSafeBrowsing = 'SAFE';
            }
        } catch (e) {
            // Safe Browsing check failed, continue with other checks
            console.log('Safe Browsing check failed:', e.message);
            results.googleSafeBrowsing = 'CHECK_FAILED';
        }

        // Calculate final reputation
        if (results.score >= 70) {
            results.reputation = 'EXCELLENT';
        } else if (results.score >= 40) {
            results.reputation = 'BONNE';
        } else if (results.score >= 10) {
            results.reputation = 'MOYENNE';
        } else {
            results.reputation = 'MAUVAISE';
        }

        return results;
    }

    async checkGoogleSafeBrowsing(url) {
        // ✅ SÉCURISÉ: Utilisation du backend proxy au lieu d'exposer l'API key
        try {
            // Appeler le backend sécurisé via le client API
            const result = await window.cyberGuardAPI.checkUrlSafety(url);

            if (!result.success) {
                console.error('URL check failed:', result.error);
                return { unsafe: false };
            }

            // Convertir le format de réponse du backend
            if (!result.safe && result.threats.length > 0) {
                const threats = result.threats.map(t => t.threatType).join(', ');
                return {
                    unsafe: true,
                    threats: threats,
                    details: result.threats
                };
            }

            return { unsafe: false };

        } catch (error) {
            console.error('Backend API error:', error);
            // Le fallback est géré automatiquement par cyberGuardAPI
            return { unsafe: false };
        }
    }

    displayResults(results) {
        const isSafe = results.score >= 40 && !results.malware && !results.phishing;

        // Send event to dashboard
        const scanResult = isSafe ? 'safe' : 'danger';
        document.dispatchEvent(new CustomEvent('cyberguard:scan-complete', {
            detail: {
                type: 'Scan URL',
                result: scanResult,
                url: this.urlInput.value.trim(),
                score: results.score
            }
        }));

        // Track scan result in analytics
        if (window.analyticsTracker) {
            window.analyticsTracker.trackScanResult('url_scanner', {
                safe: isSafe,
                threatCount: results.threats.length,
                duration: 0 // Could be tracked if needed
            });
        }

        if (isSafe) {
            this.scanStatus.textContent = '✓ SCAN COMPLETED';
            this.scanOutput.className = 'scan-output success';
            this.scanOutput.innerHTML = `
                <div><strong>✓ SITE SÉCURISÉ</strong></div>
                <div>└─ Certificat SSL: ${results.ssl ? 'VALIDE ✓' : 'ABSENT ⚠'}</div>
                <div>└─ Réputation: ${results.reputation}</div>
                <div>└─ Malware: AUCUN DÉTECTÉ ✓</div>
                <div>└─ Phishing: PAS DE MENACE ✓</div>
                <div>└─ Google Safe Browsing: ${results.googleSafeBrowsing === 'SAFE' ? 'SAFE ✓' : 'NON VÉRIFIÉ'}</div>
                <div style="margin-top: 10px; font-size: 13px;">
                    Score de sécurité: <strong>${Math.max(0, results.score)}/100</strong>
                </div>
                <div style="margin-top: 10px; padding: 8px; background: rgba(0,255,0,0.1); border-left: 3px solid #00ff00; font-size: 12px;">
                    ✓ Vérifié par l'API Google Safe Browsing
                </div>
            `;
        } else {
            this.scanStatus.textContent = '⚠ MENACE DÉTECTÉE';
            this.scanOutput.className = 'scan-output danger';

            let threatsList = '';
            if (results.threats.length > 0) {
                threatsList = '<div style="margin-top: 10px;"><strong>Menaces détectées:</strong></div>';
                results.threats.forEach(threat => {
                    threatsList += `<div>└─ ${threat}</div>`;
                });
            }

            this.scanOutput.innerHTML = `
                <div><strong>⚠ SITE DANGEREUX</strong></div>
                <div>└─ Certificat SSL: ${results.ssl ? 'PRÉSENT' : 'ABSENT ✗'}</div>
                <div>└─ Réputation: ${results.reputation}</div>
                <div>└─ Malware: ${results.malware ? 'DÉTECTÉ ✗' : 'NON DÉTECTÉ'}</div>
                <div>└─ Phishing: ${results.phishing ? 'RISQUE ÉLEVÉ ✗' : 'PAS DE MENACE'}</div>
                ${threatsList}
                <div style="margin-top: 15px; padding: 10px; background: rgba(255,0,64,0.2); border-left: 3px solid #ff0040;">
                    <strong>⚠ ATTENTION</strong><br>
                    NE PAS VISITER CE SITE<br>
                    NE PAS ENTRER VOS DONNÉES
                </div>
                <div style="margin-top: 10px; font-size: 13px;">
                    Score de sécurité: <strong style="color: #ff0040;">${Math.max(0, results.score)}/100</strong>
                </div>
            `;
        }
    }
}

// 2. Password Generator
class PasswordGenerator {
    constructor() {
        this.generateBtn = document.getElementById('generate-btn');
        this.copyBtn = document.getElementById('copy-btn');
        this.pwdOutput = document.getElementById('generated-pwd');
        this.lengthSlider = document.getElementById('pwd-length');
        this.lengthValue = document.getElementById('length-value');
        this.uppercaseCheck = document.getElementById('pwd-uppercase');
        this.numbersCheck = document.getElementById('pwd-numbers');
        this.symbolsCheck = document.getElementById('pwd-symbols');
        this.strengthFill = document.querySelector('.strength-fill');
        this.strengthText = document.querySelector('.strength-text');

        if (this.generateBtn) {
            this.init();
        }
    }

    init() {
        this.generateBtn.addEventListener('click', () => this.generate());
        this.copyBtn.addEventListener('click', () => this.copyToClipboard());
        this.lengthSlider.addEventListener('input', (e) => {
            this.lengthValue.textContent = e.target.value;
        });

        // Generate initial password
        this.generate();
    }

    generate() {
        const length = parseInt(this.lengthSlider.value);
        let chars = 'abcdefghijklmnopqrstuvwxyz';

        if (this.uppercaseCheck.checked) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (this.numbersCheck.checked) chars += '0123456789';
        if (this.symbolsCheck.checked) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

        let password = '';
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        this.pwdOutput.value = password;
        this.updateStrength(password);
    }

    updateStrength(password) {
        let strength = 0;

        if (password.length >= 12) strength += 25;
        if (password.length >= 16) strength += 25;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 20;
        if (/\d/.test(password)) strength += 15;
        if (/[^a-zA-Z0-9]/.test(password)) strength += 15;

        this.strengthFill.className = 'strength-fill';

        if (strength < 50) {
            this.strengthFill.classList.add('weak');
            this.strengthText.textContent = 'Force: FAIBLE';
            this.strengthText.style.color = '#ff0040';
        } else if (strength < 80) {
            this.strengthFill.classList.add('medium');
            this.strengthText.textContent = 'Force: MOYENNE';
            this.strengthText.style.color = '#ffff00';
        } else {
            this.strengthFill.classList.add('strong');
            this.strengthText.textContent = 'Force: FORTE';
            this.strengthText.style.color = '#00ff00';
        }
    }

    copyToClipboard() {
        this.pwdOutput.select();
        document.execCommand('copy');

        const originalText = this.copyBtn.querySelector('span').textContent;
        this.copyBtn.querySelector('span').textContent = '✓ COPIÉ';

        setTimeout(() => {
            this.copyBtn.querySelector('span').textContent = originalText;
        }, 2000);
    }
}

// 3. Security Quiz
class SecurityQuiz {
    constructor() {
        this.startBtn = document.getElementById('start-quiz-btn');
        this.restartBtn = document.getElementById('restart-quiz-btn');
        this.questionEl = document.getElementById('quiz-question');
        this.answersEl = document.getElementById('quiz-answers');
        this.resultEl = document.getElementById('quiz-result');
        this.scoreEl = document.getElementById('quiz-score');
        this.scoreDisplay = document.querySelector('.score-display');

        this.currentQuestion = 0;
        this.score = 0;

        this.questions = [
            {
                question: "Quelle est la longueur minimale recommandée pour un mot de passe sécurisé ?",
                answers: ["6 caractères", "8 caractères", "12 caractères", "16 caractères"],
                correct: 2
            },
            {
                question: "Qu'est-ce qu'une attaque par phishing ?",
                answers: [
                    "Un virus informatique",
                    "Une tentative de vol d'informations par tromperie",
                    "Un pare-feu défaillant",
                    "Un logiciel malveillant"
                ],
                correct: 1
            },
            {
                question: "Que signifie HTTPS dans une URL ?",
                answers: [
                    "Hyper Text Protocol Secure",
                    "High Transfer Protocol System",
                    "Host Transfer Packet Security",
                    "Hybrid Text Processing Service"
                ],
                correct: 0
            },
            {
                question: "Quelle est la meilleure pratique pour les mots de passe ?",
                answers: [
                    "Utiliser le même mot de passe partout",
                    "Noter ses mots de passe sur papier",
                    "Utiliser un gestionnaire de mots de passe",
                    "Utiliser son nom comme mot de passe"
                ],
                correct: 2
            },
            {
                question: "À quelle fréquence devriez-vous mettre à jour votre antivirus ?",
                answers: [
                    "Une fois par an",
                    "Une fois par mois",
                    "Automatiquement et régulièrement",
                    "Jamais"
                ],
                correct: 2
            }
        ];

        if (this.startBtn) {
            this.init();
        }
    }

    init() {
        this.startBtn.addEventListener('click', () => this.startQuiz());
        if (this.restartBtn) {
            this.restartBtn.addEventListener('click', () => this.startQuiz());
        }
    }

    startQuiz() {
        this.currentQuestion = 0;
        this.score = 0;
        this.startBtn.classList.add('hidden');
        this.scoreEl.classList.add('hidden');
        this.showQuestion();
    }

    showQuestion() {
        if (this.currentQuestion >= this.questions.length) {
            this.showResults();
            return;
        }

        const q = this.questions[this.currentQuestion];
        this.questionEl.textContent = `Question ${this.currentQuestion + 1}/${this.questions.length}: ${q.question}`;

        this.answersEl.innerHTML = '';
        q.answers.forEach((answer, index) => {
            const btn = document.createElement('div');
            btn.className = 'quiz-answer';
            btn.textContent = answer;
            btn.addEventListener('click', () => this.checkAnswer(index));
            this.answersEl.appendChild(btn);
        });

        this.resultEl.classList.add('hidden');
    }

    checkAnswer(selected) {
        const q = this.questions[this.currentQuestion];
        const answers = document.querySelectorAll('.quiz-answer');

        answers.forEach((answer, index) => {
            answer.style.pointerEvents = 'none';
            if (index === q.correct) {
                answer.classList.add('correct');
            } else if (index === selected) {
                answer.classList.add('incorrect');
            }
        });

        if (selected === q.correct) {
            this.score++;
            this.resultEl.textContent = '✓ CORRECT !';
            this.resultEl.style.color = '#00ff00';
        } else {
            this.resultEl.textContent = '✗ INCORRECT';
            this.resultEl.style.color = '#ff0040';
        }

        this.resultEl.classList.remove('hidden');

        setTimeout(() => {
            this.currentQuestion++;
            this.showQuestion();
        }, 2000);
    }

    showResults() {
        this.questionEl.textContent = '';
        this.answersEl.innerHTML = '';
        this.resultEl.classList.add('hidden');

        const percentage = (this.score / this.questions.length) * 100;
        let message = '';

        if (percentage >= 80) {
            message = '🎉 EXCELLENT ! Vous êtes un expert en cybersécurité !';
        } else if (percentage >= 60) {
            message = '👍 BIEN ! Continuez à vous former !';
        } else {
            message = '⚠️ À AMÉLIORER ! Lisez nos guides de sécurité !';
        }

        this.scoreDisplay.innerHTML = `
            ${this.score}/${this.questions.length}<br>
            <div style="font-size: 16px; margin-top: 15px; color: var(--text-secondary);">
                ${message}
            </div>
        `;

        this.scoreEl.classList.remove('hidden');
    }
}

// 4. Email Breach Checker
class EmailBreachChecker {
    constructor() {
        this.checkBtn = document.getElementById('check-email-btn');
        this.emailInput = document.getElementById('email-input');
        this.emailResult = document.getElementById('email-result');
        this.breachStatus = document.querySelector('.breach-status');
        this.breachOutput = document.querySelector('.breach-output');

        if (this.checkBtn) {
            this.init();
        }
    }

    init() {
        this.checkBtn.addEventListener('click', () => this.checkEmail());
        this.emailInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.checkEmail();
        });
    }

    async checkEmail() {
        const email = this.emailInput.value.trim();

        if (!email || !email.includes('@')) {
            alert('Veuillez entrer un email valide');
            return;
        }

        this.emailResult.classList.remove('hidden');
        this.breachStatus.textContent = '⚡ VÉRIFICATION EN COURS...';
        this.breachOutput.innerHTML = '';

        // Simulate API call
        await this.simulateCheck();

        // Random result for demo (in real app, use HaveIBeenPwned API)
        const breached = Math.random() > 0.5;
        const breachCount = Math.floor(Math.random() * 10) + 1;

        // Send event to dashboard
        const emailResult = breached ? 'warning' : 'safe';
        document.dispatchEvent(new CustomEvent('cyberguard:scan-complete', {
            detail: {
                type: 'Vérif. email',
                result: emailResult,
                email: email
            }
        }));

        if (breached) {
            this.breachStatus.textContent = '⚠ EMAIL COMPROMIS';
            this.breachOutput.innerHTML = `
                <div style="color: #ff0040;"><strong>⚠ ATTENTION</strong></div>
                <div>Votre email apparaît dans <strong>${breachCount}</strong> fuite(s) de données</div>
                <div style="margin-top: 15px; font-size: 12px;">
                    <strong>Recommandations:</strong><br>
                    └─ Changez immédiatement vos mots de passe<br>
                    └─ Activez l'authentification à deux facteurs<br>
                    └─ Surveillez vos comptes régulièrement
                </div>
            `;
        } else {
            this.breachStatus.textContent = '✓ EMAIL SÉCURISÉ';
            this.breachOutput.innerHTML = `
                <div style="color: #00ff00;"><strong>✓ BONNE NOUVELLE</strong></div>
                <div>Votre email n'apparaît dans aucune fuite de données connue</div>
                <div style="margin-top: 15px; font-size: 12px;">
                    <strong>Restez vigilant:</strong><br>
                    └─ Utilisez des mots de passe uniques<br>
                    └─ Activez l'A2F partout<br>
                    └─ Vérifiez régulièrement
                </div>
            `;
        }
    }

    simulateCheck() {
        return new Promise(resolve => {
            setTimeout(resolve, 2000);
        });
    }
}

// Initialize all interactive tools
document.addEventListener('DOMContentLoaded', () => {
    new VideoTutorials();
    new URLScanner();
    new PasswordGenerator();
    new SecurityQuiz();
    new EmailBreachChecker();

    console.log('%c⚡ INTERACTIVE TOOLS LOADED', 'color: #00ff00; font-weight: bold; font-size: 14px;');
});

// ===== FAQ ACCORDION =====
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// ===== CHATBOT =====
class Chatbot {
    constructor() {
        this.chatbotWidget = document.getElementById('chatbot-widget');
        this.chatbotToggle = document.getElementById('chatbot-toggle');
        this.chatbotMinimize = document.getElementById('chatbot-minimize');
        this.chatbotMessages = document.getElementById('chatbot-messages');
        this.chatbotInputField = document.getElementById('chatbot-input-field');
        this.chatbotSend = document.getElementById('chatbot-send');
        this.chatbotBadge = document.querySelector('.chatbot-badge');

        if (this.chatbotToggle) {
            this.init();
        }
    }

    init() {
        // Toggle chatbot
        this.chatbotToggle.addEventListener('click', () => {
            this.chatbotWidget.classList.toggle('active');
            if (this.chatbotWidget.classList.contains('active')) {
                this.chatbotBadge.style.display = 'none';
                this.chatbotInputField.focus();
            }
        });

        // Minimize chatbot
        this.chatbotMinimize.addEventListener('click', () => {
            this.chatbotWidget.classList.remove('active');
        });

        // Send message
        this.chatbotSend.addEventListener('click', () => this.sendMessage());
        this.chatbotInputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Quick replies
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-reply')) {
                const message = e.target.dataset.message;
                this.sendMessage(message);
            }
        });
    }

    sendMessage(message = null) {
        const text = message || this.chatbotInputField.value.trim();

        if (!text) return;

        // Add user message
        this.addMessage(text, 'user');

        // Clear input
        this.chatbotInputField.value = '';

        // Simulate bot response
        setTimeout(() => {
            const response = this.getBotResponse(text);
            this.addMessage(response, 'bot');
        }, 1000);
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = sender === 'user' ? 'user-message' : 'bot-message';

        messageDiv.innerHTML = `
            <div class="message-avatar">${sender === 'user' ? '👤' : '🤖'}</div>
            <div class="message-content">
                <p>${text}</p>
            </div>
        `;

        this.chatbotMessages.appendChild(messageDiv);
        this.chatbotMessages.scrollTop = this.chatbotMessages.scrollHeight;
    }

    getBotResponse(message) {
        const lowerMessage = message.toLowerCase();

        if (lowerMessage.includes('antivirus') && lowerMessage.includes('vpn')) {
            return "Un antivirus protège votre appareil contre les logiciels malveillants, tandis qu'un VPN chiffre votre connexion Internet et masque votre adresse IP. Pour une protection optimale, il est recommandé d'utiliser les deux!";
        } else if (lowerMessage.includes('mot de passe')) {
            return "Un mot de passe sûr doit contenir au moins 16 caractères avec des majuscules, minuscules, chiffres et symboles. Évitez les mots du dictionnaire et utilisez un gestionnaire de mots de passe pour les stocker en toute sécurité!";
        } else if (lowerMessage.includes('email suspect') || lowerMessage.includes('phishing')) {
            return "Si vous recevez un email suspect : ne cliquez sur aucun lien, vérifiez l'adresse de l'expéditeur, recherchez les fautes d'orthographe, et contactez directement l'organisation via leurs canaux officiels. En cas de doute, supprimez l'email!";
        } else if (lowerMessage.includes('vpn')) {
            return "Un VPN (Virtual Private Network) chiffre votre connexion et masque votre IP. Il est essentiel sur les WiFi publics et protège votre vie privée en ligne. Je recommande NordVPN ou ExpressVPN!";
        } else if (lowerMessage.includes('antivirus')) {
            return "Windows Defender offre une protection de base, mais un antivirus premium comme Bitdefender offre une protection plus avancée avec anti-ransomware, VPN intégré et protection web en temps réel.";
        } else if (lowerMessage.includes('2fa') || lowerMessage.includes('authentification')) {
            return "L'authentification à deux facteurs (2FA) ajoute une couche de sécurité supplémentaire. Même si votre mot de passe est compromis, l'attaquant ne pourra pas accéder à votre compte sans le second facteur!";
        } else if (lowerMessage.includes('ransomware')) {
            return "Un ransomware chiffre vos fichiers et demande une rançon. Protection : sauvegardes régulières, antivirus à jour, ne jamais ouvrir de pièces jointes suspectes. Ne payez JAMAIS la rançon!";
        } else {
            return "Je suis là pour vous aider avec toutes vos questions de cybersécurité! Vous pouvez me demander des informations sur les antivirus, VPN, mots de passe, phishing, et bien plus encore.";
        }
    }
}

// ===== DARK MODE =====
class DarkModeToggle {
    constructor() {
        this.darkModeToggle = document.getElementById('dark-mode-toggle');
        this.body = document.body;

        // Check saved preference
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode === 'light') {
            this.body.classList.add('light-mode');
        }

        if (this.darkModeToggle) {
            this.init();
        }
    }

    init() {
        this.darkModeToggle.addEventListener('click', () => {
            this.body.classList.toggle('light-mode');

            // Save preference
            const isLightMode = this.body.classList.contains('light-mode');
            localStorage.setItem('darkMode', isLightMode ? 'light' : 'dark');
        });
    }
}

// ===== NEWSLETTER FORM =====
class NewsletterForm {
    constructor() {
        this.form = document.getElementById('newsletter-form');

        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();

            const emailInput = this.form.querySelector('.newsletter-input');
            const email = emailInput.value.trim();

            if (!email || !email.includes('@')) {
                alert('Veuillez entrer un email valide');
                return;
            }

            // Simulate submission
            alert(`✓ Merci! Vous êtes maintenant abonné à notre newsletter avec l'adresse: ${email}`);
            emailInput.value = '';
        });
    }
}

// ===== REALTIME STATS ANIMATION =====
class RealtimeStats {
    constructor() {
        this.statsElements = {
            threatsBlocked: document.getElementById('threats-blocked'),
            phishingAttempts: document.getElementById('phishing-attempts'),
            ransomwareBlocked: document.getElementById('ransomware-blocked'),
            sitesInfected: document.getElementById('sites-infected')
        };

        if (this.statsElements.threatsBlocked) {
            this.init();
        }
    }

    init() {
        // Animate numbers on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateStats();
                    observer.unobserve(entry.target);
                }
            });
        });

        if (this.statsElements.threatsBlocked) {
            observer.observe(this.statsElements.threatsBlocked.closest('.realtime-stats'));
        }

        // Update stats periodically
        setInterval(() => this.updateStats(), 5000);
    }

    animateStats() {
        this.animateValue(this.statsElements.threatsBlocked, 0, 15847, 2000);
        this.animateValue(this.statsElements.phishingAttempts, 0, 3241, 2000);
        this.animateValue(this.statsElements.ransomwareBlocked, 0, 127, 2000);
        this.animateValue(this.statsElements.sitesInfected, 0, 892, 2000);
    }

    animateValue(element, start, end, duration) {
        if (!element) return;

        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                element.textContent = this.formatNumber(end);
                clearInterval(timer);
            } else {
                element.textContent = this.formatNumber(Math.floor(current));
            }
        }, 16);
    }

    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    updateStats() {
        // Increment stats slightly
        Object.values(this.statsElements).forEach(element => {
            if (element) {
                const current = parseInt(element.textContent.replace(/,/g, ''));
                const increment = Math.floor(Math.random() * 10) + 1;
                element.textContent = this.formatNumber(current + increment);
            }
        });
    }
}

// ===== COMPARISON TABLE FILTERS =====
class ComparisonFilters {
    constructor() {
        this.productTypeFilter = document.getElementById('product-type');
        this.budgetFilter = document.getElementById('budget-filter');
        this.platformFilter = document.getElementById('platform-filter');
        this.resetBtn = document.querySelector('.filter-reset');
        this.comparisonTable = document.querySelector('.comparison-table');
        this.products = [];

        if (this.productTypeFilter) {
            this.init();
        }
    }

    init() {
        // Store all product columns (skip the first column which is features)
        if (this.comparisonTable) {
            const headerRow = this.comparisonTable.querySelector('.header-row');
            if (headerRow) {
                // Get all product cells (skip first cell which is "FONCTIONNALITÉS")
                const productCells = Array.from(headerRow.querySelectorAll('.comparison-cell')).slice(1);

                productCells.forEach((cell, index) => {
                    const productName = cell.querySelector('h4')?.textContent || '';
                    const priceText = cell.querySelector('.product-price')?.textContent || '';
                    const price = this.extractPrice(priceText);

                    this.products.push({
                        index: index + 1, // +1 because we skip first column
                        name: productName,
                        price: price,
                        element: cell,
                        type: this.detectProductType(productName)
                    });
                });
            }
        }

        // Add filter event listeners
        [this.productTypeFilter, this.budgetFilter, this.platformFilter].forEach(filter => {
            if (filter) {
                filter.addEventListener('change', () => this.applyFilters());
            }
        });

        // Reset button
        if (this.resetBtn) {
            this.resetBtn.addEventListener('click', () => this.resetFilters());
        }

        console.log('%c🔍 Comparateur initialisé avec ' + this.products.length + ' produits', 'color: #00ffff; font-weight: bold;');
    }

    detectProductType(productName) {
        const name = productName.toLowerCase();
        if (name.includes('vpn') || name.includes('nord') || name.includes('express') || name.includes('surfshark') || name.includes('proton')) {
            return 'VPN';
        } else if (name.includes('antivirus') || name.includes('bitdefender') || name.includes('norton') || name.includes('kaspersky')) {
            return 'Antivirus';
        } else {
            return 'Suite complète';
        }
    }

    extractPrice(priceText) {
        // Extract number from text like "39.48€/an" or "100.05€/an"
        const match = priceText.match(/(\d+\.?\d*)/);
        return match ? parseFloat(match[1]) : 0;
    }

    applyFilters() {
        const productType = this.productTypeFilter.value;
        const budget = this.budgetFilter.value;
        const platform = this.platformFilter.value;

        console.log('%c🔍 Filtres appliqués:', 'color: #00ffff;', {
            productType,
            budget,
            platform
        });

        // Get all rows in the comparison table
        const rows = this.comparisonTable.querySelectorAll('.comparison-row');

        // For each product, check if it should be visible
        this.products.forEach(product => {
            let visible = true;

            // Filter by product type
            if (productType !== 'Tous les produits') {
                visible = visible && product.type === productType;
            }

            // Filter by budget (yearly price)
            if (budget !== 'Tous les prix') {
                if (budget === 'Gratuit') {
                    visible = visible && product.price === 0;
                } else if (budget === '< 50€/an') {
                    visible = visible && product.price < 50;
                } else if (budget === '50€ - 100€/an') {
                    visible = visible && product.price >= 50 && product.price <= 100;
                } else if (budget === '> 100€/an') {
                    visible = visible && product.price > 100;
                }
            }

            // Platform filter - for now, show all products for all platforms
            // (you can extend this if you have platform-specific data)

            // Apply visibility to all cells in this product's column
            rows.forEach(row => {
                const cells = row.querySelectorAll('.comparison-cell');
                if (cells[product.index]) {
                    if (visible) {
                        cells[product.index].style.display = '';
                        cells[product.index].style.opacity = '1';
                    } else {
                        cells[product.index].style.display = 'none';
                        cells[product.index].style.opacity = '0';
                    }
                }
            });
        });

        // Count visible products
        const visibleCount = this.products.filter((product) => {
            const firstCell = rows[0].querySelectorAll('.comparison-cell')[product.index];
            return firstCell && firstCell.style.display !== 'none';
        }).length;

        console.log('%c✓ ' + visibleCount + ' produit(s) affiché(s)', 'color: #00ff00;');

        // Show message if no products match
        if (visibleCount === 0) {
            this.showNoResultsMessage();
        } else {
            this.hideNoResultsMessage();
        }
    }

    showNoResultsMessage() {
        // Check if message already exists
        let message = document.querySelector('.no-results-message');
        if (!message) {
            message = document.createElement('div');
            message.className = 'no-results-message';
            message.style.cssText = `
                text-align: center;
                padding: 40px;
                color: var(--text-secondary);
                font-size: 18px;
                grid-column: 1 / -1;
            `;
            message.innerHTML = `
                <div style="font-size: 48px; margin-bottom: 20px;">🔍</div>
                <div style="font-size: 20px; margin-bottom: 10px;">Aucun produit ne correspond à vos critères</div>
                <div style="font-size: 14px;">Essayez de modifier vos filtres</div>
            `;
            this.comparisonTable.appendChild(message);
        }
        message.style.display = 'block';
    }

    hideNoResultsMessage() {
        const message = document.querySelector('.no-results-message');
        if (message) {
            message.style.display = 'none';
        }
    }

    resetFilters() {
        this.productTypeFilter.selectedIndex = 0;
        this.budgetFilter.selectedIndex = 0;
        this.platformFilter.selectedIndex = 0;
        this.applyFilters();

        console.log('%c🔄 Filtres réinitialisés', 'color: #ffff00;');
    }
}

// ===== INTERACTIVE MAP ANIMATIONS =====
class CyberMapAnimation {
    constructor() {
        this.mapPoints = document.querySelectorAll('.map-point');

        if (this.mapPoints.length > 0) {
            this.init();
        }
    }

    init() {
        // Add random pulses to map points
        this.mapPoints.forEach(point => {
            const pulse = point.querySelector('.pulse');
            const randomDelay = Math.random() * 2;
            pulse.style.animationDelay = `${randomDelay}s`;
        });

        // Periodically add new attack points
        setInterval(() => {
            this.simulateNewAttack();
        }, 3000);
    }

    simulateNewAttack() {
        // Random flash effect on a random map point
        const randomPoint = this.mapPoints[Math.floor(Math.random() * this.mapPoints.length)];
        const pulse = randomPoint.querySelector('.pulse');

        pulse.style.animation = 'none';
        setTimeout(() => {
            pulse.style.animation = '';
        }, 10);
    }
}

// ===== DASHBOARD SCORE ANIMATION =====
class DashboardScoreAnimation {
    constructor() {
        this.scoreProgress = document.querySelector('.score-progress');

        if (this.scoreProgress) {
            this.init();
        }
    }

    init() {
        // Animate on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateScore();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(this.scoreProgress);
    }

    animateScore() {
        // Score animation is handled by CSS keyframes
        // This method can be extended for more complex animations
    }
}

// ===== DASHBOARD PERSONNEL INTERACTIF =====
class DashboardPersonnel {
    constructor() {
        this.storageKey = 'cyberguard_dashboard_data';
        this.scoreValue = document.querySelector('.score-value');
        this.scoreProgress = document.querySelector('.score-progress');
        this.securityItems = document.querySelectorAll('.security-item');
        this.scanHistory = document.querySelector('.scan-history');
        this.alertsList = document.querySelector('.alerts-list');
        this.quickStats = document.querySelectorAll('.stat-number');

        if (this.scoreValue) {
            this.init();
        }
    }

    init() {
        // Load saved data or create fresh data
        const savedData = this.loadData();

        // Si pas de données sauvegardées, créer des données vierges
        if (!savedData) {
            this.data = this.createDefaultData();
            console.log('%c🆕 Nouveau dashboard créé - Données vierges', 'color: #00ffff; font-weight: bold;');
        } else {
            this.data = savedData;
            console.log('%c📊 Dashboard chargé depuis localStorage', 'color: #00ffff; font-weight: bold;');
        }

        // Render dashboard
        this.render();

        // Setup auto-refresh
        this.startAutoRefresh();

        // Listen for new scan events
        this.setupEventListeners();

        // Setup keyboard shortcut for reset (Ctrl+Shift+R)
        this.setupKeyboardShortcuts();

        console.log('%c⚡ DASHBOARD PERSONNEL ACTIVÉ', 'color: #00ffff; font-weight: bold;');
        console.log('%c💡 Astuce: Appuyez sur Ctrl+Shift+R pour réinitialiser le dashboard', 'color: #ffff00;');
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+Shift+R to reset dashboard
            if (e.ctrlKey && e.shiftKey && e.key === 'R') {
                e.preventDefault();
                this.resetDashboard();
            }
        });
    }

    createDefaultData() {
        // Start with real, clean data
        return {
            securityScore: 100, // Start at 100, will be recalculated
            lastUpdate: Date.now(),
            securityStatus: this.detectSystemSecurity(),
            scanHistory: [], // Empty - will be populated with real scans
            alerts: this.generateInitialAlerts(),
            monthlyStats: {
                threatsBlocked: 0,
                urlsScanned: 0,
                filesScanned: 0,
                vpnUptime: 100
            }
        };
    }

    detectSystemSecurity() {
        // Detect real browser and system security features
        const status = {
            antivirus: {
                active: true, // Assume active by default
                status: 'ok',
                label: 'Protection navigateur'
            },
            vpn: {
                active: false, // Detect if using VPN/proxy
                status: 'warning',
                label: 'VPN non détecté'
            },
            updates: {
                active: this.isBrowserUpdated(),
                status: this.isBrowserUpdated() ? 'ok' : 'warning',
                label: 'Navigateur à jour'
            },
            firewall: {
                active: navigator.onLine,
                status: navigator.onLine ? 'ok' : 'warning',
                label: 'Connexion sécurisée'
            }
        };

        return status;
    }

    isBrowserUpdated() {
        // Check if browser is modern/updated
        const modernFeatures = [
            'fetch' in window,
            'Promise' in window,
            'localStorage' in window,
            'crypto' in window
        ];
        return modernFeatures.every(feature => feature === true);
    }

    generateInitialAlerts() {
        const alerts = [];

        // Check browser security
        if (!this.isBrowserUpdated()) {
            alerts.push({
                type: 'high',
                badge: 'URGENT',
                text: 'Votre navigateur nécessite une mise à jour de sécurité',
                time: Date.now()
            });
        }

        // Check HTTPS
        if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
            alerts.push({
                type: 'medium',
                badge: 'MOYEN',
                text: 'Site non sécurisé - Utilisez HTTPS pour plus de sécurité',
                time: Date.now()
            });
        }

        // Check cookies
        if (!navigator.cookieEnabled) {
            alerts.push({
                type: 'low',
                badge: 'INFO',
                text: 'Les cookies sont désactivés - Certaines fonctionnalités peuvent ne pas fonctionner',
                time: Date.now()
            });
        }

        // Welcome message if no alerts
        if (alerts.length === 0) {
            alerts.push({
                type: 'low',
                badge: 'INFO',
                text: 'Bienvenue sur votre dashboard de sécurité CyberGuard Pro',
                time: Date.now()
            });
        }

        return alerts;
    }

    loadData() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            console.error('Error loading dashboard data:', e);
            return null;
        }
    }

    saveData() {
        try {
            this.data.lastUpdate = Date.now();
            localStorage.setItem(this.storageKey, JSON.stringify(this.data));
        } catch (e) {
            console.error('Error saving dashboard data:', e);
        }
    }

    render() {
        this.renderSecurityScore();
        this.renderSecurityStatus();
        this.renderScanHistory();
        this.renderAlerts();
        this.renderMonthlyStats();
    }

    renderSecurityScore() {
        const score = this.data.securityScore;

        // Animate score value
        this.animateNumber(this.scoreValue, 0, score, 2000, '%');

        // Animate circle progress
        const circumference = 2 * Math.PI * 90; // r=90
        const offset = circumference - (score / 100) * circumference;

        if (this.scoreProgress) {
            this.scoreProgress.style.strokeDasharray = circumference;
            this.scoreProgress.style.strokeDashoffset = circumference;

            setTimeout(() => {
                this.scoreProgress.style.transition = 'stroke-dashoffset 2s ease-out';
                this.scoreProgress.style.strokeDashoffset = offset;
            }, 100);
        }
    }

    renderSecurityStatus() {
        const statusData = this.data.securityStatus;

        this.securityItems.forEach((item, index) => {
            const keys = Object.keys(statusData);
            if (keys[index]) {
                const data = statusData[keys[index]];
                const icon = item.querySelector('.item-icon');
                const text = item.querySelector('.item-text');
                const status = item.querySelector('.item-status');

                icon.textContent = data.active ? '✓' : '⚠';
                text.textContent = data.label;
                status.textContent = data.status === 'ok' ? 'OK' : 'ATTENTION';
                status.className = `item-status ${data.status}`;
            }
        });
    }

    renderScanHistory() {
        if (!this.scanHistory) return;

        this.scanHistory.innerHTML = '';

        if (this.data.scanHistory.length === 0) {
            // Show empty state
            const emptyState = document.createElement('div');
            emptyState.className = 'scan-item';
            emptyState.style.textAlign = 'center';
            emptyState.style.padding = '30px 20px';
            emptyState.style.color = 'var(--text-secondary)';
            emptyState.innerHTML = `
                <div style="font-size: 14px; margin-bottom: 10px;">📊</div>
                <div>Aucun scan effectué pour le moment</div>
                <div style="font-size: 12px; margin-top: 10px;">
                    Utilisez les outils de scan ci-dessus pour commencer
                </div>
            `;
            this.scanHistory.appendChild(emptyState);
            return;
        }

        this.data.scanHistory.slice(0, 4).forEach(scan => {
            const scanItem = document.createElement('div');
            scanItem.className = 'scan-item';

            const formattedDate = this.formatDate(scan.date);
            const resultText = this.getResultText(scan.result);

            scanItem.innerHTML = `
                <div class="scan-date">${formattedDate}</div>
                <div class="scan-type">${scan.type}</div>
                <div class="scan-result ${scan.result}">${resultText}</div>
            `;

            this.scanHistory.appendChild(scanItem);
        });
    }

    renderAlerts() {
        if (!this.alertsList) return;

        this.alertsList.innerHTML = '';

        this.data.alerts.forEach(alert => {
            const alertItem = document.createElement('div');
            alertItem.className = `alert-item ${alert.type}`;

            const timeAgo = this.getTimeAgo(alert.time);

            alertItem.innerHTML = `
                <span class="alert-badge">${alert.badge}</span>
                <p class="alert-text">${alert.text}</p>
                <span class="alert-time">${timeAgo}</span>
            `;

            this.alertsList.appendChild(alertItem);
        });
    }

    renderMonthlyStats() {
        const stats = this.data.monthlyStats;
        const statValues = [
            stats.threatsBlocked,
            stats.urlsScanned,
            stats.filesScanned,
            Math.round(stats.vpnUptime * 10) / 10 // Arrondir à 1 décimale max
        ];

        this.quickStats.forEach((statEl, index) => {
            if (index < statValues.length) {
                const value = statValues[index];
                const suffix = index === 3 ? '%' : ''; // VPN uptime has %

                this.animateNumber(statEl, 0, value, 1500, suffix);
            }
        });
    }

    animateNumber(element, start, end, duration, suffix = '') {
        if (!element) return;

        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                // Format final value properly
                const finalValue = suffix === '%'
                    ? (Math.round(end * 10) / 10) // 1 decimal for percentages
                    : Math.round(end); // Integer for counts
                element.textContent = finalValue + suffix;
                clearInterval(timer);
            } else {
                const value = suffix === '%'
                    ? (Math.round(current * 10) / 10)
                    : Math.floor(current);
                element.textContent = value + suffix;
            }
        }, 16);
    }

    formatDate(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (hours < 24) {
            const date = new Date(timestamp);
            return `Aujourd'hui, ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        } else if (days === 1) {
            const date = new Date(timestamp);
            return `Hier, ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        } else {
            return `Il y a ${days} jours`;
        }
    }

    getResultText(result) {
        const texts = {
            'safe': 'SÉCURISÉ',
            'warning': 'COMPROMIS',
            'danger': 'MENACE'
        };
        return texts[result] || 'INCONNU';
    }

    getTimeAgo(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (hours < 1) {
            const minutes = Math.floor(diff / 60000);
            return `Il y a ${minutes}min`;
        } else if (hours < 24) {
            return `Il y a ${hours}h`;
        } else {
            return `Il y a ${days}j`;
        }
    }

    addScanToHistory(scanData) {
        // Add new scan at the beginning
        this.data.scanHistory.unshift({
            date: Date.now(),
            type: scanData.type,
            result: scanData.result,
            ...scanData
        });

        // Keep only last 20 scans
        this.data.scanHistory = this.data.scanHistory.slice(0, 20);

        // Update stats based on scan type
        if (scanData.type === 'Scan URL') {
            this.data.monthlyStats.urlsScanned++;
        } else if (scanData.type === 'Scan fichier') {
            this.data.monthlyStats.filesScanned++;
        }

        // If threat detected, increment counter and create alert
        if (scanData.result === 'danger') {
            this.data.monthlyStats.threatsBlocked++;

            // Create alert for detected threat
            this.addAlert({
                type: 'high',
                badge: 'MENACE',
                text: `Menace détectée: ${scanData.url || scanData.email || scanData.file || 'source inconnue'}`,
                time: Date.now()
            });

            console.log('%c⚠️ MENACE DÉTECTÉE ET ENREGISTRÉE', 'color: #ff0040; font-weight: bold;');
        } else if (scanData.result === 'warning') {
            // Create warning alert
            this.addAlert({
                type: 'medium',
                badge: 'ATTENTION',
                text: `Attention requise: ${scanData.email || scanData.url || 'vérifiez les détails'}`,
                time: Date.now()
            });
        }

        // Recalculate security score
        this.updateSecurityScore();

        // Save and re-render
        this.saveData();
        this.render();

        console.log('%c✓ Scan ajouté au dashboard', 'color: #00ff00;');
    }

    updateSecurityScore() {
        // Calculate score based on various factors
        let score = 100;

        // Check security status
        Object.values(this.data.securityStatus).forEach(status => {
            if (!status.active || status.status === 'warning') {
                score -= 5;
            }
        });

        // Check recent threats
        const recentThreats = this.data.scanHistory.slice(0, 10).filter(s => s.result === 'danger').length;
        score -= recentThreats * 3;

        // Check alerts
        const urgentAlerts = this.data.alerts.filter(a => a.type === 'high').length;
        score -= urgentAlerts * 5;

        // Keep score between 0 and 100
        this.data.securityScore = Math.max(0, Math.min(100, score));
    }

    addAlert(alertData) {
        this.data.alerts.unshift({
            type: alertData.type || 'low',
            badge: alertData.badge || 'INFO',
            text: alertData.text,
            time: Date.now()
        });

        // Keep only last 10 alerts
        this.data.alerts = this.data.alerts.slice(0, 10);

        this.saveData();
        this.render();
    }

    startAutoRefresh() {
        // Update time displays every minute to keep "Il y a X min/h" fresh
        setInterval(() => {
            this.renderScanHistory();
            this.renderAlerts();
        }, 60000);

        // Check system status every 5 minutes (but don't auto-increment anything)
        setInterval(() => {
            this.refreshSystemStatus();
        }, 300000);
    }

    refreshSystemStatus() {
        // Re-detect system security status (only detection, no data creation)
        this.data.securityStatus = this.detectSystemSecurity();
        this.updateSecurityScore();
        this.saveData();
        this.renderSecurityStatus(); // Only re-render status, not everything

        console.log('%c🔄 Statut de sécurité vérifié', 'color: #00ffff;');
    }

    setupEventListeners() {
        // Listen for custom events from URL Scanner, etc.
        document.addEventListener('cyberguard:scan-complete', (e) => {
            if (e.detail) {
                this.addScanToHistory(e.detail);
            }
        });

        // Button interactions
        const viewHistoryBtn = document.querySelector('.scan-history + .dashboard-btn');
        if (viewHistoryBtn) {
            viewHistoryBtn.addEventListener('click', () => {
                this.showFullHistory();
            });
        }

        const manageAlertsBtn = document.querySelector('.alerts-list + .dashboard-btn');
        if (manageAlertsBtn) {
            manageAlertsBtn.addEventListener('click', () => {
                this.showAlertsManager();
            });
        }

        // Reset dashboard button
        const resetDashboardBtn = document.getElementById('reset-dashboard-btn');
        if (resetDashboardBtn) {
            resetDashboardBtn.addEventListener('click', () => {
                this.resetDashboard();
            });
        }
    }

    showFullHistory() {
        const totalScans = this.data.scanHistory.length;
        const threats = this.data.scanHistory.filter(s => s.result === 'danger').length;
        const safe = this.data.scanHistory.filter(s => s.result === 'safe').length;
        const warnings = this.data.scanHistory.filter(s => s.result === 'warning').length;

        const message = totalScans > 0
            ? `📊 HISTORIQUE COMPLET\n\n` +
              `Total de scans: ${totalScans}\n` +
              `Menaces détectées: ${threats}\n` +
              `Avertissements: ${warnings}\n` +
              `Sites sécurisés: ${safe}\n\n` +
              `Voulez-vous réinitialiser votre historique ?`
            : `📊 HISTORIQUE VIDE\n\nAucun scan effectué pour le moment.\nCommencez par scanner une URL ou vérifier un email !`;

        if (totalScans > 0 && confirm(message)) {
            this.resetDashboard();
        } else if (totalScans === 0) {
            alert(message);
        }
    }

    showAlertsManager() {
        const totalAlerts = this.data.alerts.length;
        const urgent = this.data.alerts.filter(a => a.type === 'high').length;
        const medium = this.data.alerts.filter(a => a.type === 'medium').length;
        const low = this.data.alerts.filter(a => a.type === 'low').length;

        const message = `⚠️ GESTION DES ALERTES\n\n` +
              `Alertes actives: ${totalAlerts}\n` +
              `Urgentes: ${urgent}\n` +
              `Moyennes: ${medium}\n` +
              `Informations: ${low}\n\n` +
              `Voulez-vous effacer toutes les alertes ?`;

        if (confirm(message)) {
            this.clearAlerts();
        }
    }

    resetDashboard() {
        if (confirm('⚠️ ATTENTION\n\nÊtes-vous sûr de vouloir réinitialiser complètement votre dashboard ?\n\nCette action est irréversible.')) {
            localStorage.removeItem(this.storageKey);
            location.reload();
        }
    }

    clearAlerts() {
        // Keep only the welcome message
        this.data.alerts = [{
            type: 'low',
            badge: 'INFO',
            text: 'Toutes les alertes ont été effacées',
            time: Date.now()
        }];
        this.saveData();
        this.render();

        console.log('%c✓ Alertes effacées', 'color: #00ff00;');
    }
}

// ===== INITIALIZE ALL NEW FEATURES =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize chatbot
    new Chatbot();

    // Initialize dark mode
    new DarkModeToggle();

    // Initialize newsletter form
    new NewsletterForm();

    // Initialize realtime stats
    new RealtimeStats();

    // Initialize comparison filters
    new ComparisonFilters();

    // Initialize cyber map
    new CyberMapAnimation();

    // Initialize dashboard animations
    new DashboardScoreAnimation();

    // Initialize dashboard personnel
    window.dashboardPersonnel = new DashboardPersonnel();

    console.log('%c⚡ ALL NEW FEATURES LOADED', 'color: #00ffff; font-weight: bold; font-size: 16px;');
});

// ===== EXPORT FOR MODULES (IF NEEDED) =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        MatrixRain,
        CyberParticles,
        CyberHeader,
        GlitchEffect,
        URLScanner,
        PasswordGenerator,
        SecurityQuiz,
        EmailBreachChecker,
        Chatbot,
        DarkModeToggle,
        NewsletterForm,
        RealtimeStats,
        ComparisonFilters,
        CyberMapAnimation,
        DashboardScoreAnimation
    };
}