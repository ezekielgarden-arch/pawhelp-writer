const CACHE = "pawhelp-writer-v6";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css?v=6",
  "./js/app-01.js?v=6",
  "./js/app-02.js?v=6",
  "./js/app-03.js?v=6",
  "./js/app-04.js?v=6",
  "./js/app-05.js?v=6",
  "./js/app-06.js?v=6",
  "./js/app-07.js?v=6",
  "./js/app-08.js?v=6",
  "./js/app-09.js?v=6",
  "./js/app-10.js?v=6",
  "./manifest.webmanifest?v=6",
  "./icons/icon-192.png?v=6",
  "./icons/icon-512.png?v=6",
  "./icons/apple-touch-icon.png?v=6",
  "./assets/photos/voice-cat.jpg?v=6",
  "./assets/photos/paper-pets.jpg?v=6",
  "./assets/photos/urgent-cat.jpg?v=6",
  "./assets/photos/starlight-cat.jpg?v=6",
  "./assets/photos/polaroid-cat.jpg?v=6",
  "./assets/photos/editorial-dog.jpg?v=6"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => Promise.allSettled(ASSETS.map((asset) => cache.add(asset)))));
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

