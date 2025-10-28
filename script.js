// ===== MATRIX RAIN EFFECT =====
class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrix-canvas');
        if (!this.canvas) return;
        
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

        this.ctx.fillStyle = '#0f0';
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
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;
        this.connectionDistance = 150;
        
        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.animate();
        window.addEventListener('resize', () => this.resize());
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
                size: Math.random() * 2 + 1
            });
        }
    }

    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = '#00ff00';
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = '#00ff00';
            this.ctx.fill();

            // Draw connections
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[j].x - p.x;
                const dy = this.particles[j].y - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.connectionDistance) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(0, 255, 0, ${0.3 - distance / this.connectionDistance / 2})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        });
    }

    animate() {
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }
}

// ===== HEADER CONTROLLER =====
class HeaderController {
    constructor() {
        this.header = document.getElementById('header');
        if (!this.header) return;
        
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        if (window.pageYOffset > 100) {
            this.header.style.background = 'rgba(0, 0, 0, 0.98)';
        } else {
            this.header.style.background = 'rgba(0, 0, 0, 0.95)';
        }
    }
}

// ===== MOBILE MENU =====
class MobileMenu {
    constructor() {
        this.btn = document.getElementById('mobile-menu-btn');
        this.menu = document.querySelector('.nav-menu');
        
        if (!this.btn || !this.menu) return;
        
        this.init();
    }

    init() {
        this.btn.addEventListener('click', () => this.toggle());
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => this.close());
        });
    }

    toggle() {
        this.btn.classList.toggle('active');
        this.menu.classList.toggle('active');
    }

    close() {
        this.btn.classList.remove('active');
        this.menu.classList.remove('active');
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

// ===== COUNTER ANIMATION =====
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.threat-value');
        this.animated = false;
        
        if (this.counters.length === 0) return;
        
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.checkPosition());
    }

    checkPosition() {
        if (this.animated) return;

        const threatGrid = document.querySelector('.threat-grid');
        if (!threatGrid) return;

        const position = threatGrid.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;

        if (position < screenPosition) {
            this.animateCounters();
            this.animated = true;
        }
    }

    animateCounters() {
        this.counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };

            updateCounter();
        });
    }
}

// ===== SCROLL TO TOP =====
class ScrollToTop {
    constructor() {
        this.button = document.getElementById('scroll-top');
        
        if (!this.button) return;
        
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.toggleVisibility());
        this.button.addEventListener('click', () => this.scrollToTop());
    }

    toggleVisibility() {
        if (window.pageYOffset > 300) {
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

// ===== TYPING EFFECT =====
class TypingEffect {
    constructor() {
        this.element = document.querySelector('.typing');
        
        if (!this.element) return;
        
        this.text = this.element.textContent;
        this.element.textContent = '';
        this.index = 0;
        this.speed = 50;
        
        setTimeout(() => this.type(), 1000);
    }

    type() {
        if (this.index < this.text.length) {
            this.element.textContent += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        }
    }
}

// ===== GLITCH EFFECT ON HOVER =====
class GlitchEffect {
    constructor() {
        this.elements = document.querySelectorAll('.glitch');
        
        this.init();
    }

    init() {
        this.elements.forEach(el => {
            el.addEventListener('mouseenter', () => this.startGlitch(el));
        });
    }

    startGlitch(el) {
        let iterations = 0;
        const maxIterations = 10;
        
        const interval = setInterval(() => {
            if (iterations >= maxIterations) {
                clearInterval(interval);
                return;
            }
            
            el.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
            iterations++;
        }, 50);
        
        setTimeout(() => {
            el.style.transform = 'translate(0, 0)';
        }, 500);
    }
}

// ===== CYBER CARD EFFECTS =====
class CyberCardEffects {
    constructor() {
        this.cards = document.querySelectorAll('.cyber-card, .scan-card');
        
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', () => this.activateCard(card));
            card.addEventListener('mouseleave', () => this.deactivateCard(card));
        });
    }

    activateCard(card) {
        const corners = card.querySelectorAll('.corner');
        corners.forEach(corner => {
            corner.style.borderColor = '#00ffff';
        });
    }

    deactivateCard(card) {
        const corners = card.querySelectorAll('.corner');
        corners.forEach(corner => {
            corner.style.borderColor = '#00ff00';
        });
    }
}

// ===== TERMINAL TYPING IN BOOT =====
class TerminalBoot {
    constructor() {
        this.texts = document.querySelectorAll('.boot-text');
        
        if (this.texts.length === 0) return;
        
        this.init();
    }

    init() {
        this.texts.forEach((text, index) => {
            const originalText = text.textContent;
            text.textContent = '';
            
            setTimeout(() => {
                this.typeText(text, originalText);
            }, index * 500 + 500);
        });
    }

    typeText(element, text) {
        let i = 0;
        const speed = 30;
        
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        
        type();
    }
}

// ===== ACTIVE NAV LINK =====
class ActiveNav {
    constructor() {
        this.sections = document.querySelectorAll('.section, .hero');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        if (this.sections.length === 0) return;
        
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.updateActiveLink());
    }

    updateActiveLink() {
        let current = '';
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        this.navLinks.forEach(link => {
            link.style.textShadow = 'none';
            if (link.getAttribute('href') === `#${current}`) {
                link.style.textShadow = '0 0 10px #00ff00';
            }
        });
    }
}

// ===== RANDOM GLITCH ELEMENTS =====
class RandomGlitch {
    constructor() {
        this.init();
    }

    init() {
        setInterval(() => {
            const glitchElements = document.querySelectorAll('.glitch');
            if (glitchElements.length === 0) return;
            
            const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
            
            randomElement.style.animation = 'none';
            setTimeout(() => {
                randomElement.style.animation = '';
            }, 10);
        }, 5000);
    }
}

// ===== CURSOR TRAIL =====
class CursorTrail {
    constructor() {
        this.dots = [];
        this.mouse = { x: 0, y: 0 };
        this.dotsCount = 15;
        
        this.init();
    }

    init() {
        for (let i = 0; i < this.dotsCount; i++) {
            const dot = document.createElement('div');
            dot.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: #00ff00;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                box-shadow: 0 0 10px #00ff00;
                opacity: ${1 - i / this.dotsCount};
            `;
            document.body.appendChild(dot);
            this.dots.push({ element: dot, x: 0, y: 0 });
        }

        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        this.animate();
    }

    animate() {
        let x = this.mouse.x;
        let y = this.mouse.y;

        this.dots.forEach((dot, index) => {
            dot.element.style.left = x + 'px';
            dot.element.style.top = y + 'px';

            const nextDot = this.dots[index + 1] || this.dots[0];
            x += (nextDot.x - x) * 0.3;
            y += (nextDot.y - y) * 0.3;

            dot.x = x;
            dot.y = y;
        });

        requestAnimationFrame(() => this.animate());
    }
}

// ===== SCREEN SHAKE ON BUTTON CLICK =====
class ScreenShake {
    constructor() {
        this.buttons = document.querySelectorAll('.btn-cyber');
        
        this.init();
    }

    init() {
        this.buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (btn.getAttribute('href').startsWith('#')) {
                    this.shake();
                }
            });
        });
    }

    shake() {
        const intensity = 2;
        const duration = 200;
        const interval = 20;
        let elapsed = 0;

        const shakeInterval = setInterval(() => {
            if (elapsed >= duration) {
                clearInterval(shakeInterval);
                document.body.style.transform = 'translate(0, 0)';
                return;
            }

            const x = Math.random() * intensity * 2 - intensity;
            const y = Math.random() * intensity * 2 - intensity;
            document.body.style.transform = `translate(${x}px, ${y}px)`;

            elapsed += interval;
        }, interval);
    }
}

// ===== INITIALIZE ALL =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c▸ CYBERGUARD PRO', 'font-size: 24px; font-weight: bold; color: #00ff00; text-shadow: 0 0 10px #00ff00;');
    console.log('%cSYSTEM_ONLINE | ACCESS_GRANTED', 'color: #00ffff;');
    
    // Core functionality
    new MatrixRain();
    new CyberParticles();
    new HeaderController();
    new MobileMenu();
    new SmoothScroll();
    new CounterAnimation();
    new ScrollToTop();
    new TypingEffect();
    new GlitchEffect();
    new CyberCardEffects();
    new TerminalBoot();
    new ActiveNav();
    new RandomGlitch();
    new ScreenShake();
    
    // Optional (comment out if performance issues)
    // new CursorTrail();
    
    // Remove boot sequence after animation
    setTimeout(() => {
        const bootSeq = document.getElementById('boot-sequence');
        if (bootSeq) {
            bootSeq.remove();
        }
    }, 4000);
});

// ===== KONAMI CODE EASTER EGG =====
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join('') === konamiSequence.join('')) {
        activateMatrixMode();
    }
});

function activateMatrixMode() {
    document.body.style.animation = 'matrix-pulse 2s infinite';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes matrix-pulse {
            0%, 100% { filter: hue-rotate(0deg) brightness(1); }
            50% { filter: hue-rotate(180deg) brightness(1.5); }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        document.body.style.animation = '';
        style.remove();
    }, 5000);
    
    console.log('%cHACK THE PLANET!', 'font-size: 20px; color: #ff0040; text-shadow: 0 0 20px #ff0040;');
}

// ===== PERFORMANCE OPTIMIZATION =====
if (navigator.hardwareConcurrency <= 4) {
    document.body.classList.add('low-performance');
    console.log('%cLow performance mode activated', 'color: #ffff00;');
}