const CACHE_NAME = "ave-test-v1";

self.addEventListener("install", event => {
    console.log("SW INSTALL");

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.add("./offline.html"))
    );

    self.skipWaiting();
});

self.addEventListener("activate", event => {
    console.log("SW ACTIVATE");

    event.waitUntil(
        self.clients.claim()
    );
});

self.addEventListener("fetch", event => {
    if (event.request.mode === "navigate") {
        event.respondWith(
            fetch(event.request).catch(() =>
                caches.match("./offline.html")
            )
        );
    }
});
