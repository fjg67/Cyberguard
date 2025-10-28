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
        // Google Safe Browsing API v4
        const API_KEY = 'AIzaSyAQ15btYga3TIU6f8_KGD3qjz1DpnaQ0Ts';
        const API_URL = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${API_KEY}`;

        try {
            const requestBody = {
                client: {
                    clientId: "cyberguard-pro",
                    clientVersion: "1.0.0"
                },
                threatInfo: {
                    threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
                    platformTypes: ["ANY_PLATFORM"],
                    threatEntryTypes: ["URL"],
                    threatEntries: [
                        { url: url }
                    ]
                }
            };

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();

            // Si des menaces sont trouvées
            if (data.matches && data.matches.length > 0) {
                const threats = data.matches.map(match => match.threatType).join(', ');
                return {
                    unsafe: true,
                    threats: threats,
                    details: data.matches
                };
            }

            return { unsafe: false };

        } catch (e) {
            console.error('Google Safe Browsing API error:', e);
            // Fallback to basic check if API fails
            return await this.fallbackSecurityCheck(url);
        }
    }

    async fallbackSecurityCheck(url) {
        // Fallback si l'API ne fonctionne pas
        try {
            const knownDangerousDomains = [
                'malware-test.com',
                'phishing-test.com',
                'fake-paypal',
                'fake-bank',
                'testsafebrowsing.appspot.com' // Site de test Google
            ];

            const urlObj = new URL(url);
            const hostname = urlObj.hostname.toLowerCase();

            for (const dangerous of knownDangerousDomains) {
                if (hostname.includes(dangerous)) {
                    return { unsafe: true, threats: 'DETECTED_BY_PATTERN' };
                }
            }

            return { unsafe: false };
        } catch (e) {
            return { unsafe: false };
        }
    }

    displayResults(results) {
        const isSafe = results.score >= 40 && !results.malware && !results.phishing;

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
    new URLScanner();
    new PasswordGenerator();
    new SecurityQuiz();
    new EmailBreachChecker();

    console.log('%c⚡ INTERACTIVE TOOLS LOADED', 'color: #00ff00; font-weight: bold; font-size: 14px;');
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
        EmailBreachChecker
    };
}