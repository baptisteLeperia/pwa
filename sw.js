  "use strict";

  self.addEventListener('install', (e) => {
      console.log('[Service Worker] Install');
  });

  const cacheName = 'pwa-v1';

  var contentToCache = [
    './index.html',
    './app.js',
    './style.css',
    './pwa.webmanifest',
    './favicon.ico',
    './icon-32.png',
    './icon-64.png',
    './icon-96.png',
    './icon-128.png',
    './icon-168.png',
    './icon-180.png',
    './icon-192.png',
    './icon-256.png',
    './icon-512.png',
    './maskable_icon.png'
  ];

  // service worker installation

  self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil((async () => {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
  });


  // RESPONDING

  self.addEventListener('fetch', (e) => {
    console.log(`[Service Worker] Fetched resource ${e.request.url}`);
  });

  self.addEventListener('fetch', (e) => {
    e.respondWith((async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) { return r; }
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
  });
  
  // UPDATE CACHE

  var cacheName = 'pwa-v1';

  contentToCache.push('./icon-32.png');


  self.addEventListener('install', (e) => {
    e.waitUntil((async () => {
      const cache = await caches.open(cacheName);
      await cache.addAll(contentToCache);
    })());
  });

  // CLEARING CACHE

  self.addEventListener('activate', (e) => {
    e.waitUntil(caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key === cacheName) { return; }
        return caches.delete(key);
      }))
    }));
  });
  