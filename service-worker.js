self.addEventListener("install", event => {
    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames =>
            Promise.all(
                cacheNames.map(cacheName =>
                    caches.delete(cacheName)
                )
            )
        )
    );

    self.registration.unregister();
});

self.addEventListener("fetch", event => {
    return;
});
