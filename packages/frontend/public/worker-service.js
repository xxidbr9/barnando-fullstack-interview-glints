import 'firebase/compat/messaging'
import { clientsClaim, skipWaiting } from 'workbox-core'
import { ExpirationPlugin } from 'workbox-expiration'
import {
  NetworkOnly,
  NetworkFirst,
  CacheFirst,
  StaleWhileRevalidate,
} from 'workbox-strategies'
import {
  registerRoute,
  setDefaultHandler,
  setCatchHandler,
} from 'workbox-routing'
import {
  matchPrecache,
  precacheAndRoute,
  cleanupOutdatedCaches,
} from 'workbox-precaching'
import { initializeApp } from 'firebase/app'
import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw'

self.skipWaiting()
clientsClaim()

// must include following lines when using inject manifest module from workbox
// https://developers.google.com/web/tools/workbox/guides/precache-files/workbox-build#add_an_injection_point
const WB_MANIFEST = self.__WB_MANIFEST
// // // // Precache fallback route and image
WB_MANIFEST.push({
  url: '/',
  revision: '1234567890',
})

precacheAndRoute(WB_MANIFEST)

cleanupOutdatedCaches()

registerRoute(
  new RegExp('/_next/static'),
  new StaleWhileRevalidate({
    cacheName: 'static-caches',
  })
)

registerRoute(
  '/',
  new NetworkFirst({
    cacheName: 'start-url',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 1,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0,
      }),
    ],
  }),
  'GET'
)
registerRoute(
  /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
  new CacheFirst({
    cacheName: 'google-fonts',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 4,
        maxAgeSeconds: 31536e3,
        purgeOnQuotaError: !0,
      }),
    ],
  }),
  'GET'
)
registerRoute(
  /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
  new StaleWhileRevalidate({
    cacheName: 'static-font-assets',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 4,
        maxAgeSeconds: 604800,
        purgeOnQuotaError: !0,
      }),
    ],
  }),
  'GET'
)
// disable image cache, so we could observe the placeholder image when offline
registerRoute(
  /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
  new NetworkOnly({
    cacheName: 'static-image-assets',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 64,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0,
      }),
    ],
  }),
  'GET'
)
registerRoute(
  /\.(?:js)$/i,
  new StaleWhileRevalidate({
    cacheName: 'static-js-assets',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 32,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0,
      }),
    ],
  }),
  'GET'
)
registerRoute(
  /\.(?:css|less)$/i,
  new StaleWhileRevalidate({
    cacheName: 'static-style-assets',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 32,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0,
      }),
    ],
  }),
  'GET'
)
registerRoute(
  /\.(?:json|xml|csv)$/i,
  new NetworkFirst({
    cacheName: 'static-data-assets',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 32,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0,
      }),
    ],
  }),
  'GET'
)
registerRoute(
  /\/api\/.*$/i,
  new NetworkFirst({
    cacheName: 'apis',
    networkTimeoutSeconds: 10,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 16,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0,
      }),
    ],
  }),
  'GET'
)
registerRoute(
  /.*/i,
  new NetworkFirst({
    cacheName: 'others',
    networkTimeoutSeconds: 10,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 32,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0,
      }),
    ],
  }),
  'GET'
)

// following lines gives you control of the offline fallback strategies
// https://developers.google.com/web/tools/workbox/guides/advanced-recipes#comprehensive_fallbacks

// Use a stale-while-revalidate strategy for all other requests.
setDefaultHandler(new StaleWhileRevalidate())

// This "catch" handler is triggered when any of the other routes fail to
// generate a response.
setCatchHandler(({ event }) => {
  // The FALLBACK_URL entries must be added to the cache ahead of time, either
  // via runtime or precaching. If they are precached, then call
  // `matchPrecache(FALLBACK_URL)` (from the `workbox-precaching` package)
  // to get the response from the correct cache.
  //
  // Use event, request, and url to figure out how to respond.
  // One approach would be to use request.destination, see
  // https://medium.com/dev-channel/service-worker-caching-strategies-based-on-request-types-57411dd7652c
  switch (event.request.destination) {
    case 'document':
      // If using precached URLs:
      return matchPrecache('/fallback')
      // return caches.match('/fallback')
      break
    case 'image':
      // If using precached URLs:
      return matchPrecache('/static/images/fallback.png')
      // return caches.match('/static/images/fallback.png')
      break
    case 'font':
    // If using precached URLs:
    // return matchPrecache(FALLBACK_FONT_URL);
    // return caches.match('/static/fonts/fallback.otf')
    // break
    default:
      // If we don't have a fallback, just return an error response.
      return Response.error()
  }
})

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import localforage from "localforage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyATeL3Ul0gDFlg5UM0Iw3Z5B_WPlt7UekA',
  authDomain: 'pwa-notification-33a7b.firebaseapp.com',
  projectId: 'pwa-notification-33a7b',
  storageBucket: 'pwa-notification-33a7b.appspot.com',
  messagingSenderId: '920914941227',
  appId: '1:920914941227:web:f8190ebc2314642f76e16e',
  measurementId: 'G-EZJTCK8LBK',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// firebase.initializeApp({
// 	'messagingSenderId': ''
// });

/**
 * define message const
 */

// const messaging = app.messaging();
const messaging = getMessaging(app, {
  vapidKey:
    'BNTEuAFUQHiLHKUudu11KDRFolteaeFfDVjvGxFou7p963f3NOXvqz-LHNx3aRoI5QsBYY-UPMrerbCpLREUCGg',
})

/**
 * --- Installs service worker ---
 */

self.addEventListener('install', event => {
  console.log('Service worker installed')
})

/**
 * --- user click notification ---
 * --- get notification object ---
 * use event.notification.data
 */

self.addEventListener(
  'notificationclick',
  event => {
    // Event actions derived from event.notification.data from data received
    var eventURL = event.notification.data
    event.notification.close()
    if (event.action === 'confirmAttendance') {
      clients.openWindow(eventURL.confirm)
    } else if (event.action === 'cancel') {
      clients.openWindow(eventURL.decline)
    } else {
      clients.openWindow(eventURL.open)
    }
  },
  false
)

self.addEventListener('fetch', function (event) {
  if (event.request.url === new URL('/', location).href) {
    event.respondWith(
      new Response('<h1>Hello!</h1>', {
        headers: { 'Content-Type': 'text/html' },
      })
    )
  }
})

/**
 * --- received message(Background) ---
 * [CUSTOM] dont put notification element in payload
 * --- payload must be like this ---
 * payload : {
 *  data: {
 *    ...
 *    notification: {
 *      title: ''
 *      body: ''
 *    }
 *    ...
 *  }
 * }
 */

// messaging.getToken({
// 	vapidKey: 'BNTEuAFUQHiLHKUudu11KDRFolteaeFfDVjvGxFou7p963f3NOXvqz-LHNx3aRoI5QsBYY-UPMrerbCpLREUCGg'
// })

// messaging.setBackgroundMessageHandler((payload) => {
// 	let data = JSON.parse(payload.data.custom_notification);
// 	let notificationTitle = data.title;
// 	let notificationOptions = {
// 		body: data.body,
// 		icon: 'https://image.flaticon.com/icons/png/128/107/107822.png',
// 		// options event
// 		actions: [
// 			{ action: 'confirmAttendance', title: '👍 Confirm attendance' },
// 			{ action: 'cancel', title: '👎 Not coming' }
// 		],
// 		// For additional data to be sent to event listeners, needs to be set in this data {}
// 		data: { confirm: data.confirm, decline: data.decline, open: data.open }
// 	};

// 	return self.registration.showNotification(notificationTitle, notificationOptions);
// });

onBackgroundMessage(messaging, payload => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  )
  // Customize notification here
  const notificationTitle = 'Background Message Title'
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/images/favicon.png',
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})

// messaging
// 	.requestPermission()
// 	.then(() => {
// 		message.innerHTML = "Notifications allowed";
// 		return messaging.getToken();
// 	})
// 	.then(token => {
// 		tokenString.innerHTML = "Token Is : " + token;
// 	})
// 	.catch(err => {
// 		errorMessage.innerHTML = errorMessage.innerHTML + "; " + err;
// 		console.log("No permission to send push", err);
// 	});

// //background notifications will be received here
// messaging.setBackgroundMessageHandler(function (payload) {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload)
//   // Customize notification here
//   const notificationTitle = 'Background Message Title'
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/firebase-logo.png'
//   }

//   return self.registration.showNotification(notificationTitle, notificationOptions)
// })

// messaging.onBackgroundMessage(function (payload) {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload)
//   const notificationTitle = 'Background Message Title'
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/firebase-logo.png'
//   }

//   return self.registration.showNotification(notificationTitle, notificationOptions)
// })
