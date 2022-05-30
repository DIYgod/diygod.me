importScripts('https://cdn.jsdelivr.net/npm/workbox-cdn@5.1.4/workbox/workbox-sw.js');

workbox.setConfig({
    modulePathPrefix: 'https://cdn.jsdelivr.net/npm/workbox-cdn@5.1.4/workbox/'
});

const { core, precaching, routing, strategies, expiration, cacheableResponse, backgroundSync, rangeRequests } = workbox;
const { CacheFirst, NetworkFirst, NetworkOnly, StaleWhileRevalidate } = strategies;
const { ExpirationPlugin } = expiration;
const { CacheableResponsePlugin } = cacheableResponse;
const { RangeRequestsPlugin } = rangeRequests;

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
    new RegExp('.*cdn\.jsdelivr\.net'),
    new CacheFirst({
        cacheName: 'static-immutable' + cacheSuffixVersion,
        fetchOptions: {
            mode: 'cors',
            credentials: 'omit'
        },
        // plugins: [
        //     new ExpirationPlugin({
        //         maxAgeSeconds: 30 * 24 * 60 * 60,
        //         purgeOnQuotaError: true
        //     })
        // ]
    })
);

/*
 * Google Analytics Async - No Cache
 *
 * Mathod: networkOnly
 */

routing.registerRoute(
    new RegExp('.*\.google-analytics\.com'),
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
 * NFT assets
 * Method: CacheFirst
 */
routing.registerRoute(
    new RegExp('https://(.*)/ipfs/(.*)'),
    new CacheFirst({
        cacheName: 'nft-assets' + cacheSuffixVersion,
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200]
            }),
            new RangeRequestsPlugin(),
        ]
    })
);
routing.registerRoute(
    new RegExp('https://(.*)\.amazonaws\.com'),
    new CacheFirst({
        cacheName: 'nft-assets' + cacheSuffixVersion,
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200]
            })
        ]
    })
);
routing.registerRoute(
    new RegExp('https://assets\.poap\.xyz'),
    new CacheFirst({
        cacheName: 'nft-assets' + cacheSuffixVersion,
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200]
            })
        ]
    })
);
routing.registerRoute(
    new RegExp('https://metadata\.ens\.domains'),
    new CacheFirst({
        cacheName: 'nft-assets' + cacheSuffixVersion,
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200]
            })
        ]
    })
);
routing.registerRoute(
    new RegExp('https://(.*)\.cloudfront\.net'),
    new CacheFirst({
        cacheName: 'nft-assets' + cacheSuffixVersion,
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200]
            })
        ]
    })
);
routing.registerRoute(
    new RegExp('https://nft\.showme\.fan'),
    new CacheFirst({
        cacheName: 'nft-assets' + cacheSuffixVersion,
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200]
            })
        ]
    })
);
routing.registerRoute(
    new RegExp('https://(.*)\.arweave\.net'),
    new CacheFirst({
        cacheName: 'nft-assets' + cacheSuffixVersion,
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200]
            })
        ]
    })
);
routing.registerRoute(
    new RegExp('https://lh3.googleusercontent.com'),
    new CacheFirst({
        cacheName: 'nft-assets' + cacheSuffixVersion,
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200]
            })
        ]
    })
);

/*
 * NFT API
 * Method: staleWhileRevalidate
 */
routing.registerRoute(
    new RegExp('https://eth-mainnet\.alchemyapi\.io'),
    new StaleWhileRevalidate()
);

routing.registerRoute(
    new RegExp('https://polygon-mainnet\.g\.alchemy\.com'),
    new StaleWhileRevalidate()
);

routing.registerRoute(
    new RegExp('https://deep-index\.moralis\.io'),
    new StaleWhileRevalidate()
);

routing.registerRoute(
    new RegExp('https://api\.opensea\.io'),
    new StaleWhileRevalidate()
);

routing.registerRoute(
    new RegExp('https://api\.poap\.tech'),
    new StaleWhileRevalidate()
);

/*
 * Others img
 * Method: staleWhileRevalidate
 * cacheName: img-cache
 */
routing.registerRoute(
    // Cache image files
    new RegExp('.*\.(?:png|jpg|jpeg|svg|gif|webp)'),
    new CacheFirst()
);
routing.registerRoute(
    // Cache image files
    new RegExp('.*\.(?:mp3)'),
    new CacheFirst({
        plugins: [
            new RangeRequestsPlugin(),
        ]
    })
);

/*
 * Static Assets
 * Method: staleWhileRevalidate
 * cacheName: static-assets-cache
 */
routing.registerRoute(
    // Cache CSS files
    new RegExp('.*\.(css|js)'),
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
