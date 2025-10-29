/**
 * ═══════════════════════════════════════════════════════════════
 * THEME MANAGER - Advanced Dark/Light Mode System
 * ═══════════════════════════════════════════════════════════════
 * Features:
 * - Instant theme switching with smooth transitions
 * - LocalStorage persistence
 * - System preference detection (prefers-color-scheme)
 * - Dynamic CSS variable updates
 * - Smooth animations between themes
 */

class ThemeManager {
    constructor() {
        this.currentTheme = this.getStoredTheme() || 'dark'; // Force dark mode by default
        this.themes = {
            dark: {
                // Cyber Colors (Dark)
                'cyber-cyan': '#00ffff',
                'cyber-blue': '#0066ff',
                'cyber-purple': '#9933ff',
                'cyber-pink': '#ff00ff',
                'cyber-green': '#00ff00',
                'cyber-red': '#ff0000',
                'cyber-yellow': '#ffff00',

                // Backgrounds (Dark)
                'bg-dark': '#000000',
                'bg-darker': '#0a0a0f',
                'bg-panel': 'rgba(10, 10, 30, 0.8)',
                'bg-card': 'rgba(0, 20, 40, 0.6)',
                'bg-header': 'rgba(0, 0, 0, 0.95)',

                // Text (Dark)
                'text-primary': '#ffffff',
                'text-secondary': '#00ffff',
                'text-dim': '#6b7280',
                'text-muted': '#9ca3af',

                // Effects (Dark)
                'glow-cyan': '0 0 20px #00ffff',
                'glow-purple': '0 0 20px #9933ff',
                'shadow-deep': '0 10px 50px rgba(0, 0, 0, 0.9)',

                // Matrix & Particles
                'matrix-opacity': '0.1',
                'particles-opacity': '0.3',
                'grid-opacity': '0.03',
                'scan-lines-opacity': '0.03'
            },
            light: {
                // Cyber Colors (Light - adjusted for visibility)
                'cyber-cyan': '#0088cc',
                'cyber-blue': '#0052cc',
                'cyber-purple': '#7c3aed',
                'cyber-pink': '#d946ef',
                'cyber-green': '#10b981',
                'cyber-red': '#ef4444',
                'cyber-yellow': '#f59e0b',

                // Backgrounds (Light)
                'bg-dark': '#f8fafc',
                'bg-darker': '#ffffff',
                'bg-panel': 'rgba(255, 255, 255, 0.95)',
                'bg-card': 'rgba(248, 250, 252, 0.8)',
                'bg-header': 'rgba(255, 255, 255, 0.98)',

                // Text (Light)
                'text-primary': '#0f172a',
                'text-secondary': '#0088cc',
                'text-dim': '#64748b',
                'text-muted': '#94a3b8',

                // Effects (Light)
                'glow-cyan': '0 0 15px rgba(0, 136, 204, 0.3)',
                'glow-purple': '0 0 15px rgba(124, 58, 237, 0.3)',
                'shadow-deep': '0 10px 50px rgba(0, 0, 0, 0.1)',

                // Matrix & Particles (reduced for light mode)
                'matrix-opacity': '0.02',
                'particles-opacity': '0.08',
                'grid-opacity': '0.01',
                'scan-lines-opacity': '0.01'
            }
        };

        this.init();
    }

    init() {
        // Apply initial theme
        this.applyTheme(this.currentTheme, false);

        // Create theme toggle button in header
        this.createToggleButton();

        // Listen for system theme changes
        this.listenToSystemPreference();

        console.log(`🎨 Theme Manager initialized - Current theme: ${this.currentTheme}`);
    }

    createToggleButton() {
        const header = document.querySelector('.cyber-header .header-content');
        if (!header) return;

        const toggleContainer = document.createElement('div');
        toggleContainer.className = 'theme-toggle-container';
        toggleContainer.innerHTML = `
            <button class="theme-toggle-btn" id="theme-toggle" aria-label="Toggle theme">
                <div class="theme-toggle-track">
                    <div class="theme-toggle-thumb">
                        <span class="theme-icon theme-icon-dark">🌙</span>
                        <span class="theme-icon theme-icon-light">☀️</span>
                    </div>
                </div>
                <span class="theme-toggle-label">${this.currentTheme === 'dark' ? 'Mode Sombre' : 'Mode Clair'}</span>
            </button>
        `;

        // Insert before nav menu
        const nav = header.querySelector('.nav-menu');
        if (nav) {
            header.insertBefore(toggleContainer, nav);
        } else {
            header.appendChild(toggleContainer);
        }

        // Add click event
        const toggleBtn = document.getElementById('theme-toggle');
        toggleBtn.addEventListener('click', () => this.toggle());

        // Update button state
        this.updateToggleButton();
    }

    updateToggleButton() {
        const toggleBtn = document.getElementById('theme-toggle');
        if (!toggleBtn) return;

        const thumb = toggleBtn.querySelector('.theme-toggle-thumb');
        const label = toggleBtn.querySelector('.theme-toggle-label');

        if (this.currentTheme === 'light') {
            thumb.classList.add('light');
            label.textContent = 'Mode Clair';
        } else {
            thumb.classList.remove('light');
            label.textContent = 'Mode Sombre';
        }
    }

    toggle() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme, true);
        this.currentTheme = newTheme;
        this.saveTheme(newTheme);
        this.updateToggleButton();

        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('themeChange', {
            detail: { theme: newTheme }
        }));

        console.log(`🎨 Theme switched to: ${newTheme}`);
    }

    applyTheme(theme, animate = true) {
        const root = document.documentElement;
        const themeColors = this.themes[theme];

        // Add transition class for smooth animation
        if (animate) {
            root.classList.add('theme-transitioning');
        }

        // Update all CSS variables
        Object.keys(themeColors).forEach(key => {
            root.style.setProperty(`--${key}`, themeColors[key]);
        });

        // Update data attribute
        root.setAttribute('data-theme', theme);

        // Update special elements
        this.updateCanvasOpacity(theme);

        // Remove transition class after animation
        if (animate) {
            setTimeout(() => {
                root.classList.remove('theme-transitioning');
            }, 500);
        }
    }

    updateCanvasOpacity(theme) {
        const matrixCanvas = document.getElementById('matrix-canvas');
        const particlesCanvas = document.getElementById('particles-canvas');

        if (matrixCanvas) {
            matrixCanvas.style.opacity = this.themes[theme]['matrix-opacity'];
        }

        if (particlesCanvas) {
            particlesCanvas.style.opacity = this.themes[theme]['particles-opacity'];
        }
    }

    getStoredTheme() {
        return localStorage.getItem('cyberguard-theme');
    }

    saveTheme(theme) {
        localStorage.setItem('cyberguard-theme', theme);
    }

    getSystemPreference() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    listenToSystemPreference() {
        if (!window.matchMedia) return;

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            // Only auto-switch if user hasn't manually set a preference
            if (!this.getStoredTheme()) {
                const newTheme = e.matches ? 'dark' : 'light';
                this.applyTheme(newTheme, true);
                this.currentTheme = newTheme;
                this.updateToggleButton();
            }
        });
    }

    getCurrentTheme() {
        return this.currentTheme;
    }
}

// Initialize theme manager when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.themeManager = new ThemeManager();
    });
} else {
    window.themeManager = new ThemeManager();
}
