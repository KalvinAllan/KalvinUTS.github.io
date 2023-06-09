const cashefirst = 'mdl-template-portfolio';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/images/',
    '/css/',
    '/js/*',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cashefirst)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }

                return fetch(event.request)
                    .then(response => {
                        const responseToCache = response.clone();

                        caches.open(cashefirst)
                            .then(cache => cache.put(event.request, responseToCache));

                        return response;
                    });
            })
    );
});