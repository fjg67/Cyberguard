// ===== INTERACTIVE WORLD MAP - CYBER ATTACKS VISUALIZATION =====
// Real-time visualization of cyber threats on a world map

class InteractiveWorldMap {
    constructor() {
        this.mapContainer = document.querySelector('.cyber-map .map-placeholder');
        this.countries = [
            { name: 'USA', x: 15, y: 40, code: 'US', attacks: 0, severity: 'high' },
            { name: 'Canada', x: 12, y: 25, code: 'CA', attacks: 0, severity: 'medium' },
            { name: 'Brésil', x: 25, y: 60, code: 'BR', attacks: 0, severity: 'medium' },
            { name: 'UK', x: 19, y: 27, code: 'GB', attacks: 0, severity: 'medium' },
            { name: 'France', x: 20, y: 30, code: 'FR', attacks: 0, severity: 'medium' },
            { name: 'Allemagne', x: 24, y: 28, code: 'DE', attacks: 0, severity: 'medium' },
            { name: 'Espagne', x: 18, y: 35, code: 'ES', attacks: 0, severity: 'low' },
            { name: 'Italie', x: 25, y: 34, code: 'IT', attacks: 0, severity: 'low' },
            { name: 'Russie', x: 45, y: 35, code: 'RU', attacks: 0, severity: 'high' },
            { name: 'Chine', x: 80, y: 25, code: 'CN', attacks: 0, severity: 'high' },
            { name: 'Japon', x: 85, y: 35, code: 'JP', attacks: 0, severity: 'high' },
            { name: 'Inde', x: 72, y: 45, code: 'IN', attacks: 0, severity: 'medium' },
            { name: 'Australie', x: 70, y: 70, code: 'AU', attacks: 0, severity: 'low' },
            { name: 'Afrique du Sud', x: 35, y: 70, code: 'ZA', attacks: 0, severity: 'low' },
            { name: 'Égypte', x: 33, y: 40, code: 'EG', attacks: 0, severity: 'low' },
            { name: 'Nigéria', x: 22, y: 50, code: 'NG', attacks: 0, severity: 'medium' },
            { name: 'Corée du Sud', x: 82, y: 38, code: 'KR', attacks: 0, severity: 'high' },
            { name: 'Arabie Saoudite', x: 45, y: 45, code: 'SA', attacks: 0, severity: 'medium' },
            { name: 'Turquie', x: 35, y: 35, code: 'TR', attacks: 0, severity: 'medium' },
            { name: 'Mexique', x: 8, y: 45, code: 'MX', attacks: 0, severity: 'medium' }
        ];

        this.attackTypes = [
            { type: 'DDoS', icon: '🔴', color: '#ff0040', prob: 0.3 },
            { type: 'Ransomware', icon: '🔒', color: '#ff6b00', prob: 0.2 },
            { type: 'Phishing', icon: '🎣', color: '#ffaa00', prob: 0.25 },
            { type: 'Malware', icon: '🦠', color: '#ff00ff', prob: 0.15 },
            { type: 'Data Breach', icon: '📁', color: '#00ffff', prob: 0.1 }
        ];

        this.activeAttacks = [];
        this.animationFrame = null;
        this.stats = {
            totalAttacks: 0,
            attacksToday: 0,
            countriesAffected: new Set()
        };

        if (this.mapContainer) {
            this.init();
        }
    }

    init() {
        this.loadWorldMap();
        this.startAttackSimulation();
        this.updateCountryStats();

        // Update stats every 5 seconds
        setInterval(() => this.updateCountryStats(), 5000);

        console.log('%c🗺️ Interactive World Map Initialized', 'color: #00ffff; font-weight: bold;');
    }

    async loadWorldMap() {
        try {
            // Try to load the SVG map
            const response = await fetch('world-map.svg');
            if (response.ok) {
                const svgText = await response.text();
                this.renderMapWithSVG(svgText);
            } else {
                this.renderMapWithPoints();
            }
        } catch (error) {
            console.log('Using simplified map visualization');
            this.renderMapWithPoints();
        }
    }

    renderMapWithSVG(svgText) {
        // Create container for SVG + points
        this.mapContainer.innerHTML = `
            <div class="world-map-svg-container">
                ${svgText}
                <div class="attack-points-overlay"></div>
            </div>
        `;

        const svg = this.mapContainer.querySelector('svg');
        if (svg) {
            svg.style.cssText = `
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                opacity: 0.3;
                filter: blur(1px);
            `;
        }

        // Add country points on top of SVG
        this.renderCountryPoints();
    }

    renderMapWithPoints() {
        this.mapContainer.innerHTML = `
            <div class="world-map-container">
                <div class="map-grid"></div>
                <div class="attack-points-overlay"></div>
            </div>
        `;

        this.renderMapGrid();
        this.renderCountryPoints();
    }

    renderMapGrid() {
        const grid = this.mapContainer.querySelector('.map-grid');
        if (!grid) return;

        grid.innerHTML = '';

        // Create a simple grid background
        for (let i = 0; i < 10; i++) {
            const line = document.createElement('div');
            line.style.cssText = `
                position: absolute;
                left: 0;
                right: 0;
                top: ${i * 10}%;
                height: 1px;
                background: rgba(0, 255, 255, 0.1);
            `;
            grid.appendChild(line);
        }

        for (let i = 0; i < 20; i++) {
            const line = document.createElement('div');
            line.style.cssText = `
                position: absolute;
                top: 0;
                bottom: 0;
                left: ${i * 5}%;
                width: 1px;
                background: rgba(0, 255, 255, 0.1);
            `;
            grid.appendChild(line);
        }
    }

    renderCountryPoints() {
        const overlay = this.mapContainer.querySelector('.attack-points-overlay');
        if (!overlay) return;

        overlay.innerHTML = '';

        this.countries.forEach(country => {
            const point = document.createElement('div');
            point.className = `map-point activity-${country.severity}`;
            point.style.cssText = `
                position: absolute;
                top: ${country.y}%;
                left: ${country.x}%;
                transform: translate(-50%, -50%);
                cursor: pointer;
                z-index: 10;
            `;
            point.dataset.country = country.code;

            point.innerHTML = `
                <span class="pulse"></span>
                <div class="map-tooltip">
                    <strong>${country.name}</strong><br>
                    <span class="attack-count">${country.attacks} attaques</span><br>
                    ${this.getSeverityLabel(country.severity)}
                </div>
            `;

            // Add click event
            point.addEventListener('click', () => this.showCountryDetails(country));

            overlay.appendChild(point);
        });
    }

    getSeverityLabel(severity) {
        const labels = {
            'low': '🟢 Faible',
            'medium': '🟡 Moyenne',
            'high': '🔴 Élevée',
            'critical': '⚠️ Critique'
        };
        return labels[severity] || '🟡 Moyenne';
    }

    startAttackSimulation() {
        // Create a new attack every 2-5 seconds
        const createAttack = () => {
            if (Math.random() > 0.3) { // 70% chance to create attack
                this.simulateAttack();
            }

            const delay = 2000 + Math.random() * 3000;
            setTimeout(createAttack, delay);
        };

        createAttack();

        // Animate existing attacks
        this.animateAttacks();
    }

    simulateAttack() {
        // Pick random source and target countries
        const sourceIndex = Math.floor(Math.random() * this.countries.length);
        const targetIndex = Math.floor(Math.random() * this.countries.length);

        if (sourceIndex === targetIndex) return;

        const source = this.countries[sourceIndex];
        const target = this.countries[targetIndex];

        // Pick random attack type
        const rand = Math.random();
        let cumProb = 0;
        let attackType = this.attackTypes[0];

        for (let type of this.attackTypes) {
            cumProb += type.prob;
            if (rand <= cumProb) {
                attackType = type;
                break;
            }
        }

        // Create attack
        const attack = {
            id: Date.now() + Math.random(),
            source: source,
            target: target,
            type: attackType,
            progress: 0,
            speed: 0.01 + Math.random() * 0.02
        };

        this.activeAttacks.push(attack);

        // Update target country stats
        target.attacks++;
        this.stats.totalAttacks++;
        this.stats.attacksToday++;
        this.stats.countriesAffected.add(target.code);

        // Update severity based on attack count
        if (target.attacks > 50) target.severity = 'critical';
        else if (target.attacks > 20) target.severity = 'high';
        else if (target.attacks > 5) target.severity = 'medium';

        // Update country point on map
        this.updateCountryPoint(target);

        console.log(`%c⚡ Attack: ${source.name} → ${target.name} (${attackType.type})`, `color: ${attackType.color};`);
    }

    updateCountryPoint(country) {
        const point = this.mapContainer.querySelector(`[data-country="${country.code}"]`);
        if (!point) return;

        point.className = `map-point activity-${country.severity}`;

        const attackCount = point.querySelector('.attack-count');
        if (attackCount) {
            attackCount.textContent = `${country.attacks} attaques`;
        }

        const tooltip = point.querySelector('.map-tooltip');
        if (tooltip) {
            tooltip.innerHTML = `
                <strong>${country.name}</strong><br>
                <span class="attack-count">${country.attacks} attaques</span><br>
                ${this.getSeverityLabel(country.severity)}
            `;
        }
    }

    animateAttacks() {
        const overlay = this.mapContainer.querySelector('.attack-points-overlay');
        if (!overlay) {
            this.animationFrame = requestAnimationFrame(() => this.animateAttacks());
            return;
        }

        // Remove old attack animations
        const oldAttacks = overlay.querySelectorAll('.attack-animation');
        oldAttacks.forEach(el => {
            const age = Date.now() - parseInt(el.dataset.created);
            if (age > 5000) el.remove();
        });

        // Animate active attacks
        this.activeAttacks = this.activeAttacks.filter(attack => {
            attack.progress += attack.speed;

            if (attack.progress >= 1) {
                return false; // Remove completed attacks
            }

            // Create or update attack animation
            let attackEl = overlay.querySelector(`[data-attack-id="${attack.id}"]`);

            if (!attackEl) {
                attackEl = document.createElement('div');
                attackEl.className = 'attack-animation';
                attackEl.dataset.attackId = attack.id;
                attackEl.dataset.created = Date.now();
                attackEl.innerHTML = `
                    <div class="attack-line"></div>
                    <div class="attack-projectile">${attack.type.icon}</div>
                `;
                overlay.appendChild(attackEl);
            }

            // Calculate position
            const x = attack.source.x + (attack.target.x - attack.source.x) * attack.progress;
            const y = attack.source.y + (attack.target.y - attack.source.y) * attack.progress;

            // Position projectile
            const projectile = attackEl.querySelector('.attack-projectile');
            if (projectile) {
                projectile.style.cssText = `
                    position: absolute;
                    left: ${x}%;
                    top: ${y}%;
                    transform: translate(-50%, -50%);
                    font-size: 20px;
                    z-index: 100;
                    filter: drop-shadow(0 0 10px ${attack.type.color});
                    animation: pulse 0.5s infinite;
                `;
            }

            // Draw line from source to current position
            const line = attackEl.querySelector('.attack-line');
            if (line) {
                const angle = Math.atan2(
                    (attack.target.y - attack.source.y),
                    (attack.target.x - attack.source.x)
                ) * 180 / Math.PI;

                const distance = Math.sqrt(
                    Math.pow(attack.target.x - attack.source.x, 2) +
                    Math.pow(attack.target.y - attack.source.y, 2)
                ) * attack.progress;

                line.style.cssText = `
                    position: absolute;
                    left: ${attack.source.x}%;
                    top: ${attack.source.y}%;
                    width: ${distance}%;
                    height: 2px;
                    background: linear-gradient(90deg, ${attack.type.color}00, ${attack.type.color});
                    transform-origin: left center;
                    transform: rotate(${angle}deg);
                    opacity: ${1 - attack.progress};
                    z-index: 50;
                `;
            }

            return true;
        });

        this.animationFrame = requestAnimationFrame(() => this.animateAttacks());
    }

    updateCountryStats() {
        // Update attack counts on map tooltips
        this.countries.forEach(country => {
            this.updateCountryPoint(country);
        });

        // Update global stats in the UI
        this.updateGlobalStats();
    }

    updateGlobalStats() {
        const threatsBlocked = document.getElementById('threats-blocked');
        const phishingAttempts = document.getElementById('phishing-attempts');
        const ransomwareBlocked = document.getElementById('ransomware-blocked');
        const sitesInfected = document.getElementById('sites-infected');

        if (threatsBlocked) {
            threatsBlocked.textContent = this.formatNumber(this.stats.totalAttacks + 15847);
        }

        if (phishingAttempts) {
            const phishingCount = Math.floor(this.stats.totalAttacks * 0.25) + 3241;
            phishingAttempts.textContent = this.formatNumber(phishingCount);
        }

        if (ransomwareBlocked) {
            const ransomwareCount = Math.floor(this.stats.totalAttacks * 0.05) + 127;
            ransomwareBlocked.textContent = this.formatNumber(ransomwareCount);
        }

        if (sitesInfected) {
            const sitesCount = Math.floor(this.stats.totalAttacks * 0.02) + 892;
            sitesInfected.textContent = this.formatNumber(sitesCount);
        }
    }

    formatNumber(num) {
        return new Intl.NumberFormat('fr-FR').format(num);
    }

    showCountryDetails(country) {
        // Create a modal or alert with country details
        const details = `
📊 Statistiques pour ${country.name}

• Attaques détectées: ${country.attacks}
• Niveau de menace: ${this.getSeverityLabel(country.severity)}
• Code pays: ${country.code}

${country.attacks === 0 ? '✅ Aucune activité suspecte récente' : '⚠️ Activité cybercriminelle détectée'}
        `;

        alert(details);

        console.log(`%c🌍 Country Details: ${country.name}`, 'color: #00ffff; font-weight: bold;', country);
    }

    destroy() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.worldMap = new InteractiveWorldMap();
    }, 500);
});
