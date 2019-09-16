if ('function' === typeof importScripts) {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js'
  )
  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded')

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([])

    /* custom cache rules*/
    workbox.routing.registerNavigationRoute('/index.html', {
      blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/]
    })

    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg|svg|ico|webp|json|html|ttf|woff|)$/,
      workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
          })
        ]
      })
    )

    // workbox.routing.registerRoute(
    //   // new RegExp('(http:\/\/baseball\.card-viewer\.api\.staging\.strat-o-matic\.com\/public\/index\.php\/api\/v2\/)((?:[a-z][a-z0-9_]*))'),
    //   // new RegExp('^https://fonts.(?:googleapis|gstatic).com/(.*)'),
    //   new RegExp('(https:\/\/public\.api\.staging\.strat-o-matic\.com\:9109\/Cloud-Games\/api\/v1\/)((?:[a-z][a-z0-9_]*))'),
    //   new workbox.strategies.CacheFirst({
    //     cacheName: 'api-cache',
    //     plugins: [
    //       new workbox.expiration.Plugin({
    //         maxEntries: 60,
    //         maxAgeSeconds: 24 * 60 * 60 // 1 Day
    //       })
    //     ]
    //   }),
    // )
  }
}
