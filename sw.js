const staticCacheName = 'restaurant-static-v1';

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(staticCacheName)
            .then(function (cache) {
                return cache.addAll([
                    '/',
                    '/index.html',
                    '/restaurant.html?id=1',
                    '/restaurant.html?id=2',
                    '/restaurant.html?id=3',
                    '/restaurant.html?id=4',
                    '/restaurant.html?id=5',
                    '/restaurant.html?id=6',
                    '/restaurant.html?id=7',
                    '/restaurant.html?id=8',
                    '/restaurant.html?id=9',
                    '/restaurant.html?id=10',
                    '/css/styles.css',
                    '/css/responsive.css',
                    '/js/dbhelper.js',
                    '/js/main.js',
                    '/js/register_sw.js',
                    '/js/restaurant_info.js',
                    '/data/restaurants.json',
                    '/img/fav-icon.png',
                    '/img/offline.jpg'
                ]).catch(function (err) {
                    console.log('Opening cache failed ' + err);
                });
            })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request).then(function (fetchResponse) {
                return caches.open(staticCacheName).then(function (cache) {
                    cache.put(event.request, fetchResponse.clone());
                    return fetchResponse;
                });
            });
        }).catch(function (error) {
            if (event.request.url.includes('.jpg')) {
                return caches.match('/img/offline.jpg');
            }
            return new Response('Not connected to Internet', {
                status: 404,
                statusText: 'Not connected to the internet'
            });
        })
    );
});