/**
 * Register Service Worker
 **/
if (navigator.serviceWorker) {
    navigator.serviceWorker
        .register('./sw.js')
        .then(resp => console.log(`Service Worker Registered, scope is ${resp.scope}`))
        .catch(err => console.log(`Service Worker Failed! - ${err}`))
}
