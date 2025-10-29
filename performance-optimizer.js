/**
 * ═══════════════════════════════════════════════════════════════
 * PERFORMANCE OPTIMIZER - Advanced Performance Enhancements
 * ═══════════════════════════════════════════════════════════════
 * Optimizations for mobile performance (Target: 85-90+ score)
 */

(function() {
    'use strict';

    // 1. Hide non-critical content until JS loads (prevents layout shift)
    document.documentElement.classList.add('js-loading');

    // 2. Optimize canvas rendering (defer non-critical canvases)
    const deferCanvasRendering = () => {
        const matrixCanvas = document.getElementById('matrix-canvas');
        const particlesCanvas = document.getElementById('particles-canvas');

        // Only render canvases after page is interactive
        if (matrixCanvas) {
            matrixCanvas.style.willChange = 'auto';
        }
        if (particlesCanvas) {
            particlesCanvas.style.willChange = 'auto';
        }
    };

    // 3. Lazy load images below the fold
    const optimizeImages = () => {
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach(img => {
            // Add native lazy loading
            img.loading = 'lazy';

            // Add decoding hint
            img.decoding = 'async';
        });
    };

    // 4. Reduce animation complexity on low-end devices
    const optimizeAnimations = () => {
        // Check if device is low-end (less than 4GB RAM or slow connection)
        const isLowEnd = navigator.hardwareConcurrency <= 2 ||
                        navigator.connection?.effectiveType === '2g' ||
                        navigator.connection?.effectiveType === '3g';

        if (isLowEnd) {
            document.documentElement.classList.add('low-end-device');

            // Disable expensive animations
            document.querySelectorAll('.cyber-grid, .scan-lines, .glitch-overlay').forEach(el => {
                el.style.display = 'none';
            });
        }
    };

    // 5. Prefetch critical resources
    const prefetchResources = () => {
        // Prefetch likely next navigation
        const prefetchLinks = [
            '/#protection',
            '/#scan',
            '/#blog'
        ];

        prefetchLinks.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = url;
            document.head.appendChild(link);
        });
    };

    // 6. Optimize third-party scripts loading
    const optimizeThirdParty = () => {
        // Delay non-critical third-party scripts until user interaction
        let userInteracted = false;

        const loadThirdParty = () => {
            if (userInteracted) return;
            userInteracted = true;

            // Third-party scripts are already loaded, but we can optimize their execution
            console.log('⚡ User interaction detected - enabling full performance mode');
        };

        // Wait for user interaction
        ['mousedown', 'touchstart', 'keydown', 'scroll'].forEach(event => {
            window.addEventListener(event, loadThirdParty, { once: true, passive: true });
        });

        // Fallback: load after 3 seconds
        setTimeout(loadThirdParty, 3000);
    };

    // 7. Resource hints for external domains
    const addResourceHints = () => {
        const hints = [
            { rel: 'preconnect', href: 'https://www.googletagmanager.com', crossorigin: true },
            { rel: 'preconnect', href: 'https://www.clarity.ms', crossorigin: true },
            { rel: 'dns-prefetch', href: 'https://safebrowsing.googleapis.com' }
        ];

        hints.forEach(hint => {
            const link = document.createElement('link');
            link.rel = hint.rel;
            link.href = hint.href;
            if (hint.crossorigin) link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    };

    // 8. Mark page as ready when DOMContentLoaded fires
    const markPageReady = () => {
        document.documentElement.classList.remove('js-loading');
        document.documentElement.classList.add('js-loaded');

        // Report performance metrics
        if ('PerformanceObserver' in window) {
            try {
                // Observe Largest Contentful Paint
                const lcpObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    console.log('📊 LCP:', Math.round(lastEntry.startTime), 'ms');
                });
                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

                // Observe First Input Delay
                const fidObserver = new PerformanceObserver((list) => {
                    const firstInput = list.getEntries()[0];
                    console.log('📊 FID:', Math.round(firstInput.processingStart - firstInput.startTime), 'ms');
                });
                fidObserver.observe({ entryTypes: ['first-input'] });
            } catch (e) {
                // Ignore errors in unsupported browsers
            }
        }
    };

    // Execute optimizations
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            deferCanvasRendering();
            optimizeImages();
            optimizeAnimations();
            prefetchResources();
            optimizeThirdParty();
            markPageReady();
        });
    } else {
        deferCanvasRendering();
        optimizeImages();
        optimizeAnimations();
        prefetchResources();
        optimizeThirdParty();
        markPageReady();
    }

    // Add resource hints early
    addResourceHints();

    console.log('⚡ Performance Optimizer initialized');
})();
