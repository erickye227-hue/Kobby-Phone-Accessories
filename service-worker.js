const CACHE_NAME = "kobby-store-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./cart.html",
    "./checkout.html",
    "./success.html",
    "./css/style.css",
    "./js/script.js",
    "./js/checkout.js",
    "./images/icon-192.png",
    "./images/icon-512.png"
];


// INSTALL SERVICE WORKER

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)

        .then(cache => {

            return cache.addAll(FILES_TO_CACHE);

        })

    );

});




// LOAD FROM CACHE

self.addEventListener("fetch", event => {


    event.respondWith(

        caches.match(event.request)

        .then(response => {

            return response || fetch(event.request);

        })

    );


});




// UPDATE CACHE

self.addEventListener("activate", event => {


    event.waitUntil(

        caches.keys()

        .then(keys => {


            return Promise.all(

                keys.map(key => {


                    if(key !== CACHE_NAME){

                        return caches.delete(key);

                    }


                })

            );


        })

    );


});