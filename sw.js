const CACHE_NAME = "PWAFC";
const urlsToCache = [
    "/",
    "/dist/bundle.js",
    "/dist/index.html",
    "/fonts/FontAwesome.otf",
    "/fonts/fontawesome-webfont.eot",
    "/fonts/fontawesome-webfont.svg",
    "/fonts/fontawesome-webfont.ttf",
    "/fonts/fontawesome-webfont.woff",
    "/fonts/fontawesome-webfont.woff2",
    "/fonts/font-awesome.css",
    "/iconfont/material-icons.css",
    "/iconfont/MaterialIcons-Regular.eot",
    "/iconfont/MaterialIcons-Regular.woff2",
    "/iconfont/MaterialIcons-Regular.woff",
    "/iconfont/MaterialIcons-Regular.ttf",
    "/iconfont/MaterialIcons-Regular.svg",
    "/materialize/css/materialize.min.css",
    "/materialize/js/materialize.min.js",
    "/src/pages/bookmark.html",
    "/src/pages/home.html",
    "/src/pages/nav.html",
    "/src/pages/team.html",
    "/src/css/style.css",
    "/src/js/idb.js",
    "/src/js/main.js",
    "/src/js/sw-register.js",
    "/src/js/modules/api.js",
    "/src/js/modules/database.js",
    "/src/js/modules/listener.js",
    "/src/js/modules/nav.js",
    "/src/js/modules/page.js",
    "/package-lock.json",
    "/package.json",
    "/webpack.common.js",
    "/webpack.dev.js",
    "/webpack.prod.js",
    "/manifest.json",
    "/index.html",
    "/favicon.ico",
    "/icon.png",
    "/icon192.png",
    "/icon512.png"
]
//Install Service Worker
self.addEventListener("install", event => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    )
    self.skipWaiting();
});
//Fetch Service Worker
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request, {cacheName:CACHE_NAME, ignoreSearch : true})
            .then(function(response) {
                if (response) {
                    return response;
                }
                var fetchRequest = event.request.clone();
                return fetch(fetchRequest).then(
                    function(response) {
                        if(!response || response.status !== 200) {
                            return response;
                        }
                        var responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request, responseToCache);
                            });
                        return response;
                    }
                );
            })
    );
});

//Delete Old Service Worker
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys()
        .then(cacheNames => Promise.all(
            cacheNames.map(cacheName => {
                if(cacheName != CACHE_NAME && cacheName.startsWith("PWAFC")){
                    console.log(`Cache ${cacheName} dihapus`);
                    return caches.delete(cacheName)
                }
            })
            ))
        )
});
//Response to Push Notification
self.addEventListener("push", event => {
    let body;
    if (event.data){
        body = event.data.text();
    }else{
        body = "No Payload";
    }

    const options = {
        body : body,
        icon : "/icon.png",
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification("Notification", options)
        );
});