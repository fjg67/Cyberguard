/**
 * CYBERGUARD PRO - QUIZ DE RECOMMANDATION INTERACTIF
 * Quiz intelligent pour recommander la meilleure solution de cybersécurité
 */

class RecommendationQuiz {
    constructor() {
        this.currentQuestion = 0;
        this.answers = {};
        this.modal = null;
        this.startBtn = document.getElementById('start-recommendation-quiz-btn');

        // Questions avec scoring pour chaque antivirus
        this.questions = [
            {
                id: 'threat_level',
                icon: '🎯',
                question: 'Quel est votre niveau d\'exposition aux menaces ?',
                subtitle: 'Évaluez votre risque quotidien',
                options: [
                    {
                        icon: '🏠',
                        title: 'Usage basique',
                        description: 'Navigation web occasionnelle, emails simples',
                        value: 'low',
                        scores: { 'Norton': 8, 'Bitdefender': 9, 'Kaspersky': 8, 'ESET': 9, 'Avast': 10 }
                    },
                    {
                        icon: '💼',
                        title: 'Usage quotidien',
                        description: 'Travail, achats en ligne, réseaux sociaux',
                        value: 'medium',
                        scores: { 'Norton': 9, 'Bitdefender': 10, 'Kaspersky': 9, 'ESET': 9, 'Avast': 8 }
                    },
                    {
                        icon: '⚡',
                        title: 'Usage intensif',
                        description: 'Téléchargements fréquents, sites variés, données sensibles',
                        value: 'high',
                        scores: { 'Norton': 9, 'Bitdefender': 10, 'Kaspersky': 10, 'ESET': 8, 'Avast': 7 }
                    },
                    {
                        icon: '🔥',
                        title: 'Usage critique',
                        description: 'Entreprise, données confidentielles, transactions financières',
                        value: 'critical',
                        scores: { 'Norton': 8, 'Bitdefender': 10, 'Kaspersky': 10, 'ESET': 9, 'Avast': 6 }
                    }
                ]
            },
            {
                id: 'budget',
                icon: '💰',
                question: 'Quel budget êtes-vous prêt à investir ?',
                subtitle: 'Pour une protection annuelle',
                options: [
                    {
                        icon: '🆓',
                        title: 'Gratuit uniquement',
                        description: 'Je cherche une solution gratuite',
                        value: 'free',
                        scores: { 'Norton': 0, 'Bitdefender': 5, 'Kaspersky': 4, 'ESET': 0, 'Avast': 10 }
                    },
                    {
                        icon: '💵',
                        title: 'Économique',
                        description: '20€ - 40€ par an',
                        value: 'low',
                        scores: { 'Norton': 6, 'Bitdefender': 8, 'Kaspersky': 7, 'ESET': 9, 'Avast': 10 }
                    },
                    {
                        icon: '💳',
                        title: 'Standard',
                        description: '40€ - 80€ par an',
                        value: 'medium',
                        scores: { 'Norton': 9, 'Bitdefender': 10, 'Kaspersky': 9, 'ESET': 10, 'Avast': 8 }
                    },
                    {
                        icon: '💎',
                        title: 'Premium',
                        description: '80€+ par an, la meilleure protection',
                        value: 'high',
                        scores: { 'Norton': 10, 'Bitdefender': 10, 'Kaspersky': 9, 'ESET': 8, 'Avast': 6 }
                    }
                ]
            },
            {
                id: 'priority',
                icon: '⭐',
                question: 'Quelle est votre priorité principale ?',
                subtitle: 'Choisissez ce qui compte le plus pour vous',
                options: [
                    {
                        icon: '🛡️',
                        title: 'Protection maximale',
                        description: 'Taux de détection le plus élevé possible',
                        value: 'protection',
                        scores: { 'Norton': 9, 'Bitdefender': 10, 'Kaspersky': 10, 'ESET': 9, 'Avast': 8 }
                    },
                    {
                        icon: '⚡',
                        title: 'Performance système',
                        description: 'Impact minimal sur la vitesse de mon PC',
                        value: 'performance',
                        scores: { 'Norton': 8, 'Bitdefender': 9, 'Kaspersky': 7, 'ESET': 10, 'Avast': 8 }
                    },
                    {
                        icon: '🎁',
                        title: 'Fonctionnalités complètes',
                        description: 'VPN, gestionnaire de mots de passe, etc.',
                        value: 'features',
                        scores: { 'Norton': 10, 'Bitdefender': 9, 'Kaspersky': 9, 'ESET': 7, 'Avast': 8 }
                    },
                    {
                        icon: '👤',
                        title: 'Facilité d\'utilisation',
                        description: 'Interface simple et intuitive',
                        value: 'usability',
                        scores: { 'Norton': 9, 'Bitdefender': 8, 'Kaspersky': 7, 'ESET': 8, 'Avast': 10 }
                    }
                ]
            },
            {
                id: 'devices',
                icon: '📱',
                question: 'Combien d\'appareils devez-vous protéger ?',
                subtitle: 'PC, smartphones, tablettes...',
                options: [
                    {
                        icon: '💻',
                        title: '1 appareil',
                        description: 'Mon ordinateur principal uniquement',
                        value: '1',
                        scores: { 'Norton': 8, 'Bitdefender': 9, 'Kaspersky': 9, 'ESET': 10, 'Avast': 9 }
                    },
                    {
                        icon: '📱',
                        title: '2-3 appareils',
                        description: 'PC + smartphone/tablette',
                        value: '3',
                        scores: { 'Norton': 9, 'Bitdefender': 10, 'Kaspersky': 9, 'ESET': 9, 'Avast': 9 }
                    },
                    {
                        icon: '🏠',
                        title: '4-5 appareils',
                        description: 'Protection pour toute la famille',
                        value: '5',
                        scores: { 'Norton': 10, 'Bitdefender': 10, 'Kaspersky': 9, 'ESET': 8, 'Avast': 10 }
                    },
                    {
                        icon: '🏢',
                        title: '6+ appareils',
                        description: 'Grande famille ou petite entreprise',
                        value: '10',
                        scores: { 'Norton': 9, 'Bitdefender': 10, 'Kaspersky': 10, 'ESET': 9, 'Avast': 8 }
                    }
                ]
            },
            {
                id: 'platform',
                icon: '💻',
                question: 'Quelles plateformes utilisez-vous ?',
                subtitle: 'Systèmes d\'exploitation à protéger',
                options: [
                    {
                        icon: '🪟',
                        title: 'Windows uniquement',
                        description: 'PC Windows seulement',
                        value: 'windows',
                        scores: { 'Norton': 9, 'Bitdefender': 10, 'Kaspersky': 10, 'ESET': 10, 'Avast': 9 }
                    },
                    {
                        icon: '🍎',
                        title: 'macOS uniquement',
                        description: 'Mac seulement',
                        value: 'mac',
                        scores: { 'Norton': 9, 'Bitdefender': 10, 'Kaspersky': 8, 'ESET': 9, 'Avast': 9 }
                    },
                    {
                        icon: '📱',
                        title: 'Mobile (Android/iOS)',
                        description: 'Smartphones et tablettes',
                        value: 'mobile',
                        scores: { 'Norton': 9, 'Bitdefender': 10, 'Kaspersky': 9, 'ESET': 8, 'Avast': 10 }
                    },
                    {
                        icon: '🌐',
                        title: 'Multi-plateformes',
                        description: 'Windows, Mac, Android, iOS',
                        value: 'multi',
                        scores: { 'Norton': 10, 'Bitdefender': 10, 'Kaspersky': 9, 'ESET': 9, 'Avast': 10 }
                    }
                ]
            }
        ];

        this.init();
    }

    init() {
        if (this.startBtn) {
            console.log('✅ Recommendation Quiz: Bouton trouvé, event listener ajouté');
            this.startBtn.addEventListener('click', () => {
                console.log('🎯 Recommendation Quiz: Bouton cliqué, démarrage du quiz...');
                this.startQuiz();
            });
        } else {
            console.error('❌ Recommendation Quiz: Bouton #start-recommendation-quiz-btn introuvable');
        }
    }

    startQuiz() {
        this.currentQuestion = 0;
        this.answers = {};
        this.createModal();
        this.showQuestion();
    }

    createModal() {
        // Créer la modal si elle n'existe pas
        if (document.getElementById('recommendation-quiz-modal')) {
            this.modal = document.getElementById('recommendation-quiz-modal');
            this.modal.classList.add('active');
            return;
        }

        const modalHTML = `
            <div id="recommendation-quiz-modal" class="recommendation-quiz-modal active">
                <div class="quiz-modal-overlay"></div>
                <div class="quiz-modal-container">
                    <button class="quiz-close-btn" aria-label="Fermer">
                        <span>✕</span>
                    </button>

                    <div class="quiz-progress-container">
                        <div class="quiz-progress-bar">
                            <div class="quiz-progress-fill"></div>
                        </div>
                        <div class="quiz-progress-text">Question <span class="current-q">1</span>/<span class="total-q">5</span></div>
                    </div>

                    <div class="quiz-content">
                        <!-- Questions will be injected here -->
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('recommendation-quiz-modal');

        // Fermer la modal
        const closeBtn = this.modal.querySelector('.quiz-close-btn');
        const overlay = this.modal.querySelector('.quiz-modal-overlay');

        closeBtn.addEventListener('click', () => this.closeModal());
        overlay.addEventListener('click', () => this.closeModal());

        // Empêcher le scroll du body
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        if (this.modal) {
            this.modal.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => {
                this.modal.remove();
                this.modal = null;
            }, 300);
        }
    }

    showQuestion() {
        const question = this.questions[this.currentQuestion];
        const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;

        // Mettre à jour la barre de progression
        const progressBar = this.modal.querySelector('.quiz-progress-fill');
        const currentQ = this.modal.querySelector('.current-q');
        const totalQ = this.modal.querySelector('.total-q');

        progressBar.style.width = `${progress}%`;
        currentQ.textContent = this.currentQuestion + 1;
        totalQ.textContent = this.questions.length;

        // Afficher la question
        const content = this.modal.querySelector('.quiz-content');
        content.innerHTML = `
            <div class="quiz-question-container fade-in">
                <div class="quiz-question-header">
                    <div class="quiz-question-icon">${question.icon}</div>
                    <h2 class="quiz-question-title">${question.question}</h2>
                    <p class="quiz-question-subtitle">${question.subtitle}</p>
                </div>

                <div class="quiz-options">
                    ${question.options.map((option, index) => `
                        <button class="quiz-option-btn" data-index="${index}" data-value="${option.value}">
                            <span class="option-icon">${option.icon}</span>
                            <div class="option-content">
                                <div class="option-title">${option.title}</div>
                                <div class="option-description">${option.description}</div>
                            </div>
                            <span class="option-arrow">→</span>
                        </button>
                    `).join('')}
                </div>

                ${this.currentQuestion > 0 ? `
                    <button class="quiz-back-btn">
                        <span>←</span> Question précédente
                    </button>
                ` : ''}
            </div>
        `;

        // Ajouter les event listeners
        const optionBtns = content.querySelectorAll('.quiz-option-btn');
        optionBtns.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(btn.dataset.index);
                const value = btn.dataset.value;
                this.selectAnswer(question.id, question.options[index]);
            });
        });

        // Bouton retour
        const backBtn = content.querySelector('.quiz-back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => this.previousQuestion());
        }
    }

    selectAnswer(questionId, option) {
        // Sauvegarder la réponse
        this.answers[questionId] = option;

        // Animation de sélection
        const selectedBtn = event.target.closest('.quiz-option-btn');
        selectedBtn.classList.add('selected');

        setTimeout(() => {
            this.currentQuestion++;
            if (this.currentQuestion < this.questions.length) {
                this.showQuestion();
            } else {
                this.showResults();
            }
        }, 300);
    }

    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.showQuestion();
        }
    }

    calculateScores() {
        const scores = {
            'Norton': 0,
            'Bitdefender': 0,
            'Kaspersky': 0,
            'ESET': 0,
            'Avast': 0
        };

        // Calculer les scores basés sur les réponses
        Object.values(this.answers).forEach(answer => {
            Object.keys(answer.scores).forEach(antivirus => {
                scores[antivirus] += answer.scores[antivirus];
            });
        });

        // Trier par score décroissant
        const sortedScores = Object.entries(scores)
            .sort(([, a], [, b]) => b - a)
            .map(([name, score]) => ({ name, score, percentage: (score / 50) * 100 }));

        return sortedScores;
    }

    getAntivirusDetails(name) {
        const details = {
            'Norton': {
                badge: '🏆',
                tagline: 'Leader mondial de la cybersécurité',
                features: ['VPN illimité inclus', 'Protection 100% virus', 'Gestionnaire de mots de passe', 'Surveillance Dark Web'],
                price: '29.99€',
                color: '#FFD700'
            },
            'Bitdefender': {
                badge: '⭐',
                tagline: 'Meilleur taux de détection 2024',
                features: ['Anti-ransomware avancé', 'Protection multi-couches', 'VPN (200MB/jour)', 'Optimisation PC'],
                price: '34.99€',
                color: '#00D4FF'
            },
            'Kaspersky': {
                badge: '🛡️',
                tagline: 'Expertise en cybersécurité',
                features: ['Technologie cloud avancée', 'Protection webcam', 'Contrôle parental', 'Paiements sécurisés'],
                price: '32.99€',
                color: '#00FF88'
            },
            'ESET': {
                badge: '⚡',
                tagline: 'Léger et performant',
                features: ['Impact minimal système', 'Anti-phishing avancé', 'Protection IoT', 'Chiffrement'],
                price: '39.99€',
                color: '#FF00FF'
            },
            'Avast': {
                badge: '💚',
                tagline: 'Version gratuite disponible',
                features: ['Antivirus gratuit', 'Protection en temps réel', 'Scan des vulnérabilités', 'Protection Wi-Fi'],
                price: 'Gratuit / 49.99€',
                color: '#FF8800'
            }
        };

        return details[name] || {};
    }

    showResults() {
        const scores = this.calculateScores();
        const winner = scores[0];
        const runnerUps = scores.slice(1, 3);

        const winnerDetails = this.getAntivirusDetails(winner.name);

        const content = this.modal.querySelector('.quiz-content');
        content.innerHTML = `
            <div class="quiz-results-container fade-in">
                <div class="results-header">
                    <div class="results-icon">🎯</div>
                    <h2 class="results-title">Votre solution idéale</h2>
                    <p class="results-subtitle">Basé sur vos réponses, voici notre recommandation personnalisée</p>
                </div>

                <div class="winner-card">
                    <div class="winner-badge">${winnerDetails.badge} RECOMMANDÉ</div>
                    <h3 class="winner-name">${winner.name}</h3>
                    <p class="winner-tagline">${winnerDetails.tagline}</p>

                    <div class="winner-score">
                        <div class="score-bar-container">
                            <div class="score-bar" style="width: ${winner.percentage}%; background: ${winnerDetails.color}"></div>
                        </div>
                        <div class="score-text">${Math.round(winner.percentage)}% compatible avec vos besoins</div>
                    </div>

                    <div class="winner-features">
                        ${winnerDetails.features.map(feature => `
                            <div class="feature-item">
                                <span class="feature-icon">✓</span>
                                <span>${feature}</span>
                            </div>
                        `).join('')}
                    </div>

                    <div class="winner-price">
                        <span class="price-label">À partir de</span>
                        <span class="price-value">${winnerDetails.price}</span>
                        <span class="price-period">/an</span>
                    </div>

                    <button class="btn-cyber btn-premium winner-cta">
                        <span>🛡️</span> Voir ${winner.name}
                    </button>
                </div>

                <div class="alternatives-section">
                    <h4 class="alternatives-title">Autres solutions adaptées</h4>
                    <div class="alternatives-grid">
                        ${runnerUps.map(alt => {
                            const altDetails = this.getAntivirusDetails(alt.name);
                            return `
                                <div class="alternative-card">
                                    <div class="alt-header">
                                        <span class="alt-badge">${altDetails.badge}</span>
                                        <span class="alt-name">${alt.name}</span>
                                    </div>
                                    <div class="alt-score-bar">
                                        <div class="alt-score-fill" style="width: ${alt.percentage}%; background: ${altDetails.color}"></div>
                                    </div>
                                    <div class="alt-match">${Math.round(alt.percentage)}% compatible</div>
                                    <button class="alt-btn">Voir les détails →</button>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <div class="results-actions">
                    <button class="btn-restart-quiz">
                        <span>🔄</span> Refaire le quiz
                    </button>
                    <button class="btn-compare">
                        <span>📊</span> Comparer toutes les solutions
                    </button>
                </div>
            </div>
        `;

        // Event listeners pour les résultats
        const restartBtn = content.querySelector('.btn-restart-quiz');
        restartBtn.addEventListener('click', () => {
            this.currentQuestion = 0;
            this.answers = {};
            this.showQuestion();
        });

        const compareBtn = content.querySelector('.btn-compare');
        compareBtn.addEventListener('click', () => {
            this.closeModal();
            document.getElementById('comparateur')?.scrollIntoView({ behavior: 'smooth' });
        });

        const winnerCta = content.querySelector('.winner-cta');
        winnerCta.addEventListener('click', () => {
            this.closeModal();
            // Scroll vers la section comparateur avec filtre
            document.getElementById('comparateur')?.scrollIntoView({ behavior: 'smooth' });
        });

        // Track dans analytics
        if (window.analyticsTracker) {
            window.analyticsTracker.trackEvent('quiz_completed', {
                recommendation: winner.name,
                score: winner.percentage,
                total_questions: this.questions.length
            });
        }
    }
}

// Initialiser le quiz quand le DOM est prêt
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new RecommendationQuiz();
    });
} else {
    // DOM déjà chargé (defer script)
    new RecommendationQuiz();
}
