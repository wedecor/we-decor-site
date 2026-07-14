// No-op service worker — unregisters itself and clears stale caches.
// Safe to delete this file once no clients have the old SW installed.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) => Promise.all(names.map((n) => caches.delete(n))))
  );
  self.clients.claim();
});
