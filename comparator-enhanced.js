// ===== ENHANCED COMPARATOR SYSTEM - CYBERGUARD PRO =====
// Personalized recommendations & detailed comparisons

class EnhancedComparator {
    constructor() {
        this.data = typeof comparatorData !== 'undefined' ? comparatorData : { antivirus: [], vpn: [] };
        this.userProfile = {
            usage: null,        // 'personal', 'family', 'business'
            budget: null,       // 'low', 'medium', 'high'
            priority: null,     // 'security', 'performance', 'features', 'price'
            devices: null,      // number
            platform: null      // 'windows', 'mac', 'multi'
        };

        this.quizModal = document.getElementById('quiz-modal');
        this.resultsContainer = document.getElementById('quiz-results');

        if (document.getElementById('start-quiz-btn')) {
            this.init();
        }
    }

    init() {
        this.setupQuizButtons();
        this.setupComparisonTables();
        console.log('%c🎯 Enhanced Comparator Initialized', 'color: #00ffff; font-weight: bold;');
    }

    setupQuizButtons() {
        // Start quiz button
        const startBtn = document.getElementById('start-quiz-btn');
        if (startBtn) {
            startBtn.addEventListener('click', () => this.startQuiz());
        }

        // Restart quiz button
        const restartBtn = document.getElementById('restart-quiz-btn');
        if (restartBtn) {
            restartBtn.addEventListener('click', () => this.startQuiz());
        }
    }

    setupComparisonTables() {
        // Setup detailed comparison tables
        const compareBtn = document.getElementById('detailed-compare-btn');
        if (compareBtn) {
            compareBtn.addEventListener('click', () => this.showDetailedComparison());
        }
    }

    startQuiz() {
        if (!this.quizModal) return;

        // Reset profile
        this.userProfile = {
            usage: null,
            budget: null,
            priority: null,
            devices: null,
            platform: null
        };

        // Show modal
        this.quizModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Start with first question
        this.showQuestion(1);

        console.log('%c📝 Quiz started', 'color: #00ffff;');
    }

    showQuestion(questionNumber) {
        // Hide all questions
        const allQuestions = this.quizModal.querySelectorAll('.quiz-question');
        allQuestions.forEach(q => q.classList.remove('active'));

        // Show specific question
        const question = this.quizModal.querySelector(`[data-question="${questionNumber}"]`);
        if (question) {
            question.classList.add('active');

            // Update progress
            this.updateProgress(questionNumber);

            // Setup answer buttons
            const answerBtns = question.querySelectorAll('.quiz-answer-btn');
            answerBtns.forEach(btn => {
                btn.onclick = () => this.selectAnswer(questionNumber, btn.dataset.value, btn.dataset.next);
            });
        }
    }

    updateProgress(currentQuestion) {
        const totalQuestions = 5;
        const progress = (currentQuestion / totalQuestions) * 100;

        const progressBar = this.quizModal.querySelector('.quiz-progress-fill');
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }

        const progressText = this.quizModal.querySelector('.quiz-progress-text');
        if (progressText) {
            progressText.textContent = `Question ${currentQuestion}/${totalQuestions}`;
        }
    }

    selectAnswer(questionNumber, value, next) {
        // Store answer
        switch(questionNumber) {
            case 1:
                this.userProfile.usage = value;
                break;
            case 2:
                this.userProfile.budget = value;
                break;
            case 3:
                this.userProfile.priority = value;
                break;
            case 4:
                this.userProfile.devices = parseInt(value);
                break;
            case 5:
                this.userProfile.platform = value;
                break;
        }

        console.log(`%c✓ Answer ${questionNumber}: ${value}`, 'color: #00ff00;');

        // Next question or show results
        if (next === 'results') {
            this.showResults();
        } else {
            this.showQuestion(parseInt(next));
        }
    }

    showResults() {
        // Calculate recommendations
        const recommendations = this.calculateRecommendations();

        // Hide questions
        const allQuestions = this.quizModal.querySelectorAll('.quiz-question');
        allQuestions.forEach(q => q.classList.remove('active'));

        // Show results
        if (this.resultsContainer) {
            this.resultsContainer.classList.add('active');
            this.renderResults(recommendations);
        }

        console.log('%c🎉 Quiz completed!', 'color: #00ff00; font-weight: bold;', this.userProfile);
    }

    calculateRecommendations() {
        const allProducts = [
            ...this.data.antivirus.map(p => ({...p, type: 'antivirus'})),
            ...this.data.vpn.map(p => ({...p, type: 'vpn'}))
        ];

        // Score each product
        const scored = allProducts.map(product => {
            let score = 0;

            // Budget scoring
            if (this.userProfile.budget === 'low' && product.prices.yearly < 40) score += 30;
            if (this.userProfile.budget === 'medium' && product.prices.yearly >= 40 && product.prices.yearly < 80) score += 30;
            if (this.userProfile.budget === 'high' && product.prices.yearly >= 80) score += 30;

            // Usage scoring
            if (this.userProfile.usage === 'personal' && product.features.devices !== 'Illimité') score += 20;
            if (this.userProfile.usage === 'family' && (product.features.devices === '5 appareils' || product.features.devices === 'Illimité')) score += 25;
            if (this.userProfile.usage === 'business' && product.features.devices === 'Illimité') score += 30;

            // Priority scoring
            if (this.userProfile.priority === 'security' && product.rating >= 4.7) score += 25;
            if (this.userProfile.priority === 'performance' && product.name.includes('Bitdefender')) score += 25;
            if (this.userProfile.priority === 'features' && Object.keys(product.features).length > 10) score += 25;
            if (this.userProfile.priority === 'price' && product.prices.yearly < 50) score += 30;

            // Platform scoring (for VPNs especially)
            if (product.type === 'vpn') {
                if (this.userProfile.platform === 'multi' && product.features.devices === 'Illimité') score += 20;
            }

            // Rating bonus
            score += product.rating * 5;

            return { ...product, score };
        });

        // Sort by score and return top 3
        return scored.sort((a, b) => b.score - a.score).slice(0, 3);
    }

    renderResults(recommendations) {
        if (!this.resultsContainer) return;

        const profileSummary = this.getProfileSummary();

        let html = `
            <div class="quiz-results-header">
                <div class="results-icon">🎯</div>
                <h2>Vos Recommandations Personnalisées</h2>
                <p class="results-profile">${profileSummary}</p>
            </div>

            <div class="recommendations-grid">
        `;

        recommendations.forEach((product, index) => {
            const badge = index === 0 ? '🥇 MEILLEUR CHOIX' : index === 1 ? '🥈 EXCELLENT' : '🥉 TRÈS BON';
            const badgeClass = index === 0 ? 'gold' : index === 1 ? 'silver' : 'bronze';

            html += `
                <div class="recommendation-card" data-aos="fade-up" data-aos-delay="${index * 100}">
                    <div class="recommendation-badge ${badgeClass}">${badge}</div>
                    <div class="recommendation-header">
                        <div class="recommendation-logo">${product.logo}</div>
                        <div>
                            <h3>${product.name}</h3>
                            <div class="recommendation-rating">
                                ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                                <span>${product.rating}/5</span>
                            </div>
                        </div>
                    </div>

                    <div class="recommendation-price">
                        <div class="price-main">${product.prices.yearly}€<span>/an</span></div>
                        <div class="price-original">${product.prices.yearlyOriginal}€</div>
                        <div class="price-discount">${product.prices.discount}</div>
                    </div>

                    <div class="recommendation-match">
                        <div class="match-label">Correspondance</div>
                        <div class="match-bar">
                            <div class="match-fill" style="width: ${product.score}%"></div>
                        </div>
                        <div class="match-percentage">${Math.round(product.score)}%</div>
                    </div>

                    <div class="recommendation-why">
                        <strong>Pourquoi ce choix ?</strong>
                        <ul>
                            ${this.getRecommendationReasons(product).map(reason => `<li>${reason}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="recommendation-features">
                        <div class="feature-item">✓ ${product.features.devices}</div>
                        <div class="feature-item">✓ Support ${product.features.support}</div>
                        <div class="feature-item">✓ ${product.features.moneyBack} garantie</div>
                    </div>

                    <a href="${product.link}" target="_blank" class="recommendation-btn">
                        <span>Voir l'offre</span>
                        <span class="btn-arrow">→</span>
                    </a>
                </div>
            `;
        });

        html += `
            </div>

            <div class="results-actions">
                <button class="quiz-btn secondary" id="restart-quiz-btn">
                    <span>🔄 Refaire le quiz</span>
                </button>
                <button class="quiz-btn primary" onclick="document.getElementById('quiz-modal').classList.remove('active'); document.body.style.overflow = '';">
                    <span>✓ Fermer</span>
                </button>
            </div>
        `;

        this.resultsContainer.innerHTML = html;

        // Setup restart button
        this.setupQuizButtons();
    }

    getProfileSummary() {
        const usageMap = {
            'personal': 'Usage personnel',
            'family': 'Usage familial',
            'business': 'Usage professionnel'
        };

        const budgetMap = {
            'low': 'Budget limité',
            'medium': 'Budget moyen',
            'high': 'Budget flexible'
        };

        const priorityMap = {
            'security': 'Priorité sécurité',
            'performance': 'Priorité performance',
            'features': 'Priorité fonctionnalités',
            'price': 'Priorité prix'
        };

        return `${usageMap[this.userProfile.usage]} • ${budgetMap[this.userProfile.budget]} • ${priorityMap[this.userProfile.priority]} • ${this.userProfile.devices} appareil(s)`;
    }

    getRecommendationReasons(product) {
        const reasons = [];

        // Based on user profile
        if (this.userProfile.priority === 'price' && product.prices.yearly < 50) {
            reasons.push('Excellent rapport qualité/prix');
        }

        if (this.userProfile.priority === 'security' && product.rating >= 4.7) {
            reasons.push('Taux de détection exceptionnel');
        }

        if (this.userProfile.usage === 'family' && product.features.parentalControl) {
            reasons.push('Contrôle parental inclus');
        }

        if (this.userProfile.usage === 'business' && product.features.devices === 'Illimité') {
            reasons.push('Appareils illimités pour votre équipe');
        }

        // Product specific
        if (product.features.vpn) {
            reasons.push('VPN inclus pour la confidentialité');
        }

        if (product.bestFor) {
            reasons.push(product.bestFor);
        }

        // Always add rating if high
        if (product.rating >= 4.7) {
            reasons.push(`Note exceptionnelle: ${product.rating}/5`);
        }

        return reasons.slice(0, 3); // Max 3 reasons
    }

    showDetailedComparison() {
        // Show detailed comparison modal/section
        console.log('%c📊 Detailed comparison requested', 'color: #00ffff;');

        // This could open a modal or scroll to a detailed comparison section
        // For now, let's scroll to the comparison section
        const compSection = document.getElementById('comparateur');
        if (compSection) {
            compSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    closeQuiz() {
        if (this.quizModal) {
            this.quizModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.enhancedComparator = new EnhancedComparator();
    }, 100);
});
