const NAME = "jsp-v1";

const FILES = [
  "./index.html",
  "./style.css",
  "./script.js",
  "./404.html",

  "./public/css/buttons.css",
  "./public/css/code.css",
  "./public/css/footer.css",
  "./public/css/game.css",
  "./public/css/header.css",
  "./public/css/section.css",

  "./public/js/helpers/generate-page.js",
  "./public/js/helpers/hl.js",

  "./public/js/questions/create-game.js",
  "./public/js/questions/create-questions.js",
  "./public/js/questions/questions.js",

  "./public/icons/icon-64.png",
  "./public/icons/icon-128.png",
  "./public/icons/icon-150.png",
  "./public/icons/icon-256.png",
  "./public/icons/icon-512.png",

  "./img/logo.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(NAME).then((cache) => cache.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches
      .match(e.request)
      .then(
        (response) =>
          response ||
          fetch(e.request).then((response) =>
            caches.open(NAME).then((cache) => {
              if (e.request.method === "GET") {
                cache.put(e.request, response.clone());
              }
              return response;
            })
          )
      )
      .catch(() => caches.match("./404.html"))
  );
});
