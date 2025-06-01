
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('quiz-cache').then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './app.js',
        './questions.js',
        './styles.css',
        './manifest.json',
        './icon.png'
      ]);
    })
  );
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
