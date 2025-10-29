/**
 * ═══════════════════════════════════════════════════════════════
 * LAZY LOADING - Intersection Observer Image Lazy Loading
 * ═══════════════════════════════════════════════════════════════
 * Features:
 * - Loads images only when visible in viewport
 * - Reduces initial page load time
 * - Supports responsive images (srcset)
 * - Fallback for older browsers
 */

class LazyLoader {
    constructor() {
        this.images = [];
        this.observer = null;
        this.init();
    }

    init() {
        // Get all images with data-src attribute
        this.images = document.querySelectorAll('img[data-src], img[data-srcset]');

        if (this.images.length === 0) {
            return;
        }

        // Check for Intersection Observer support
        if ('IntersectionObserver' in window) {
            this.observeImages();
        } else {
            // Fallback: load all images immediately for older browsers
            this.loadAllImages();
        }

        console.log(`🖼️ Lazy Loader initialized - ${this.images.length} images to lazy load`);
    }

    observeImages() {
        const options = {
            root: null, // viewport
            rootMargin: '50px', // Start loading 50px before entering viewport
            threshold: 0.01 // Trigger when 1% of image is visible
        };

        this.observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadImage(img);
                    observer.unobserve(img); // Stop observing once loaded
                }
            });
        }, options);

        // Observe all images
        this.images.forEach(img => {
            this.observer.observe(img);
        });
    }

    loadImage(img) {
        // Get data attributes
        const src = img.dataset.src;
        const srcset = img.dataset.srcset;
        const sizes = img.dataset.sizes;

        // Show loading placeholder
        img.classList.add('lazy-loading');

        // Create a promise to track when image is loaded
        const loadPromise = new Promise((resolve, reject) => {
            img.onload = () => {
                img.classList.remove('lazy-loading');
                img.classList.add('lazy-loaded');
                console.log('🖼️ Image loaded:', src || srcset);
                resolve();
            };

            img.onerror = () => {
                img.classList.remove('lazy-loading');
                img.classList.add('lazy-error');
                console.error('❌ Image failed to load:', src || srcset);
                reject();
            };
        });

        // Set src/srcset
        if (srcset) {
            img.srcset = srcset;
        }
        if (sizes) {
            img.sizes = sizes;
        }
        if (src) {
            img.src = src;
        }

        // Remove data attributes to prevent re-loading
        delete img.dataset.src;
        delete img.dataset.srcset;
        delete img.dataset.sizes;

        return loadPromise;
    }

    loadAllImages() {
        // Fallback: load all images immediately
        this.images.forEach(img => this.loadImage(img));
    }

    // Public method to manually trigger loading of specific images
    loadImagesIn(container) {
        const images = container.querySelectorAll('img[data-src], img[data-srcset]');
        images.forEach(img => {
            if (this.observer) {
                this.observer.observe(img);
            } else {
                this.loadImage(img);
            }
        });
    }

    // Cleanup
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

// Initialize lazy loader when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.lazyLoader = new LazyLoader();
    });
} else {
    window.lazyLoader = new LazyLoader();
}

// Re-initialize on dynamic content load (for blog articles, etc.)
window.addEventListener('contentLoaded', () => {
    if (window.lazyLoader) {
        window.lazyLoader.init();
    }
});
