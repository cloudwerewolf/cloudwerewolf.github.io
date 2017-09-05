importScripts('/cache-polyfill.js');

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('airhorner').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/main.css',
       '/note.js'
     ]);
   })
 );
});
self.addEventListener('fetch', function(event) {
    console.log(event.request.url);
});