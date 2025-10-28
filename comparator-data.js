// ===== DONNÉES RÉELLES DU COMPARATEUR - MAJ 2025 =====

const comparatorData = {
    antivirus: [
        {
            name: "Bitdefender Total Security",
            logo: "🛡️",
            rating: 4.8,
            ratingCount: "12,450",
            prices: {
                monthly: 8.99,
                yearly: 42.49,
                yearlyOriginal: 89.99,
                discount: "-53%"
            },
            features: {
                realTimeProtection: true,
                vpn: false, // VPN limité 200MB/jour, pas inclus dans le prix
                devices: "5 appareils",
                countries: "50+ pays",
                moneyBack: "30 jours",
                support: "24/7",
                firewall: true,
                antiPhishing: true,
                antiRansomware: true,
                parentalControl: true,
                passwordManager: true,
                fileShredder: true,
                webcamProtection: true
            },
            pros: [
                "Meilleure détection de malware (99.9%)",
                "Impact minimal sur les performances",
                "Contrôle parental complet",
                "Anti-ransomware multicouche",
                "Optimisation système incluse"
            ],
            cons: [
                "VPN limité (200MB/jour)",
                "Interface parfois complexe",
                "Pas de version gratuite complète"
            ],
            bestFor: "Protection maximale pour toute la famille",
            link: "https://www.bitdefender.fr/",
            affiliateNote: "Prix promotionnel 2025"
        },
        {
            name: "Norton 360 Deluxe",
            logo: "🔒",
            rating: 4.7,
            ratingCount: "18,200",
            prices: {
                monthly: 7.99,
                yearly: 34.99,
                yearlyOriginal: 94.99,
                discount: "-63%"
            },
            features: {
                realTimeProtection: true,
                vpn: true, // VPN illimité inclus
                devices: "5 appareils",
                countries: "N/A",
                moneyBack: "60 jours",
                support: "24/7",
                firewall: true,
                antiPhishing: true,
                antiRansomware: true,
                parentalControl: true,
                passwordManager: true,
                cloudBackup: "50 GB",
                darkWebMonitoring: true
            },
            pros: [
                "VPN illimité inclus",
                "60 jours satisfait ou remboursé",
                "50 GB de sauvegarde cloud",
                "Surveillance du dark web",
                "Protection contre le vol d'identité"
            ],
            cons: [
                "Peut ralentir les anciens PC",
                "Notifications fréquentes",
                "Renouvellement automatique cher"
            ],
            bestFor: "Sécurité complète avec VPN illimité",
            link: "https://fr.norton.com/",
            affiliateNote: "Offre limitée 2025"
        },
        {
            name: "Kaspersky Total Security",
            logo: "🔐",
            rating: 4.7,
            ratingCount: "9,800",
            prices: {
                monthly: 5.99,
                yearly: 29.99,
                yearlyOriginal: 84.99,
                discount: "-65%"
            },
            features: {
                realTimeProtection: true,
                vpn: true, // VPN limité 300MB/jour
                devices: "5 appareils",
                countries: "N/A",
                moneyBack: "30 jours",
                support: "24/7",
                firewall: true,
                antiPhishing: true,
                antiRansomware: true,
                parentalControl: true,
                passwordManager: true,
                fileEncryption: true,
                securePayment: true
            },
            pros: [
                "Excellent rapport qualité/prix",
                "Protection bancaire dédiée",
                "Chiffrement de fichiers",
                "Très performant",
                "Interface intuitive"
            ],
            cons: [
                "Préoccupations géopolitiques (Russie)",
                "VPN limité (300MB/jour)",
                "Moins de services cloud"
            ],
            bestFor: "Protection économique et efficace",
            link: "https://www.kaspersky.fr/",
            affiliateNote: "Note: Société russe, considérations géopolitiques"
        },
        {
            name: "McAfee Total Protection",
            logo: "🛡",
            rating: 4.5,
            ratingCount: "15,600",
            prices: {
                monthly: 8.99,
                yearly: 39.99,
                yearlyOriginal: 99.99,
                discount: "-60%"
            },
            features: {
                realTimeProtection: true,
                vpn: true, // VPN illimité
                devices: "Illimité",
                countries: "N/A",
                moneyBack: "30 jours",
                support: "24/7",
                firewall: true,
                antiPhishing: true,
                antiRansomware: true,
                parentalControl: false,
                passwordManager: true,
                identityTheft: true
            },
            pros: [
                "Appareils ILLIMITÉS",
                "VPN illimité inclus",
                "Protection vol d'identité",
                "Compatible tous systèmes",
                "Optimisation PC"
            ],
            cons: [
                "Impact moyen sur performances",
                "Pas de contrôle parental (Total Protection)",
                "Interface chargée"
            ],
            bestFor: "Familles nombreuses (appareils illimités)",
            link: "https://www.mcafee.com/fr-fr/",
            affiliateNote: "Meilleur prix pour multi-appareils"
        },
        {
            name: "ESET Internet Security",
            logo: "🔰",
            rating: 4.6,
            ratingCount: "7,200",
            prices: {
                monthly: 6.66,
                yearly: 39.99,
                yearlyOriginal: 79.99,
                discount: "-50%"
            },
            features: {
                realTimeProtection: true,
                vpn: false,
                devices: "3 appareils",
                countries: "N/A",
                moneyBack: "30 jours",
                support: "24/7",
                firewall: true,
                antiPhishing: true,
                antiRansomware: true,
                parentalControl: true,
                passwordManager: false,
                networkProtection: true,
                botnetProtection: true
            },
            pros: [
                "Très léger (faible impact système)",
                "Excellente détection",
                "Protection réseau avancée",
                "Anti-botnet",
                "Mode gamer"
            ],
            cons: [
                "Pas de VPN",
                "Pas de gestionnaire de mots de passe",
                "Moins de fonctionnalités bonus"
            ],
            bestFor: "Performance et légèreté",
            link: "https://www.eset.com/fr/",
            affiliateNote: "Meilleur antivirus léger"
        }
    ],

    vpn: [
        {
            name: "NordVPN",
            logo: "🌐",
            rating: 4.7,
            ratingCount: "25,800",
            prices: {
                monthly: 12.99,
                yearly: 39.48, // 3.29€/mois x 12
                plan2years: 78.96, // 3.29€/mois x 24
                discount: "-69%",
                bestPlan: "2 ans"
            },
            features: {
                realTimeProtection: false,
                vpn: true,
                devices: "6 appareils",
                countries: "60+ pays",
                servers: "5800+",
                moneyBack: "30 jours",
                support: "24/7",
                speedTest: "Excellent",
                noLogs: true,
                killSwitch: true,
                splitTunneling: true,
                adBlocker: true, // Threat Protection
                doubleVPN: true,
                onionVPN: true,
                meshnet: true
            },
            pros: [
                "5800+ serveurs dans 60 pays",
                "NordLynx (WireGuard) ultra-rapide",
                "Threat Protection (anti-malware)",
                "Audit no-logs vérifié",
                "Double VPN et Onion",
                "Meshnet (réseau privé)"
            ],
            cons: [
                "Prix mensuel élevé",
                "Interface desktop perfectible",
                "Moins de fonctionnalités sur iOS"
            ],
            bestFor: "Meilleur VPN global qualité/prix",
            link: "https://nordvpn.com/fr/",
            affiliateNote: "Meilleur choix 2025"
        },
        {
            name: "ExpressVPN",
            logo: "⚡",
            rating: 4.6,
            ratingCount: "19,500",
            prices: {
                monthly: 12.95,
                yearly: 80.04, // 6.67€/mois x 12
                plan15months: 100.05, // 6.67€/mois x 15
                discount: "-49%",
                bestPlan: "15 mois"
            },
            features: {
                realTimeProtection: false,
                vpn: true,
                devices: "5 appareils",
                countries: "94 pays",
                servers: "3000+",
                moneyBack: "30 jours",
                support: "24/7",
                speedTest: "Excellent++",
                noLogs: true,
                killSwitch: true,
                splitTunneling: true,
                adBlocker: false,
                lightway: true // Protocole propriétaire
            },
            pros: [
                "Vitesse #1 (protocole Lightway)",
                "3000+ serveurs dans 94 pays",
                "Applications exceptionnelles",
                "Support client excellent",
                "Audit PwC no-logs",
                "Serveurs RAM uniquement"
            ],
            cons: [
                "Prix élevé",
                "5 appareils seulement",
                "Pas de bloqueur de pubs intégré"
            ],
            bestFor: "Vitesse maximale et fiabilité",
            link: "https://www.expressvpn.com/fr",
            affiliateNote: "Le plus rapide"
        },
        {
            name: "Surfshark",
            logo: "🦈",
            rating: 4.5,
            ratingCount: "16,300",
            prices: {
                monthly: 12.95,
                yearly: 47.88, // 3.99€/mois x 12
                plan2years: 52.56, // 2.19€/mois x 24
                discount: "-83%",
                bestPlan: "2 ans"
            },
            features: {
                realTimeProtection: false,
                vpn: true,
                devices: "Illimité",
                countries: "100 pays",
                servers: "3200+",
                moneyBack: "30 jours",
                support: "24/7",
                speedTest: "Très bon",
                noLogs: true,
                killSwitch: true,
                splitTunneling: true,
                adBlocker: true, // CleanWeb
                multiHop: true,
                gpsSpoof: true
            },
            pros: [
                "Appareils ILLIMITÉS",
                "Prix le plus bas (2.19€/mois)",
                "CleanWeb (bloque pubs et malware)",
                "MultiHop (double VPN)",
                "GPS spoofing (Android)",
                "Serveurs dans 100 pays"
            ],
            cons: [
                "Vitesse variable selon serveurs",
                "Interface moins polie",
                "Société récente (2018)"
            ],
            bestFor: "Meilleur rapport qualité/prix",
            link: "https://surfshark.com/fr",
            affiliateNote: "Idéal familles (appareils illimités)"
        },
        {
            name: "ProtonVPN",
            logo: "🔒",
            rating: 4.6,
            ratingCount: "11,200",
            prices: {
                monthly: 9.99,
                yearly: 59.88, // 4.99€/mois x 12
                plan2years: 107.76, // 4.49€/mois x 24
                discount: "-55%",
                bestPlan: "2 ans",
                free: true // Version gratuite disponible
            },
            features: {
                realTimeProtection: false,
                vpn: true,
                devices: "10 appareils",
                countries: "67 pays",
                servers: "1900+",
                moneyBack: "30 jours",
                support: "Email",
                speedTest: "Bon",
                noLogs: true,
                killSwitch: true,
                splitTunneling: true,
                adBlocker: true,
                secureCore: true, // Triple VPN
                torVPN: true
            },
            pros: [
                "Version GRATUITE (illimitée)",
                "Open source et audité",
                "Secure Core (triple VPN)",
                "Suisse (lois strictes vie privée)",
                "Par les créateurs de ProtonMail",
                "Support Tor"
            ],
            cons: [
                "Prix plus élevé que concurrents",
                "Vitesse moyenne",
                "Moins de serveurs",
                "Support email uniquement"
            ],
            bestFor: "Vie privée maximale et open source",
            link: "https://protonvpn.com/",
            affiliateNote: "Meilleur pour vie privée"
        },
        {
            name: "CyberGhost VPN",
            logo: "👻",
            rating: 4.5,
            ratingCount: "13,700",
            prices: {
                monthly: 12.99,
                yearly: 47.64, // 3.97€/mois x 12
                plan2years: 56.88, // 2.03€/mois x 28 (plan spécial)
                discount: "-84%",
                bestPlan: "28 mois"
            },
            features: {
                realTimeProtection: false,
                vpn: true,
                devices: "7 appareils",
                countries: "91 pays",
                servers: "9700+",
                moneyBack: "45 jours",
                support: "24/7",
                speedTest: "Très bon",
                noLogs: true,
                killSwitch: true,
                splitTunneling: false,
                adBlocker: true,
                dedicatedIP: true // Option payante
            },
            pros: [
                "9700+ serveurs (le plus grand réseau)",
                "45 jours satisfait ou remboursé",
                "Serveurs optimisés streaming",
                "7 appareils simultanés",
                "Interface très simple",
                "Prix très compétitif"
            ],
            cons: [
                "Pas de split tunneling",
                "Vitesse variable",
                "Basé en Roumanie (14 Eyes)"
            ],
            bestFor: "Streaming et facilité d'utilisation",
            link: "https://www.cyberghostvpn.com/fr_FR/",
            affiliateNote: "Plus grand réseau de serveurs"
        }
    ],

    passwordManagers: [
        {
            name: "Bitwarden Premium",
            logo: "🔐",
            rating: 4.8,
            ratingCount: "8,500",
            prices: {
                monthly: 0.83,
                yearly: 10,
                free: true,
                family: 40 // 6 utilisateurs
            },
            features: {
                devices: "Illimité",
                passwords: "Illimité",
                twoFactor: true,
                emergency: true,
                reports: true,
                storage: "1 GB chiffré",
                biometric: true,
                autoFill: true,
                generator: true,
                sharing: true
            },
            pros: [
                "Open source et audité",
                "Version gratuite excellente",
                "Prix imbattable (10€/an)",
                "Chiffrement zero-knowledge",
                "Auto-hébergement possible",
                "Support 2FA avancé"
            ],
            cons: [
                "Interface moins moderne",
                "Pas de changement auto de mdp",
                "Support communautaire (gratuit)"
            ],
            bestFor: "Meilleur rapport qualité/prix",
            link: "https://bitwarden.com/",
            affiliateNote: "Choix #1 recommandé"
        },
        {
            name: "1Password Families",
            logo: "🔑",
            rating: 4.7,
            ratingCount: "12,300",
            prices: {
                monthly: 4.99,
                yearly: 59.88,
                individual: 35.88,
                family: 59.88 // 5 utilisateurs
            },
            features: {
                devices: "Illimité",
                passwords: "Illimité",
                twoFactor: true,
                emergency: false,
                reports: true, // Watchtower
                storage: "1 GB",
                biometric: true,
                autoFill: true,
                generator: true,
                sharing: true,
                travelMode: true
            },
            pros: [
                "Interface exceptionnelle",
                "Watchtower (surveillance fuites)",
                "Mode voyage (cache coffres)",
                "Intégration parfaite tous OS",
                "Support client excellent",
                "Très sécurisé"
            ],
            cons: [
                "Pas de version gratuite",
                "Prix plus élevé",
                "Pas d'auto-hébergement"
            ],
            bestFor: "Interface et expérience premium",
            link: "https://1password.com/fr/",
            affiliateNote: "Le plus élégant"
        },
        {
            name: "Dashlane Premium",
            logo: "🛡️",
            rating: 4.5,
            ratingCount: "9,800",
            prices: {
                monthly: 4.99,
                yearly: 59.88,
                free: true, // Limité 50 mdp
                family: 89.88
            },
            features: {
                devices: "Illimité",
                passwords: "Illimité",
                twoFactor: true,
                emergency: false,
                reports: true,
                storage: "1 GB",
                biometric: true,
                autoFill: true,
                generator: true,
                sharing: true,
                vpn: true, // VPN inclus!
                darkWeb: true
            },
            pros: [
                "VPN intégré illimité",
                "Surveillance dark web",
                "Changement auto mots de passe",
                "Interface très moderne",
                "Dashboard sécurité complet"
            ],
            cons: [
                "Prix élevé",
                "Version gratuite limitée (50 mdp)",
                "VPN moyen"
            ],
            bestFor: "Fonctionnalités les plus complètes",
            link: "https://www.dashlane.com/fr",
            affiliateNote: "VPN inclus"
        }
    ]
};

// Fonction pour générer le HTML du comparateur
function generateComparatorHTML(category = 'vpn', maxItems = 3) {
    const items = comparatorData[category].slice(0, maxItems);

    let html = '<div class="comparison-table">';

    // Header
    html += '<div class="comparison-row header-row">';
    html += '<div class="comparison-cell feature-cell">FONCTIONNALITÉS</div>';

    items.forEach(item => {
        html += `
            <div class="comparison-cell">
                <div class="product-header">
                    <div class="product-logo">${item.logo}</div>
                    <h4>${item.name}</h4>
                    <div class="product-rating">${'★'.repeat(Math.floor(item.rating))}${'☆'.repeat(5-Math.floor(item.rating))} ${item.rating}/5</div>
                    <div class="product-price-container">
                        ${item.prices.discount ? `<span class="price-badge">${item.prices.discount}</span>` : ''}
                        <div class="product-price">${item.prices.yearly.toFixed(2)}€/an</div>
                        ${item.prices.yearlyOriginal ? `<div class="price-original">${item.prices.yearlyOriginal.toFixed(2)}€</div>` : ''}
                        ${item.prices.monthly ? `<div class="price-monthly">${item.prices.monthly.toFixed(2)}€/mois</div>` : ''}
                    </div>
                </div>
            </div>
        `;
    });

    html += '</div>';

    // Features rows
    const featureLabels = {
        realTimeProtection: "Protection temps réel",
        vpn: "VPN intégré",
        devices: "Nombre d'appareils",
        countries: "Pays disponibles",
        servers: "Serveurs",
        moneyBack: "Garantie remboursement",
        support: "Support client"
    };

    Object.keys(featureLabels).forEach(featureKey => {
        html += '<div class="comparison-row">';
        html += `<div class="comparison-cell feature-cell">${featureLabels[featureKey]}</div>`;

        items.forEach(item => {
            const value = item.features[featureKey];
            let displayValue = '';

            if (typeof value === 'boolean') {
                displayValue = value ? '✓' : '✗';
            } else if (value === null || value === undefined || value === 'N/A') {
                displayValue = 'N/A';
            } else {
                displayValue = value;
            }

            html += `<div class="comparison-cell">${displayValue}</div>`;
        });

        html += '</div>';
    });

    // CTA buttons
    html += '<div class="comparison-row cta-row">';
    html += '<div class="comparison-cell feature-cell"></div>';

    items.forEach(item => {
        html += `
            <div class="comparison-cell">
                <a href="${item.link}" target="_blank" rel="noopener" class="cyber-btn primary-btn">
                    <span class="btn-content">Choisir →</span>
                </a>
            </div>
        `;
    });

    html += '</div>';
    html += '</div>';

    return html;
}

// Export pour utilisation
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { comparatorData, generateComparatorHTML };
}

console.log('%c💰 Données réelles du comparateur chargées - 2025', 'color: #00ff00; font-weight: bold;');
console.log('Antivirus:', comparatorData.antivirus.length);
console.log('VPN:', comparatorData.vpn.length);
console.log('Gestionnaires mdp:', comparatorData.passwordManagers.length);
