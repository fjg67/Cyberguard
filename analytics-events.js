/**
 * ═══════════════════════════════════════════════════════════════
 * ANALYTICS EVENTS TRACKER - Google Analytics 4 Custom Events
 * ═══════════════════════════════════════════════════════════════
 * Tracks all user interactions for data-driven insights
 */

class AnalyticsTracker {
    constructor() {
        this.isGALoaded = typeof gtag !== 'undefined';
        this.isClarityLoaded = typeof clarity !== 'undefined';

        if (this.isGALoaded) {
            console.log('📊 Analytics Tracker initialized - GA4 ready');
        }

        if (this.isClarityLoaded) {
            console.log('📊 Microsoft Clarity ready');
        }

        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.attachEventListeners());
        } else {
            this.attachEventListeners();
        }
    }

    // Generic event tracking
    trackEvent(eventName, parameters = {}) {
        if (!this.isGALoaded) {
            console.warn('GA4 not loaded, skipping event:', eventName);
            return;
        }

        gtag('event', eventName, parameters);
        console.log(`📊 Event tracked: ${eventName}`, parameters);
    }

    // Clarity custom tags
    trackClarityTag(tagName) {
        if (!this.isClarityLoaded) return;
        clarity('set', tagName, 'true');
    }

    attachEventListeners() {
        // Security Tools Events
        this.trackSecurityTools();

        // Comparator Events
        this.trackComparator();

        // Newsletter Events
        this.trackNewsletter();

        // Blog Events
        this.trackBlog();

        // Quiz Events
        this.trackQuiz();

        // Theme & Language Events
        this.trackPreferences();

        // Navigation Events
        this.trackNavigation();

        // Downloads & External Links
        this.trackDownloads();
    }

    // ==================== SECURITY TOOLS ====================
    trackSecurityTools() {
        // URL Scanner
        const urlScanForm = document.getElementById('url-scan-form');
        if (urlScanForm) {
            urlScanForm.addEventListener('submit', (e) => {
                const url = document.getElementById('url-input')?.value;
                this.trackEvent('security_scan_started', {
                    tool_type: 'url_scanner',
                    scan_url_length: url?.length || 0
                });
                this.trackClarityTag('used_url_scanner');
            });
        }

        // Email Breach Checker
        const emailCheckForm = document.getElementById('email-check-form');
        if (emailCheckForm) {
            emailCheckForm.addEventListener('submit', (e) => {
                this.trackEvent('security_scan_started', {
                    tool_type: 'email_breach_checker'
                });
                this.trackClarityTag('used_breach_checker');
            });
        }

        // Password Strength Checker
        const passwordInput = document.getElementById('password-strength-input');
        if (passwordInput) {
            let typingTimer;
            passwordInput.addEventListener('input', () => {
                clearTimeout(typingTimer);
                typingTimer = setTimeout(() => {
                    this.trackEvent('tool_interaction', {
                        tool_name: 'password_strength_checker',
                        interaction_type: 'check'
                    });
                }, 2000); // Track after 2 seconds of no typing
            });
        }

        // Password Generator
        const generatePasswordBtn = document.getElementById('generate-password-btn');
        if (generatePasswordBtn) {
            generatePasswordBtn.addEventListener('click', () => {
                this.trackEvent('tool_interaction', {
                    tool_name: 'password_generator',
                    interaction_type: 'generate'
                });
            });
        }
    }

    // ==================== COMPARATOR ====================
    trackComparator() {
        // Antivirus selection
        document.addEventListener('click', (e) => {
            const antivirusCard = e.target.closest('.antivirus-card');
            if (antivirusCard) {
                const productName = antivirusCard.querySelector('h3')?.textContent;
                this.trackEvent('comparator_interaction', {
                    product_type: 'antivirus',
                    product_name: productName,
                    action: 'view_details'
                });
            }

            // VPN selection
            const vpnCard = e.target.closest('.vpn-card');
            if (vpnCard) {
                const productName = vpnCard.querySelector('h3')?.textContent;
                this.trackEvent('comparator_interaction', {
                    product_type: 'vpn',
                    product_name: productName,
                    action: 'view_details'
                });
            }
        });

        // Compare button clicks
        const compareButtons = document.querySelectorAll('.compare-btn');
        compareButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.trackEvent('comparator_action', {
                    action: 'compare_products',
                    button_location: btn.dataset.location || 'unknown'
                });
                this.trackClarityTag('used_comparator');
            });
        });
    }

    // ==================== NEWSLETTER ====================
    trackNewsletter() {
        const newsletterForm = document.getElementById('newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                this.trackEvent('newsletter_signup', {
                    form_location: 'footer',
                    method: 'email'
                });
                this.trackClarityTag('newsletter_signup');
            });
        }

        // Track newsletter input focus (interest)
        const newsletterInput = document.getElementById('newsletter-email');
        if (newsletterInput) {
            let focused = false;
            newsletterInput.addEventListener('focus', () => {
                if (!focused) {
                    this.trackEvent('newsletter_interest', {
                        action: 'input_focused'
                    });
                    focused = true;
                }
            });
        }
    }

    // ==================== BLOG ====================
    trackBlog() {
        // Blog article clicks
        document.addEventListener('click', (e) => {
            const articleCard = e.target.closest('.blog-card, .article-card');
            if (articleCard) {
                const articleTitle = articleCard.querySelector('h3, h4')?.textContent;
                const articleCategory = articleCard.dataset.category || 'uncategorized';

                this.trackEvent('blog_article_click', {
                    article_title: articleTitle,
                    article_category: articleCategory
                });
            }
        });

        // Blog category filter
        const categoryFilters = document.querySelectorAll('.blog-category-filter');
        categoryFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                this.trackEvent('blog_filter', {
                    filter_type: 'category',
                    filter_value: filter.dataset.category
                });
            });
        });
    }

    // ==================== QUIZ ====================
    trackQuiz() {
        // Quiz start
        const startQuizBtn = document.getElementById('start-quiz-btn');
        if (startQuizBtn) {
            startQuizBtn.addEventListener('click', () => {
                this.trackEvent('quiz_started', {
                    quiz_type: 'cybersecurity_knowledge'
                });
                this.trackClarityTag('started_quiz');
            });
        }

        // Quiz completion (listen for custom event from quiz.js)
        window.addEventListener('quizCompleted', (e) => {
            this.trackEvent('quiz_completed', {
                score: e.detail.score,
                total_questions: e.detail.totalQuestions,
                percentage: e.detail.percentage,
                time_taken: e.detail.timeTaken
            });
            this.trackClarityTag('completed_quiz');
        });

        // Quiz answer selection
        document.addEventListener('click', (e) => {
            const quizAnswer = e.target.closest('.quiz-answer');
            if (quizAnswer) {
                this.trackEvent('quiz_answer_selected', {
                    question_number: quizAnswer.dataset.questionNumber,
                    answer_index: quizAnswer.dataset.answerIndex
                });
            }
        });
    }

    // ==================== PREFERENCES ====================
    trackPreferences() {
        // Theme changes
        window.addEventListener('themeChange', (e) => {
            this.trackEvent('preference_change', {
                preference_type: 'theme',
                preference_value: e.detail.theme
            });
        });

        // Language changes
        window.addEventListener('languageChange', (e) => {
            this.trackEvent('preference_change', {
                preference_type: 'language',
                preference_value: e.detail.language
            });
            this.trackClarityTag(`language_${e.detail.language}`);
        });
    }

    // ==================== NAVIGATION ====================
    trackNavigation() {
        // Track navigation clicks
        const navLinks = document.querySelectorAll('.nav-menu a, .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const linkText = link.textContent.trim();
                const linkHref = link.getAttribute('href');

                this.trackEvent('navigation_click', {
                    link_text: linkText,
                    link_destination: linkHref,
                    link_type: linkHref.startsWith('#') ? 'internal' : 'external'
                });
            });
        });

        // Track scroll depth
        let scrollDepthTracked = {
            '25': false,
            '50': false,
            '75': false,
            '100': false
        };

        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);

            Object.keys(scrollDepthTracked).forEach(depth => {
                if (scrollPercent >= parseInt(depth) && !scrollDepthTracked[depth]) {
                    this.trackEvent('scroll_depth', {
                        depth_percentage: depth
                    });
                    scrollDepthTracked[depth] = true;
                }
            });
        });
    }

    // ==================== DOWNLOADS ====================
    trackDownloads() {
        // Track guide downloads
        document.addEventListener('click', (e) => {
            const downloadLink = e.target.closest('a[download], .download-btn, .guide-download');
            if (downloadLink) {
                const fileName = downloadLink.getAttribute('download') || downloadLink.dataset.fileName || 'unknown';

                this.trackEvent('file_download', {
                    file_name: fileName,
                    file_type: fileName.split('.').pop(),
                    download_source: downloadLink.dataset.source || 'unknown'
                });
                this.trackClarityTag('downloaded_content');
            }
        });

        // Track external link clicks
        document.addEventListener('click', (e) => {
            const externalLink = e.target.closest('a[target="_blank"]:not(.social-link)');
            if (externalLink && externalLink.href) {
                try {
                    const url = new URL(externalLink.href);
                    if (url.hostname !== window.location.hostname) {
                        this.trackEvent('external_link_click', {
                            destination_domain: url.hostname,
                            link_text: externalLink.textContent.trim()
                        });
                    }
                } catch (e) {
                    // Invalid URL, skip
                }
            }
        });
    }

    // ==================== CUSTOM EVENTS ====================

    // Track scan results (call this from your scanner code)
    trackScanResult(scanType, result) {
        this.trackEvent('security_scan_completed', {
            scan_type: scanType,
            result_status: result.safe ? 'safe' : 'threat_detected',
            threat_count: result.threatCount || 0,
            scan_duration: result.duration || 0
        });

        if (!result.safe) {
            this.trackClarityTag('detected_threat');
        }
    }

    // Track tool errors
    trackError(errorType, errorMessage, toolName) {
        this.trackEvent('tool_error', {
            error_type: errorType,
            error_message: errorMessage,
            tool_name: toolName
        });
    }

    // Track engagement time (call when user leaves)
    trackEngagement(timeOnPage) {
        this.trackEvent('user_engagement', {
            engagement_time: Math.round(timeOnPage / 1000), // seconds
            page_url: window.location.pathname
        });
    }
}

// Initialize analytics tracker when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.analyticsTracker = new AnalyticsTracker();
    });
} else {
    window.analyticsTracker = new AnalyticsTracker();
}

// Track page engagement time
let pageLoadTime = Date.now();
window.addEventListener('beforeunload', () => {
    const engagementTime = Date.now() - pageLoadTime;
    if (window.analyticsTracker) {
        window.analyticsTracker.trackEngagement(engagementTime);
    }
});
