// ===== INTÉGRATION CONTENU ENRICHI CYBERGUARD PRO =====
// Script pour intégrer les nouveaux articles et vidéos dans le blog existant

// Importer les nouveaux contenus
// Note: Ces scripts doivent être chargés AVANT blog.js dans index.html

/**
 * INSTRUCTIONS D'INTÉGRATION
 *
 * 1. Ajouter ces lignes dans index.html AVANT <script src="blog.js">:
 *
 * <script src="blog-enriched-articles.js"></script>
 * <script src="blog-case-studies.js"></script>
 * <script src="video-tutorials-enhanced.js"></script>
 * <script src="content-integration.js"></script>
 *
 * 2. Le contenu sera automatiquement fusionné avec les articles existants
 */

// Fonction de fusion des articles
function mergeEnrichedContent() {
    // Vérifier que les données sont disponibles
    if (typeof enrichedBlogArticles === 'undefined') {
        console.warn('⚠️ enrichedBlogArticles non disponible');
        return;
    }

    if (typeof caseStudiesArticles === 'undefined') {
        console.warn('⚠️ caseStudiesArticles non disponible');
        return;
    }

    // Fusionner tous les articles
    const allEnrichedArticles = [
        ...enrichedBlogArticles,
        ...caseStudiesArticles
    ];

    console.log(`✅ ${allEnrichedArticles.length} articles enrichis chargés`);

    // Ajouter au tableau blogArticles existant
    if (typeof blogArticles !== 'undefined') {
        // Ajouter au début pour les mettre en avant
        blogArticles.unshift(...allEnrichedArticles);
        console.log(`✅ Total: ${blogArticles.length} articles disponibles`);
    }

    return allEnrichedArticles;
}

// Fonction pour intégrer les vidéos dans la section Tutoriels
function enhanceVideoTutorials() {
    if (typeof videoTutorialsData === 'undefined') {
        console.warn('⚠️ videoTutorialsData non disponible');
        return;
    }

    const stats = getVideoStats();
    console.log(`✅ ${stats.totalVideos} tutoriels vidéo chargés`);
    console.log(`📊 ${stats.categories} catégories | ${stats.totalDurationHours}h de contenu`);

    // Créer une interface de navigation des vidéos
    createVideoNavigator();
}

// Créer un navigateur de vidéos
function createVideoNavigator() {
    const container = document.getElementById('tutorials-video-container');
    if (!container) return;

    let html = `
        <div class="video-navigator">
            <div class="video-stats">
                <h3>📺 BIBLIOTHÈQUE TUTORIELS YOUTUBE</h3>
                <div class="stats-row">
                    <span class="stat-item">
                        <strong>${getVideoStats().totalVideos}</strong> vidéos
                    </span>
                    <span class="stat-item">
                        <strong>${getVideoStats().categories}</strong> catégories
                    </span>
                    <span class="stat-item">
                        <strong>${getVideoStats().totalDurationHours}h</strong> de contenu
                    </span>
                </div>
            </div>

            <!-- MENU NAVIGATION CATÉGORIES ULTRA PREMIUM -->
            <nav class="categories-nav-menu">
                <div class="nav-menu-title">🎯 NAVIGATION RAPIDE</div>
                <div class="nav-menu-grid">
                    <button class="nav-cat-btn" data-category="general_security">
                        <i class="fas fa-shield-alt"></i>
                        <span>Sécurité Générale</span>
                    </button>
                    <button class="nav-cat-btn" data-category="password_managers">
                        <i class="fas fa-key"></i>
                        <span>Mots de Passe</span>
                    </button>
                    <button class="nav-cat-btn" data-category="vpn_privacy">
                        <i class="fas fa-user-secret"></i>
                        <span>VPN & Anonymat</span>
                    </button>
                    <button class="nav-cat-btn" data-category="firewall_network">
                        <i class="fas fa-network-wired"></i>
                        <span>Pare-feu & Réseau</span>
                    </button>
                    <button class="nav-cat-btn" data-category="ethical_hacking">
                        <i class="fas fa-skull-crossbones"></i>
                        <span>Hacking Éthique</span>
                    </button>
                    <button class="nav-cat-btn" data-category="cryptography">
                        <i class="fas fa-lock"></i>
                        <span>Cryptographie</span>
                    </button>
                    <button class="nav-cat-btn" data-category="mobile_security">
                        <i class="fas fa-mobile-alt"></i>
                        <span>Sécurité Mobile</span>
                    </button>
                    <button class="nav-cat-btn" data-category="linux_security">
                        <i class="fab fa-linux"></i>
                        <span>Sécurité Linux</span>
                    </button>
                    <button class="nav-cat-btn" data-category="forensics">
                        <i class="fas fa-search"></i>
                        <span>Forensics</span>
                    </button>
                    <button class="nav-cat-btn" data-category="malware_analysis">
                        <i class="fas fa-virus"></i>
                        <span>Analyse Malware</span>
                    </button>
                    <button class="nav-cat-btn" data-category="cloud_security">
                        <i class="fas fa-cloud"></i>
                        <span>Sécurité Cloud</span>
                    </button>
                    <button class="nav-cat-btn" data-category="social_engineering">
                        <i class="fas fa-user-ninja"></i>
                        <span>Social Engineering</span>
                    </button>
                    <button class="nav-cat-btn" data-category="backup_recovery">
                        <i class="fas fa-database"></i>
                        <span>Backup & Recovery</span>
                    </button>
                </div>
            </nav>

            <div class="video-categories">
    `;

    // Générer les catégories
    for (const category in videoTutorialsData) {
        const videos = videoTutorialsData[category];
        const categoryName = formatCategoryName(category);

        html += `
            <div class="video-category" id="category-${category}" data-category="${category}">
                <h4 class="category-title">${categoryName}</h4>
                <div class="video-grid">
        `;

        videos.forEach(video => {
            html += `
                <div class="video-card" data-video-id="${video.youtubeId}">
                    <div class="video-thumbnail" onclick="window.showVideoModal('${video.youtubeId}')" style="cursor: pointer;">
                        <img src="https://img.youtube.com/vi/${video.youtubeId}/sddefault.jpg"
                             alt="${video.title}"
                             loading="lazy"
                             onerror="this.onerror=null; this.src='https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg';"
                             style="filter: brightness(1.05) contrast(1.15) saturate(1.1);">
                        <div class="video-play-overlay">
                            <i class="fas fa-play-circle"></i>
                        </div>
                        <span class="video-duration">${video.duration}</span>
                    </div>
                    <div class="video-info">
                        <h5 class="video-title">${video.title}</h5>
                        <p class="video-channel">
                            <i class="fas fa-user"></i> ${video.channel}
                        </p>
                        <div class="video-meta">
                            <span class="video-level level-${video.level.toLowerCase()}">
                                ${video.level}
                            </span>
                            <span class="video-tags">
                                ${video.tags.slice(0, 2).map(tag => `<span class="tag">${tag}</span>`).join('')}
                            </span>
                        </div>
                        <p class="video-description">${video.description}</p>
                        <div class="video-actions">
                            <button class="btn-watch" onclick="window.showVideoModal('${video.youtubeId}'); event.stopPropagation();">
                                <i class="fab fa-youtube"></i> Regarder sur YouTube
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });

        html += `
                </div>
            </div>
        `;
    }

    html += `
            </div>
        </div>
    `;

    container.innerHTML = html;

    // Ajouter les event listeners (la modale est déjà dans le HTML)
    attachVideoEvents();
}

// Format nom de catégorie
function formatCategoryName(category) {
    const names = {
        'general_security': '🔐 Sécurité Générale',
        'password_managers': '🔑 Gestionnaires de Mots de Passe',
        'vpn_privacy': '🌐 VPN & Anonymat',
        'firewall_network': '🛡️ Pare-feu & Réseau',
        'ethical_hacking': '🎯 Hacking Éthique & Pentesting',
        'cryptography': '🔒 Cryptographie',
        'mobile_security': '📱 Sécurité Mobile',
        'linux_security': '🐧 Sécurité Linux',
        'forensics': '🔬 Forensics & Investigation',
        'malware_analysis': '🦠 Analyse de Malware',
        'cloud_security': '☁️ Sécurité Cloud',
        'social_engineering': '🎭 Social Engineering',
        'backup_recovery': '💾 Backup & Recovery'
    };

    return names[category] || category.replace(/_/g, ' ').toUpperCase();
}

// Attacher les événements aux vidéos
function attachVideoEvents() {
    // Fermer modal avec le bouton X
    const closeBtn = document.querySelector('.video-modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            window.hideVideoModal();
        });
    }

    // Fermer modal en cliquant à l'extérieur
    const modal = document.getElementById('video-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                window.hideVideoModal();
            }
        });
    }

    // Fermer modal avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            window.hideVideoModal();
        }
    });

    // NAVIGATION CATÉGORIES - Scroll smooth
    document.querySelectorAll('.nav-cat-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            const targetSection = document.getElementById(`category-${category}`);

            if (targetSection) {
                // Retirer la classe active de tous les boutons
                document.querySelectorAll('.nav-cat-btn').forEach(b => b.classList.remove('active'));
                // Ajouter la classe active au bouton cliqué
                this.classList.add('active');

                // Scroll smooth vers la catégorie
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                });

                // Animation flash sur la catégorie ciblée
                targetSection.classList.add('flash-highlight');
                setTimeout(() => {
                    targetSection.classList.remove('flash-highlight');
                }, 2000);

                console.log(`✅ Scrolled to category: ${category}`);
            }
        });
    });
}

// Afficher modal vidéo - GLOBALE avec FALLBACK
window.showVideoModal = function(videoId) {
    console.log('🎬 Opening video:', videoId);

    // FALLBACK: Si problème d'intégration, ouvrir directement sur YouTube
    const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

    // Ouvrir dans un nouvel onglet YouTube (plus fiable)
    window.open(youtubeUrl, '_blank');
    console.log('✅ Video opened on YouTube:', youtubeUrl);

    /* CODE MODAL DÉSACTIVÉ TEMPORAIREMENT À CAUSE DES RESTRICTIONS YOUTUBE
    const modal = document.getElementById('video-modal');
    const player = document.getElementById('video-modal-player');

    if (!modal || !player) {
        console.error('❌ Modal elements not found');
        window.open(youtubeUrl, '_blank');
        return;
    }

    // Générer l'iframe YouTube avec paramètres optimisés
    player.innerHTML = `
        <div class="video-container">
            <iframe
                src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1"
                frameborder="0"
                allowfullscreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                title="YouTube video player"
                onerror="window.open('${youtubeUrl}', '_blank'); window.hideVideoModal();">
            </iframe>
        </div>
    `;

    // Afficher la modale avec flexbox
    modal.style.display = 'flex';
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';

    console.log('✅ Video modal opened with videoId:', videoId);
    */
}

// Cacher modal vidéo - GLOBALE
window.hideVideoModal = function() {
    console.log('🚪 Closing video modal');
    const modal = document.getElementById('video-modal');
    const player = document.getElementById('video-modal-player');

    if (modal && player) {
        // Arrêter la vidéo en vidant le contenu
        player.innerHTML = '';
        modal.classList.remove('show');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        console.log('✅ Video modal closed');
    }
}

// Créer widget de recherche d'articles enrichis
function createArticleSearch() {
    const searchContainer = document.getElementById('blog-search-enhanced');
    if (!searchContainer) return;

    const html = `
        <div class="article-search-widget">
            <div class="search-header">
                <h3>🔍 Rechercher dans ${blogArticles.length} articles</h3>
            </div>

            <div class="search-bar">
                <input type="text"
                       id="article-search-input"
                       placeholder="Rechercher par titre, catégorie, tags..."
                       autocomplete="off">
                <button id="article-search-btn">
                    <i class="fas fa-search"></i>
                </button>
            </div>

            <div class="search-filters">
                <select id="category-filter">
                    <option value="all">Toutes catégories</option>
                    <option value="ACTUALITÉ">🚨 Actualités</option>
                    <option value="GUIDE">📚 Guides</option>
                    <option value="PROTECTION">🔐 Protection</option>
                    <option value="ALERTE">⚠️ Alertes</option>
                    <option value="ENTREPRISE">💼 Entreprise</option>
                </select>

                <select id="level-filter">
                    <option value="all">Tous niveaux</option>
                    <option value="Débutant">🟢 Débutant</option>
                    <option value="Intermédiaire">🟡 Intermédiaire</option>
                    <option value="Avancé">🔴 Avancé</option>
                </select>

                <button id="reset-filters-btn" class="btn-secondary">
                    <i class="fas fa-redo"></i> Réinitialiser
                </button>
            </div>

            <div id="search-results" class="search-results"></div>

            <div class="quick-stats">
                <div class="stat">
                    <span class="stat-number">${countArticlesByCategory('ACTUALITÉ')}</span>
                    <span class="stat-label">Actualités</span>
                </div>
                <div class="stat">
                    <span class="stat-number">${countArticlesByCategory('GUIDE')}</span>
                    <span class="stat-label">Guides</span>
                </div>
                <div class="stat">
                    <span class="stat-number">${countArticlesByCategory('ALERTE')}</span>
                    <span class="stat-label">Alertes</span>
                </div>
            </div>
        </div>
    `;

    searchContainer.innerHTML = html;

    // Attacher événements
    attachSearchEvents();
}

// Compter articles par catégorie
function countArticlesByCategory(category) {
    if (typeof blogArticles === 'undefined') return 0;
    return blogArticles.filter(a => a.category === category).length;
}

// Attacher événements de recherche
function attachSearchEvents() {
    const searchInput = document.getElementById('article-search-input');
    const searchBtn = document.getElementById('article-search-btn');
    const categoryFilter = document.getElementById('category-filter');
    const levelFilter = document.getElementById('level-filter');
    const resetBtn = document.getElementById('reset-filters-btn');

    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        // Recherche en temps réel (debounced)
        let timeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(timeout);
            timeout = setTimeout(performSearch, 500);
        });
    }

    if (categoryFilter) {
        categoryFilter.addEventListener('change', performSearch);
    }

    if (levelFilter) {
        levelFilter.addEventListener('change', performSearch);
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', resetSearch);
    }
}

// Effectuer recherche
function performSearch() {
    const query = document.getElementById('article-search-input').value.toLowerCase();
    const category = document.getElementById('category-filter').value;
    const level = document.getElementById('level-filter').value;
    const resultsContainer = document.getElementById('search-results');

    if (!blogArticles) return;

    let results = blogArticles.filter(article => {
        const matchQuery = query === '' ||
                          article.title.toLowerCase().includes(query) ||
                          article.excerpt.toLowerCase().includes(query) ||
                          article.tags.some(tag => tag.toLowerCase().includes(query));

        const matchCategory = category === 'all' || article.category === category;

        const matchLevel = level === 'all' ||
                          (article.tags && article.tags.includes(level));

        return matchQuery && matchCategory && matchLevel;
    });

    displaySearchResults(results, resultsContainer);
}

// Afficher résultats
function displaySearchResults(results, container) {
    if (results.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>Aucun article trouvé</p>
            </div>
        `;
        return;
    }

    let html = `<div class="results-count">✅ ${results.length} article(s) trouvé(s)</div>`;

    results.slice(0, 10).forEach(article => {
        html += `
            <div class="search-result-item" data-article-id="${article.id}">
                <div class="result-header">
                    <span class="result-category">${article.category}</span>
                    <span class="result-date">${article.date}</span>
                </div>
                <h4 class="result-title">${article.icon} ${article.title}</h4>
                <p class="result-excerpt">${article.excerpt}</p>
                <div class="result-meta">
                    <span class="result-read-time">
                        <i class="fas fa-clock"></i> ${article.readTime}
                    </span>
                    <span class="result-tags">
                        ${article.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </span>
                </div>
                <button class="btn-read-article" data-article-id="${article.id}">
                    Lire l'article <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        `;
    });

    if (results.length > 10) {
        html += `<div class="results-more">+ ${results.length - 10} autres articles...</div>`;
    }

    container.innerHTML = html;

    // Attacher événements aux boutons "Lire"
    container.querySelectorAll('.btn-read-article').forEach(btn => {
        btn.addEventListener('click', function() {
            const articleId = parseInt(this.getAttribute('data-article-id'));
            openArticleModal(articleId);
        });
    });
}

// Réinitialiser recherche
function resetSearch() {
    document.getElementById('article-search-input').value = '';
    document.getElementById('category-filter').value = 'all';
    document.getElementById('level-filter').value = 'all';
    document.getElementById('search-results').innerHTML = '';
}

// Ouvrir modal article (utilise la fonction existante du blog.js)
function openArticleModal(articleId) {
    const article = blogArticles.find(a => a.id === articleId);
    if (article && typeof displayFullArticle === 'function') {
        displayFullArticle(article);
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initialisation du contenu enrichi...');

    // Fusionner les articles
    mergeEnrichedContent();

    // Améliorer les vidéos
    enhanceVideoTutorials();

    // Créer widget de recherche
    createArticleSearch();

    console.log('✅ Contenu enrichi initialisé avec succès!');
});

// Export pour utilisation externe
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        mergeEnrichedContent,
        enhanceVideoTutorials,
        createVideoNavigator,
        createArticleSearch
    };
}
