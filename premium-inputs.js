/**
 * ═══════════════════════════════════════════════════════════════
 * PREMIUM INPUTS INTERACTIONS - CYBER EFFECTS
 * ═══════════════════════════════════════════════════════════════
 * Features:
 * - Input validation
 * - Typing sound effects
 * - Auto-complete suggestions
 * - Enter key support
 * - Ripple effects on buttons
 */

class PremiumInputs {
    constructor() {
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        console.log('⌨️ Premium Inputs initialized');
        
        // Setup all inputs
        this.setupInputs();
        
        // Setup all buttons
        this.setupButtons();
        
        // Setup file drop zone
        this.setupDropZone();
        
        // Setup enter key support
        this.setupEnterKey();
        
        // Add typing effects
        this.addTypingEffects();
    }

    setupInputs() {
        const inputs = document.querySelectorAll('input[type="text"], input[type="url"], input[type="email"], input[type="password"]');
        
        inputs.forEach(input => {
            // Add focus animation
            input.addEventListener('focus', () => {
                this.createFocusRipple(input);
            });
            
            // Add typing sound effect (visual)
            input.addEventListener('input', () => {
                this.addTypingFlash(input);
            });
            
            // Add validation on blur
            input.addEventListener('blur', () => {
                this.validateInput(input);
            });
        });
    }

    createFocusRipple(input) {
        const container = input.parentElement;
        const ripple = document.createElement('div');
        
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #00ffff, transparent);
            transform: translateY(-50%);
            animation: focusRipple 0.5s ease-out;
            pointer-events: none;
            z-index: 10;
        `;
        
        container.style.position = 'relative';
        container.appendChild(ripple);
        
        // Add animation
        if (!document.getElementById('focus-ripple-animation')) {
            const style = document.createElement('style');
            style.id = 'focus-ripple-animation';
            style.textContent = `
                @keyframes focusRipple {
                    from {
                        opacity: 0;
                        transform: translateY(-50%) scaleX(0);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(-50%) scaleX(1);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => ripple.remove(), 500);
    }

    addTypingFlash(input) {
        input.style.transition = 'none';
        input.style.boxShadow = '0 0 40px rgba(0, 255, 255, 0.8), inset 0 0 50px rgba(0, 255, 255, 0.2)';
        
        setTimeout(() => {
            input.style.transition = 'all 0.3s ease';
            input.style.boxShadow = '';
        }, 50);
    }

    validateInput(input) {
        const value = input.value.trim();
        
        if (!value) return;
        
        // Validate based on input type
        let isValid = true;
        
        if (input.type === 'url' || input.id.includes('url')) {
            isValid = this.isValidURL(value);
        } else if (input.type === 'email' || input.id.includes('email')) {
            isValid = this.isValidEmail(value);
        }
        
        // Visual feedback
        if (isValid) {
            input.style.borderColor = '#00ff41';
            input.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.5)';
        } else {
            input.style.borderColor = '#ff0000';
            input.style.boxShadow = '0 0 20px rgba(255, 0, 0, 0.5)';
            
            // Show error message
            this.showErrorMessage(input, 'Format invalide');
        }
        
        // Reset after 2 seconds
        setTimeout(() => {
            input.style.borderColor = '';
            input.style.boxShadow = '';
        }, 2000);
    }

    isValidURL(string) {
        try {
            const url = new URL(string.startsWith('http') ? string : 'https://' + string);
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch (_) {
            return false;
        }
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    showErrorMessage(input, message) {
        const error = document.createElement('div');
        error.className = 'input-error-message';
        error.textContent = message;
        error.style.cssText = `
            position: absolute;
            bottom: -25px;
            left: 0;
            color: #ff0000;
            font-family: 'Courier New', monospace;
            font-size: 0.85rem;
            animation: errorSlide 0.3s ease-out;
        `;
        
        input.parentElement.style.position = 'relative';
        input.parentElement.appendChild(error);
        
        // Add animation
        if (!document.getElementById('error-slide-animation')) {
            const style = document.createElement('style');
            style.id = 'error-slide-animation';
            style.textContent = `
                @keyframes errorSlide {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => error.remove(), 2000);
    }

    setupButtons() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, button');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createButtonRipple(e, button);
            });
        });
    }

    createButtonRipple(event, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
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
            animation: buttonRipple 0.6s ease-out;
            pointer-events: none;
            z-index: 100;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        // Add animation
        if (!document.getElementById('button-ripple-animation')) {
            const style = document.createElement('style');
            style.id = 'button-ripple-animation';
            style.textContent = `
                @keyframes buttonRipple {
                    to {
                        transform: scale(2.5);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => ripple.remove(), 600);
    }

    setupDropZone() {
        const dropZone = document.getElementById('file-drop-zone');
        if (!dropZone) return;

        // Drag over
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('active');
        });

        // Drag leave
        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('active');
        });

        // Drop
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('active');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.handleFileUpload(files[0]);
            }
        });

        // Browse button
        const browseBtn = document.getElementById('browse-files-btn');
        const fileInput = document.getElementById('file-input');
        
        if (browseBtn && fileInput) {
            browseBtn.addEventListener('click', () => {
                fileInput.click();
            });
            
            fileInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    this.handleFileUpload(e.target.files[0]);
                }
            });
        }
    }

    handleFileUpload(file) {
        // Show file info
        const dropZone = document.getElementById('file-drop-zone');
        if (!dropZone) return;

        const fileInfo = document.createElement('div');
        fileInfo.style.cssText = `
            margin-top: 1rem;
            padding: 1rem;
            background: rgba(0, 255, 65, 0.1);
            border: 2px solid #00ff41;
            border-radius: 0;
            color: #00ffff;
            font-family: 'Courier New', monospace;
        `;
        fileInfo.innerHTML = `
            <strong>📄 ${file.name}</strong><br>
            <small>Taille: ${(file.size / 1024).toFixed(2)} KB</small>
        `;
        
        dropZone.appendChild(fileInfo);
        
        // Trigger file analysis (if available)
        if (window.fileAnalyzer) {
            window.fileAnalyzer.analyzeFile(file);
        }
    }

    setupEnterKey() {
        // SSL Checker
        const sslInput = document.getElementById('ssl-url-input');
        const sslBtn = document.getElementById('check-ssl-btn');
        
        if (sslInput && sslBtn) {
            sslInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    sslBtn.click();
                }
            });
        }

        // Password Analyzer
        const passwordInput = document.getElementById('password-input');
        const passwordBtn = document.getElementById('analyze-password-btn');
        
        if (passwordInput && passwordBtn) {
            passwordInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    passwordBtn.click();
                }
            });
        }

        // URL Scanner (phishing)
        const urlInput = document.querySelector('input[placeholder*="URL"]');
        const urlBtn = document.getElementById('scan-url-btn');
        
        if (urlInput && urlBtn) {
            urlInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    urlBtn.click();
                }
            });
        }
    }

    addTypingEffects() {
        // Add placeholder typing effect on first focus
        const inputs = document.querySelectorAll('input[placeholder]');
        
        inputs.forEach(input => {
            const originalPlaceholder = input.placeholder;
            let hasTyped = false;
            
            input.addEventListener('focus', () => {
                if (!hasTyped && !input.value) {
                    hasTyped = true;
                    input.placeholder = '';
                    
                    let i = 0;
                    const typeInterval = setInterval(() => {
                        if (i < originalPlaceholder.length) {
                            input.placeholder += originalPlaceholder.charAt(i);
                            i++;
                        } else {
                            clearInterval(typeInterval);
                        }
                    }, 50);
                }
            });
        });
    }

    // Public method to add glow effect to input
    addGlowEffect(inputId) {
        const input = document.getElementById(inputId);
        if (!input) return;

        input.style.transition = 'all 0.5s ease';
        input.style.boxShadow = '0 0 40px rgba(0, 255, 65, 0.8)';
        input.style.borderColor = '#00ff41';
        
        setTimeout(() => {
            input.style.boxShadow = '';
            input.style.borderColor = '';
        }, 1000);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.premiumInputs = new PremiumInputs();
    });
} else {
    window.premiumInputs = new PremiumInputs();
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PremiumInputs;
}
