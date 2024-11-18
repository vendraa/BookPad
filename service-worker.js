import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst, NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

/* eslint-disable no-restricted-globals */
clientsClaim();

precacheAndRoute([{"revision":"0123a45bd0fe3be75931b0331afc32db","url":"assets/BookPad_Logo.png"},{"revision":"018be6dd69cdfad2e6f36e9bbe64fafb","url":"BookPad-192x192.png"},{"revision":"e930d8d2e54a98e549138f8057ed5d39","url":"BookPad-512x512.png"},{"revision":"3db8c8a77e26144edd08729636b929f2","url":"index.html"},{"revision":"775bf3f656fe690debaf992b5657728b","url":"offline.html"},{"revision":"9964d286671d2c1894bad36841eb4806","url":"service-worker.js"},{"revision":"7fe9e34166da81974a6ffced21f87b40","url":"static/css/main.39178df9.css"},{"revision":"014dc88ed33855ab18d9c773ab8e7cdb","url":"static/js/453.0a25238a.chunk.js"},{"revision":"33cb55c533d51bc8f1a53d88a6ea8a36","url":"static/js/main.911e37f0.js"}]);

registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({
    cacheName: 'pages-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);

registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  })
);

registerRoute(
  ({ url }) => url.origin.includes('openlibrary.org'),
  new StaleWhileRevalidate({
    cacheName: 'api-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  })
);

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/offline.html'))
    );
  }
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
