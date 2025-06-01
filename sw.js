
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('quiz-v1').then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './manifest.json',
        './sw.js',
        './icon.png',
        './questions.js'
      ]);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
