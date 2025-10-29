/**
 * ═══════════════════════════════════════════════════════════════
 * SERVICE WORKER - PWA Cache & Offline Support
 * ═══════════════════════════════════════════════════════════════
 * Features:
 * - Cache static assets for offline access
 * - Network-first strategy for API calls
 * - Cache-first strategy for static files
 * - Background sync for analytics
 */

const CACHE_VERSION = 'cyberguard-v1.0.0';
const CACHE_STATIC = `${CACHE_VERSION}-static`;
const CACHE_DYNAMIC = `${CACHE_VERSION}-dynamic`;
const CACHE_API = `${CACHE_VERSION}-api`;

// Static assets to cache on install
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/api-client.js',
    '/analytics-events.js',
    '/theme-manager.js',
    '/i18n.js',
    '/blog.js',
    '/blog-styles.css',
    '/quiz-styles.css',
    '/theme-styles.css',
    '/i18n-styles.css',
    '/notification-styles.css',
    '/achievement-styles.css',
    '/cyberguard-ai-styles.css',
    '/mobile-menu-styles.css',
    '/header-responsive-fix.css',
    '/world-map-styles.css',
    '/robots.txt',
    '/sitemap.xml'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('[SW] Installing Service Worker...', CACHE_VERSION);

    event.waitUntil(
        caches.open(CACHE_STATIC)
            .then((cache) => {
                console.log('[SW] Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('[SW] Installation complete');
                return self.skipWaiting(); // Activate immediately
            })
            .catch((error) => {
                console.error('[SW] Installation failed:', error);
            })
    );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating Service Worker...', CACHE_VERSION);

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((cacheName) => {
                            // Delete old caches
                            return cacheName.startsWith('cyberguard-') &&
                                   cacheName !== CACHE_STATIC &&
                                   cacheName !== CACHE_DYNAMIC &&
                                   cacheName !== CACHE_API;
                        })
                        .map((cacheName) => {
                            console.log('[SW] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        })
                );
            })
            .then(() => {
                console.log('[SW] Activation complete');
                return self.clients.claim(); // Take control immediately
            })
    );
});

// Fetch event - handle requests with caching strategies
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip chrome-extension and other non-http(s) requests
    if (!url.protocol.startsWith('http')) {
        return;
    }

    // Strategy selection based on request type
    if (url.pathname.startsWith('/api/')) {
        // API requests: Network first, cache fallback
        event.respondWith(networkFirstStrategy(request, CACHE_API));
    } else if (isStaticAsset(url.pathname)) {
        // Static assets: Cache first, network fallback
        event.respondWith(cacheFirstStrategy(request, CACHE_STATIC));
    } else if (isImage(url.pathname)) {
        // Images: Cache first, network fallback
        event.respondWith(cacheFirstStrategy(request, CACHE_DYNAMIC));
    } else {
        // Everything else: Network first, cache fallback
        event.respondWith(networkFirstStrategy(request, CACHE_DYNAMIC));
    }
});

// Cache-first strategy (for static assets)
async function cacheFirstStrategy(request, cacheName) {
    try {
        // Try cache first
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            console.log('[SW] Cache hit:', request.url);
            return cachedResponse;
        }

        // If not in cache, fetch from network
        console.log('[SW] Cache miss, fetching:', request.url);
        const networkResponse = await fetch(request);

        // Cache the response for future use
        if (networkResponse.ok) {
            const cache = await caches.open(cacheName);
            cache.put(request, networkResponse.clone());
        }

        return networkResponse;
    } catch (error) {
        console.error('[SW] Fetch failed:', error);

        // Return offline fallback if available
        return caches.match('/index.html');
    }
}

// Network-first strategy (for dynamic content & APIs)
async function networkFirstStrategy(request, cacheName) {
    try {
        // Try network first
        const networkResponse = await fetch(request);

        // Cache successful responses
        if (networkResponse.ok) {
            const cache = await caches.open(cacheName);
            cache.put(request, networkResponse.clone());
        }

        return networkResponse;
    } catch (error) {
        console.log('[SW] Network failed, trying cache:', request.url);

        // If network fails, try cache
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }

        // If neither works, return offline page
        return caches.match('/index.html');
    }
}

// Helper: Check if request is for static asset
function isStaticAsset(pathname) {
    const staticExtensions = ['.js', '.css', '.html', '.json', '.xml', '.txt'];
    return staticExtensions.some(ext => pathname.endsWith(ext));
}

// Helper: Check if request is for image
function isImage(pathname) {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.ico'];
    return imageExtensions.some(ext => pathname.toLowerCase().endsWith(ext));
}

// Background sync for analytics (if supported)
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-analytics') {
        console.log('[SW] Syncing analytics data');
        event.waitUntil(syncAnalytics());
    }
});

async function syncAnalytics() {
    // Placeholder for analytics sync logic
    // Could be used to send queued analytics events when back online
    console.log('[SW] Analytics sync completed');
}

// Push notifications (optional, for future use)
self.addEventListener('push', (event) => {
    if (!event.data) return;

    const data = event.data.json();
    const options = {
        body: data.body || 'Nouvelle notification CyberGuard Pro',
        icon: '/android-chrome-192x192.png',
        badge: '/android-chrome-192x192.png',
        vibrate: [200, 100, 200],
        data: {
            url: data.url || '/'
        }
    };

    event.waitUntil(
        self.registration.showNotification(data.title || 'CyberGuard Pro', options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    event.waitUntil(
        clients.openWindow(event.notification.data.url || '/')
    );
});

console.log('[SW] Service Worker script loaded', CACHE_VERSION);
