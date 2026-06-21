const CACHE = "pawhelp-writer-v5";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./js/app-01.js",
  "./js/app-02.js",
  "./js/app-03.js",
  "./js/app-04.js",
  "./js/app-05.js",
  "./js/app-06.js",
  "./js/app-07.js",
  "./js/app-08.js",
  "./js/app-09.js",
  "./js/app-10.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png"
  ,"./assets/photos/voice-cat.jpg"
  ,"./assets/photos/paper-pets.jpg"
  ,"./assets/photos/urgent-cat.jpg"
  ,"./assets/photos/starlight-cat.jpg"
  ,"./assets/photos/polaroid-cat.jpg"
  ,"./assets/photos/editorial-dog.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) =>
      cached || fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE).then((cache) => cache.put(event.request, copy));
        return response;
      }).catch(() => caches.match("./index.html"))
    )
  );
});

