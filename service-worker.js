const CACHE_NAME = "ave-blind-dating-v1";
const OFFLINE_PAGE = "./offline.html";

const CORE_ASSETS = [
"./offline.html",
"./style.css"
];

/* ==============================
INSTALL
============================== */

self.addEventListener(
"install",
event => {

    event.waitUntil(

        caches
            .open(CACHE_NAME)
            .then(
                cache =>
                    cache.addAll(
                        CORE_ASSETS
                    )
            )

    );

    self.skipWaiting();

}

);
/* ==============================
ACTIVATE
============================== */

self.addEventListener(
"activate",
event => {

    event.waitUntil(

        caches
            .keys()
            .then(
                cacheNames => {

                    return Promise.all(

                        cacheNames
                            .filter(
                                cacheName =>
                                    cacheName !==
                                    CACHE_NAME
                            )
                            .map(
                                cacheName =>
                                    caches.delete(
                                        cacheName
                                    )
                            )

                    );

                }
            )

    );

    self.clients.claim();

}

);
/* ==============================
FETCH
============================== */

self.addEventListener(
"fetch",
event => {

    /*
     * Only handle normal page navigation.
     *
     * We intentionally do NOT intercept
     * Supabase/API requests.
     */

    if (
        event.request.mode !==
        "navigate"
    ) {

        return;

    }


    event.respondWith(

        fetch(
            event.request
        )
        .catch(
            () =>
                caches.match(
                    OFFLINE_PAGE
                )
        )

    );

}

);
