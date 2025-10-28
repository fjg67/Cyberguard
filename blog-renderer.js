// ===== BLOG RENDERER - CYBERGUARD PRO =====
// Renders blog articles dynamically with filtering

class BlogRenderer {
    constructor() {
        this.articles = typeof blogArticles !== 'undefined' ? blogArticles : [];
        this.currentFilter = 'all';
        this.articlesPerPage = 6;
        this.currentPage = 1;
        this.modal = document.getElementById('blog-modal');

        if (this.articles.length > 0) {
            this.init();
        }
    }

    init() {
        this.renderFeaturedArticle();
        this.renderArticles();
        this.setupFilters();
        this.setupModal();
        this.setupLoadMore();

        console.log('%c📰 Blog Renderer Initialized - ' + this.articles.length + ' articles loaded', 'color: #00ffff; font-weight: bold;');
    }

    renderFeaturedArticle() {
        const featuredContainer = document.getElementById('featured-article');
        if (!featuredContainer || this.articles.length === 0) return;

        // Get most recent article as featured
        const featured = this.articles[0];

        featuredContainer.innerHTML = `
            <div class="featured-image">
                <div class="featured-icon">${featured.icon}</div>
                <div class="featured-badge">🔥 À LA UNE</div>
                <div class="featured-category">${featured.category}</div>
            </div>
            <div class="featured-content">
                <h3 class="featured-title">${featured.title}</h3>
                <p class="featured-excerpt">${featured.excerpt}</p>
                <div class="featured-meta">
                    <span class="meta-date">📅 ${this.formatDate(featured.date)}</span>
                    <span class="meta-read">⏱ ${featured.readTime} lecture</span>
                    <span class="meta-author">👤 ${featured.author}</span>
                </div>
                <button class="featured-btn" data-article-id="${featured.id}">Lire l'article →</button>
            </div>
        `;

        // Add click event to read article
        const readBtn = featuredContainer.querySelector('.featured-btn');
        readBtn.addEventListener('click', () => this.openArticle(featured.id));
    }

    renderArticles() {
        const grid = document.getElementById('blog-articles-grid');
        if (!grid) return;

        // Filter articles (skip first one if it's featured)
        let filteredArticles = this.articles.slice(1);

        if (this.currentFilter !== 'all') {
            filteredArticles = filteredArticles.filter(article =>
                article.category === this.currentFilter
            );
        }

        // Pagination
        const startIndex = 0;
        const endIndex = this.currentPage * this.articlesPerPage;
        const articlesToShow = filteredArticles.slice(startIndex, endIndex);

        grid.innerHTML = '';

        articlesToShow.forEach((article, index) => {
            const card = document.createElement('article');
            card.className = 'blog-card';
            card.setAttribute('data-aos', 'fade-up');
            card.setAttribute('data-aos-delay', (index % 3) * 100);

            card.innerHTML = `
                <div class="blog-icon">${article.icon}</div>
                <span class="blog-category">${article.category}</span>
                <h4 class="blog-title">${article.title}</h4>
                <p class="blog-excerpt">${article.excerpt}</p>
                <div class="blog-meta">
                    <span>📅 ${this.formatDate(article.date)}</span>
                    <span>⏱ ${article.readTime}</span>
                </div>
                <button class="blog-link" data-article-id="${article.id}">Lire →</button>
            `;

            // Add click event
            const readLink = card.querySelector('.blog-link');
            readLink.addEventListener('click', () => this.openArticle(article.id));

            grid.appendChild(card);
        });

        // Show/hide load more button
        const loadMoreBtn = document.getElementById('load-more-articles');
        if (loadMoreBtn) {
            if (endIndex >= filteredArticles.length) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'block';
            }
        }
    }

    setupFilters() {
        const filterBtns = document.querySelectorAll('.blog-filter-btn');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Update filter and reset pagination
                this.currentFilter = btn.dataset.category;
                this.currentPage = 1;

                // Re-render articles
                this.renderArticles();

                console.log('%c🔍 Filter applied: ' + this.currentFilter, 'color: #00ffff;');
            });
        });
    }

    setupLoadMore() {
        const loadMoreBtn = document.getElementById('load-more-articles');

        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.currentPage++;
                this.renderArticles();

                console.log('%c📄 Loaded more articles - Page: ' + this.currentPage, 'color: #00ffff;');
            });
        }
    }

    setupModal() {
        if (!this.modal) return;

        // Close button
        const closeBtn = this.modal.querySelector('.blog-modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeArticle());
        }

        // Overlay click
        const overlay = this.modal.querySelector('.blog-modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', () => this.closeArticle());
        }

        // ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeArticle();
            }
        });
    }

    openArticle(articleId) {
        const article = this.articles.find(a => a.id === articleId);
        if (!article || !this.modal) return;

        // Populate modal
        const modalCategory = document.getElementById('modal-category');
        const modalTitle = document.getElementById('modal-title');
        const modalDate = document.getElementById('modal-date');
        const modalReadTime = document.getElementById('modal-read-time');
        const modalAuthor = document.getElementById('modal-author');
        const modalTags = document.getElementById('modal-tags');
        const modalContent = document.getElementById('modal-content');

        if (modalCategory) modalCategory.textContent = article.category;
        if (modalTitle) modalTitle.textContent = article.title;
        if (modalDate) modalDate.textContent = `📅 ${this.formatDate(article.date)}`;
        if (modalReadTime) modalReadTime.textContent = `⏱ ${article.readTime}`;
        if (modalAuthor) modalAuthor.textContent = `👤 ${article.author}`;

        if (modalTags) {
            modalTags.innerHTML = article.tags.map(tag =>
                `<span class="modal-tag">#${tag}</span>`
            ).join('');
        }

        if (modalContent) {
            modalContent.innerHTML = this.renderMarkdown(article.content);
        }

        // Show modal
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        console.log('%c📖 Article opened: ' + article.title, 'color: #00ff00;');
    }

    closeArticle() {
        if (!this.modal) return;

        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    renderMarkdown(markdown) {
        let html = markdown;

        // Headers
        html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

        // Bold
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Links
        html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

        // Code blocks
        html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

        // Inline code
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

        // Lists - unordered
        html = html.replace(/^[\-✓✗❌☑] (.+)$/gim, '<li>$1</li>');

        // Wrap consecutive <li> in <ul>
        html = html.replace(/(<li>.*?<\/li>\n?)+/gs, '<ul>$&</ul>');

        // Paragraphs - split by double newlines
        const lines = html.split('\n\n');
        html = lines.map(line => {
            line = line.trim();
            // Don't wrap if already an HTML tag
            if (line.match(/^<[h|u|o|l|p|d|c|b]/i) || line === '') {
                return line;
            }
            return '<p>' + line + '</p>';
        }).join('\n');

        // Clean up extra newlines
        html = html.replace(/\n{3,}/g, '\n\n');

        return html;
    }

    formatDate(dateStr) {
        const date = new Date(dateStr);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "Aujourd'hui";
        if (diffDays === 1) return "Hier";
        if (diffDays < 7) return `Il y a ${diffDays}j`;
        if (diffDays < 14) return "Il y a 1 sem";
        if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} sem`;
        if (diffDays < 60) return "Il y a 1 mois";

        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    }
}

// Initialize Blog Renderer
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit to ensure blogArticles is loaded
    setTimeout(() => {
        window.blogRenderer = new BlogRenderer();
    }, 100);
});
