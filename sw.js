importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
const urlsToCache = [
    { url: "/", revision: "1" },
    { url: "/dist/bundle.js", revision: "1" },
    { url: "/dist/index.html", revision: "1" },
    { url: "/fonts/FontAwesome.otf", revision: "1" },
    { url: "/fonts/fontawesome-webfont.eot", revision: "1" },
    { url: "/fonts/fontawesome-webfont.svg", revision: "1" },
    { url: "/fonts/fontawesome-webfont.ttf", revision: "1" },
    { url: "/fonts/fontawesome-webfont.woff", revision: "1" },
    { url: "/fonts/fontawesome-webfont.woff2", revision: "1" },
    { url: "/fonts/font-awesome.css", revision: "1" },
    { url: "/iconfont/material-icons.css", revision: "1" },
    { url: "/iconfont/MaterialIcons-Regular.eot", revision: "1" },
    { url: "/iconfont/MaterialIcons-Regular.woff2", revision: "1" },
    { url: "/iconfont/MaterialIcons-Regular.woff", revision: "1" },
    { url: "/iconfont/MaterialIcons-Regular.ttf", revision: "1" },
    { url: "/iconfont/MaterialIcons-Regular.svg", revision: "1" },
    { url: "/materialize/css/materialize.min.css", revision: "1" },
    { url: "/materialize/js/materialize.min.js", revision: "1" },
    { url: "/src/pages/bookmark.html", revision: "1" },
    { url: "/src/pages/home.html", revision: "1" },
    { url: "/src/pages/nav.html", revision: "1" },
    { url: "/src/pages/team.html", revision: "1" },
    { url: "/src/css/style.css", revision: "1" },
    { url: "/src/js/idb.js", revision: "1" },
    { url: "/src/js/main.js", revision: "1" },
    { url: "/src/js/sw-register.js", revision: "1" },
    { url: "/src/js/modules/api.js", revision: "1" },
    { url: "/src/js/modules/database.js", revision: "1" },
    { url: "/src/js/modules/listener.js", revision: "1" },
    { url: "/src/js/modules/nav.js", revision: "1" },
    { url: "/src/js/modules/page.js", revision: "1" },
    { url: "/package-lock.json", revision: "1" },
    { url: "/package.json", revision: "1" },
    { url: "/webpack.common.js", revision: "1" },
    { url: "/webpack.dev.js", revision: "1" },
    { url: "/webpack.prod.js", revision: "1" },
    { url: "/manifest.json", revision: "1" },
    { url: "/index.html", revision: "1" },
    { url: "/favicon.ico", revision: "1" },
    { url: "/icon.png", revision: "1" },
    { url: "/icon192.png", revision: "1" },
    { url: "/icon512.png", revision: "1" },
]
if (workbox){
    workbox.precaching.precacheAndRoute(urlsToCache);

    workbox.routing.registerRoute(
        /.*(?:png|gif|jpg|jpeg|svg)$/,
        workbox.strategies.cacheFirst({
            cacheName: "image-cache",
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 100,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                }),
            ]
        })
    );

    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org/v2/'),
        workbox.strategies.staleWhileRevalidate()
    )

    // Caching Google Fonts
    workbox.routing.registerRoute(
        /.*(?:googleapis|gstatic)\.com/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'google-fonts-stylesheets',
        })
    );
}else {
    console.log("workbox failed");
}

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