importScripts('https://cdn.jsdelivr.net/npm/workbox-cdn@5.1.3/workbox/workbox-sw.js');

workbox.setConfig({
    modulePathPrefix: 'https://cdn.jsdelivr.net/npm/workbox-cdn@5.1.3/workbox/'
});

const { core, precaching, routing, strategies, expiration, cacheableResponse, backgroundSync } = workbox;
const { CacheFirst, NetworkFirst, NetworkOnly, StaleWhileRevalidate } = strategies;
const { ExpirationPlugin } = expiration;
const { CacheableResponsePlugin } = cacheableResponse;

const cacheSuffixVersion = '-200629',
    // precacheCacheName = core.cacheNames.precache,
    // runtimeCacheName = core.cacheNames.runtime,
    maxEntries = 100;

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(keys.map((key) => {
                if (!key.includes(cacheSuffixVersion)) return caches.delete(key);
            }));
        })
    );
});


core.setCacheNameDetails({
    prefix: 'hidiygod',
    suffix: cacheSuffixVersion
});

core.skipWaiting();
core.clientsClaim();
precaching.cleanupOutdatedCaches();

/*
 * Precache
 * - Static Assets
 */
precaching.precacheAndRoute(
    [
        { url: 'https://cdn.jsdelivr.net/npm/jquery/dist/jquery.min.js', revision: null },
    ],
);

/*
 * Cache File From jsDelivr
 * cdn.jsdelivr.net | shadow.elemecdn.com
 *
 * Method: CacheFirst
 * cacheName: static-immutable
 * cacheTime: 30d
 */

// cdn.jsdelivr.net - cors enabled
routing.registerRoute(
    /.*cdn\.jsdelivr\.net/,
    new CacheFirst({
        cacheName: 'static-immutable' + cacheSuffixVersion,
        fetchOptions: {
            mode: 'cors',
            credentials: 'omit'
        },
        plugins: [
            new ExpirationPlugin({
                maxAgeSeconds: 30 * 24 * 60 * 60,
                purgeOnQuotaError: true
            })
        ]
    })
);

/*
 * Google Analytics Async - No Cache
 *
 * Mathod: networkOnly
 */

routing.registerRoute(
    /.*\.google-analytics\.com/,
    new NetworkOnly({
        plugins: [
            new backgroundSync.BackgroundSyncPlugin('Optical_Collect', {
                maxRetentionTime: 12 * 60 // Retry for max of 12 Hours (specified in minutes)
            }),
        ]
    })
);


/*
 * API - No Cache
 *
 * Method: networkOnly
 */
routing.registerRoute(
    new RegExp('https://api\.i-meto\.com'),
    new NetworkOnly()
);

routing.registerRoute(
    new RegExp('https://ip\.diygod\.me'),
    new NetworkOnly()
);

routing.registerRoute(
    new RegExp('https://hrddibvw\.api\.lncldglobal\.com'),
    new NetworkOnly()
);

routing.registerRoute(
    new RegExp('https://disqus\.diygod\.me'),
    new NetworkFirst({
        cacheName: 'api' + cacheSuffixVersion,
        fetchOptions: {
            mode: 'cors',
            credentials: 'omit'
        },
        networkTimeoutSeconds: 3
    })
);

/*
 * Disqus Related - No cache
 * disqus.com
 * *.disquscdn.com
 *
 * Method: NetworkOnly
 */
routing.registerRoute(
    new RegExp('^https://(.*)disqus\.com'),
    new NetworkOnly()
);

routing.registerRoute(
    new RegExp('^https://(.*)disquscdn\.com(.*)'),
    new NetworkOnly()
);

/*
 * Others img
 * Method: staleWhileRevalidate
 * cacheName: img-cache
 */
routing.registerRoute(
    // Cache image files
    /.*\.(?:png|jpg|jpeg|svg|gif|webp)/,
    new StaleWhileRevalidate()
);

/*
 * Static Assets
 * Method: staleWhileRevalidate
 * cacheName: static-assets-cache
 */
routing.registerRoute(
    // Cache CSS files
    /.*\.(css|js)/,
    // Use cache but update in the background ASAP
    new StaleWhileRevalidate()
);

/*
 * sw.js - Revalidate every time
 * staleWhileRevalidate
 */
routing.registerRoute(
    '/js/sw.js',
    new StaleWhileRevalidate()
);

/*
 * Default - Serve as it is
 * networkFirst
 */
routing.setDefaultHandler(
    new NetworkFirst({
        networkTimeoutSeconds: 3
    })
);
