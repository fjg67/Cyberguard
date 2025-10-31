/**
 * ═══════════════════════════════════════════════════════════════
 * THREAT MAP CYBER ANIMATIONS - PREMIUM EFFECTS
 * ═══════════════════════════════════════════════════════════════
 * Features:
 * - Real-time threat counters
 * - Animated alerts
 * - Interactive filters
 * - Dynamic threat list
 * - Cyber effects
 */

class ThreatMapCyberAnimations {
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
        console.log('🗺️ Threat Map Cyber Animations initialized');
        
        // Initialize threat counters
        this.initThreatCounters();
        
        // Animate alerts
        this.animateAlerts();
        
        // Setup filter buttons
        this.setupFilters();
        
        // Setup clear alerts button
        this.setupClearButton();
        
        // Setup auto-refresh
        this.setupAutoRefresh();
        
        // Add cyber corner markers
        this.addCornerMarkers();
        
        // Initialize dynamic threat list
        this.initThreatList();
        
        // Add typing effect to title
        this.addTypingEffect();
    }

    initThreatCounters() {
        const countersContainer = document.getElementById('threat-counters');
        if (!countersContainer) return;

        const threatTypes = [
            { type: 'DDoS', icon: '⚡', count: 1247, color: '#ff0000' },
            { type: 'Malware', icon: '🦠', count: 892, color: '#ff6600' },
            { type: 'Phishing', icon: '🎣', count: 634, color: '#ffaa00' },
            { type: 'Ransomware', icon: '🔒', count: 321, color: '#ff00ff' },
            { type: 'Data Breach', icon: '💾', count: 187, color: '#00ffff' },
            { type: 'Botnet', icon: '🕸️', count: 456, color: '#00ff41' }
        ];

        countersContainer.innerHTML = threatTypes.map(threat => `
            <div class="threat-counter" data-type="${threat.type.toLowerCase()}">
                <div class="threat-counter-icon" style="filter: drop-shadow(0 0 15px ${threat.color})">${threat.icon}</div>
                <div class="threat-counter-value" style="color: ${threat.color}; text-shadow: 0 0 15px ${threat.color}" data-target="${threat.count}">0</div>
                <div class="threat-counter-label">${threat.type}</div>
            </div>
        `).join('');

        // Animate counters
        this.animateCounters();
    }

    animateCounters() {
        const counters = document.querySelectorAll('.threat-counter-value');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current).toLocaleString();
                }
            }, 16);
        });
    }

    animateAlerts() {
        const alerts = document.querySelectorAll('.alert-item');
        
        alerts.forEach((alert, index) => {
            alert.style.opacity = '0';
            alert.style.transform = 'translateX(-50px)';
            
            setTimeout(() => {
                alert.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                alert.style.opacity = '1';
                alert.style.transform = 'translateX(0)';
            }, 200 * index);
        });

        // Add removal animation on click
        alerts.forEach(alert => {
            alert.addEventListener('click', () => {
                alert.style.transform = 'translateX(100%)';
                alert.style.opacity = '0';
                setTimeout(() => alert.remove(), 500);
            });
        });
    }

    setupFilters() {
        const filterBtns = document.querySelectorAll('.threat-filter-btn');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.toggle('active');
                
                // Add ripple effect
                const ripple = document.createElement('span');
                const rect = btn.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    border-radius: 50%;
                    background: rgba(0, 255, 65, 0.5);
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%) scale(0);
                    animation: filterRipple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                btn.style.position = 'relative';
                btn.style.overflow = 'hidden';
                btn.appendChild(ripple);
                
                // Add ripple animation
                if (!document.getElementById('filter-ripple-animation')) {
                    const style = document.createElement('style');
                    style.id = 'filter-ripple-animation';
                    style.textContent = `
                        @keyframes filterRipple {
                            to {
                                transform: translate(-50%, -50%) scale(2);
                                opacity: 0;
                            }
                        }
                    `;
                    document.head.appendChild(style);
                }
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    setupClearButton() {
        const clearBtn = document.getElementById('clear-alerts-btn');
        if (!clearBtn) return;

        clearBtn.addEventListener('click', () => {
            const alerts = document.querySelectorAll('.alert-item');
            
            alerts.forEach((alert, index) => {
                setTimeout(() => {
                    alert.style.transform = 'translateX(100%)';
                    alert.style.opacity = '0';
                    setTimeout(() => alert.remove(), 500);
                }, 100 * index);
            });
        });
    }

    setupAutoRefresh() {
        const toggle = document.getElementById('auto-refresh-toggle');
        const refreshBtn = document.getElementById('refresh-threats-btn');
        
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                // Add rotation animation
                refreshBtn.style.transition = 'transform 0.5s ease';
                refreshBtn.style.transform = 'rotate(360deg)';
                
                setTimeout(() => {
                    refreshBtn.style.transform = 'rotate(0deg)';
                }, 500);
                
                // Simulate refresh
                this.refreshThreats();
            });
        }
        
        if (toggle && toggle.checked) {
            // Auto-refresh every 10 seconds
            setInterval(() => {
                this.refreshThreats();
            }, 10000);
        }
    }

    refreshThreats() {
        // Simulate threat refresh with random values
        const counters = document.querySelectorAll('.threat-counter-value');
        
        counters.forEach(counter => {
            const currentValue = parseInt(counter.textContent.replace(/,/g, ''));
            const variation = Math.floor(Math.random() * 50) - 25;
            const newValue = Math.max(0, currentValue + variation);
            
            // Animate to new value
            let current = currentValue;
            const increment = (newValue - currentValue) / 30;
            
            const timer = setInterval(() => {
                current += increment;
                if ((increment > 0 && current >= newValue) || (increment < 0 && current <= newValue)) {
                    counter.textContent = newValue.toLocaleString();
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current).toLocaleString();
                }
            }, 16);
        });
    }

    addCornerMarkers() {
        const mapWrapper = document.querySelector('.threat-map-wrapper');
        if (!mapWrapper) return;

        const markers = document.createElement('div');
        markers.className = 'cyber-corner-markers';
        markers.innerHTML = `
            <div class="corner-marker tl"></div>
            <div class="corner-marker tr"></div>
            <div class="corner-marker bl"></div>
            <div class="corner-marker br"></div>
        `;
        
        markers.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            z-index: 100;
        `;
        
        mapWrapper.appendChild(markers);
        
        // Add corner marker styles
        const style = document.createElement('style');
        style.textContent = `
            .corner-marker {
                position: absolute;
                width: 20px;
                height: 20px;
                border: 2px solid #00ff41;
            }
            .corner-marker.tl {
                top: 10px;
                left: 10px;
                border-right: none;
                border-bottom: none;
            }
            .corner-marker.tr {
                top: 10px;
                right: 10px;
                border-left: none;
                border-bottom: none;
            }
            .corner-marker.bl {
                bottom: 10px;
                left: 10px;
                border-right: none;
                border-top: none;
            }
            .corner-marker.br {
                bottom: 10px;
                right: 10px;
                border-left: none;
                border-top: none;
            }
        `;
        document.head.appendChild(style);
    }

    initThreatList() {
        const threatsList = document.getElementById('threats-list');
        if (!threatsList) return;

        const threats = [
            {
                type: 'DDoS Attack',
                location: 'US 🇺🇸 → DE 🇩🇪',
                time: '2 minutes ago',
                severity: 'critical'
            },
            {
                type: 'Ransomware Campaign',
                location: 'RU 🇷🇺 → FR 🇫🇷',
                time: '5 minutes ago',
                severity: 'high'
            },
            {
                type: 'Phishing Attack',
                location: 'CN 🇨🇳 → UK 🇬🇧',
                time: '8 minutes ago',
                severity: 'medium'
            },
            {
                type: 'Malware Distribution',
                location: 'BR 🇧🇷 → CA 🇨🇦',
                time: '12 minutes ago',
                severity: 'high'
            },
            {
                type: 'Data Breach Attempt',
                location: 'KR 🇰🇷 → AU 🇦🇺',
                time: '15 minutes ago',
                severity: 'critical'
            }
        ];

        threatsList.innerHTML = threats.map((threat, index) => `
            <div class="threat-item" data-severity="${threat.severity}" style="animation-delay: ${index * 0.1}s">
                <div class="threat-type">${threat.type}</div>
                <div class="threat-location">${threat.location}</div>
                <div class="threat-time">${threat.time}</div>
            </div>
        `).join('');

        // Add entrance animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes threatItemEntrance {
                from {
                    opacity: 0;
                    transform: translateX(-30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            .threat-item {
                animation: threatItemEntrance 0.5s ease-out forwards;
                opacity: 0;
            }
        `;
        document.head.appendChild(style);
    }

    addTypingEffect() {
        const titleText = document.querySelector('.threat-map-wrapper .section-text');
        if (!titleText) return;

        const text = titleText.textContent;
        titleText.textContent = '';
        
        let index = 0;
        const typingSpeed = 100;
        
        const typeChar = () => {
            if (index < text.length) {
                titleText.textContent += text.charAt(index);
                index++;
                setTimeout(typeChar, typingSpeed);
            }
        };
        
        // Start typing after a short delay
        setTimeout(typeChar, 500);
    }

    // Public method to add new threat
    addThreat(threatData) {
        const threatsList = document.getElementById('threats-list');
        if (!threatsList) return;

        const threatItem = document.createElement('div');
        threatItem.className = 'threat-item';
        threatItem.setAttribute('data-severity', threatData.severity);
        threatItem.innerHTML = `
            <div class="threat-type">${threatData.type}</div>
            <div class="threat-location">${threatData.location}</div>
            <div class="threat-time">${threatData.time}</div>
        `;
        
        threatItem.style.opacity = '0';
        threatItem.style.transform = 'translateX(-30px)';
        
        threatsList.insertBefore(threatItem, threatsList.firstChild);
        
        setTimeout(() => {
            threatItem.style.transition = 'all 0.5s ease';
            threatItem.style.opacity = '1';
            threatItem.style.transform = 'translateX(0)';
        }, 10);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.threatMapCyberAnimations = new ThreatMapCyberAnimations();
    });
} else {
    window.threatMapCyberAnimations = new ThreatMapCyberAnimations();
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThreatMapCyberAnimations;
}
