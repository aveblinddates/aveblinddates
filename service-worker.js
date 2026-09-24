const CACHE_NAME = "ave-blind-dating-v1";
const OFFLINE_PAGE = "./offline.html";

const CORE_ASSETS = [
    "./offline.html",
    "./style.css"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(CORE_ASSETS))
    );

    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(
        Promise.all([
            self.clients.claim(),

            caches.keys().then(cacheNames =>
                Promise.all(
                    cacheNames
                        .filter(cacheName => cacheName !== CACHE_NAME)
                        .map(cacheName => caches.delete(cacheName))
                )
            )
        ])
    );
});

self.addEventListener("fetch", event => {
    if (event.request.mode !== "navigate") {
        return;
    }

    event.respondWith(
        fetch(event.request)
            .catch(() => caches.match(OFFLINE_PAGE))
    );
});
