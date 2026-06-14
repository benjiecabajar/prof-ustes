// Basic Service Worker for PWA compliance
const CACHE_NAME = 'ustes-cache-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  // Respond with cache or fetch from network
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});