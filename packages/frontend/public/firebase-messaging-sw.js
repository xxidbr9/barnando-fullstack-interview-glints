importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyATeL3Ul0gDFlg5UM0Iw3Z5B_WPlt7UekA",
	authDomain: "pwa-notification-33a7b.firebaseapp.com",
	projectId: "pwa-notification-33a7b",
	storageBucket: "pwa-notification-33a7b.appspot.com",
	messagingSenderId: "920914941227",
	appId: "1:920914941227:web:f8190ebc2314642f76e16e",
	measurementId: "G-EZJTCK8LBK"
};

// Initialize Firebase
// if ('serviceWorker' in navigator) {
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);


// for background
messaging.setBackgroundMessageHandler((payload) => {
	let data = JSON.parse(payload.data.custom_notification);
	let notificationTitle = data.title;
	let notificationOptions = {
		body: data.body,
		icon: '/images/icon-512.png',
		// options event
		actions: [
			{ action: 'confirmAttendance', title: '👍 Confirm attendance' },
			{ action: 'cancel', title: '👎 Not coming' }
		],
		// For additional data to be sent to event listeners, needs to be set in this data {}
		data: { confirm: data.confirm, decline: data.decline, open: data.open }
	};

	return self.registration.showNotification(notificationTitle, notificationOptions);
});

//background notifications will be received here
// messaging.setBackgroundMessageHandler(function (payload) {
// 	console.log('[firebase-messaging-sw.js] Received background message ', payload)
// 	// Customize notification here
// 	const notificationTitle = 'Background Message Title'
// 	const notificationOptions = {
// 		body: 'Background Message body.',
// 		icon: '/firebase-logo.png'
// 	}

// 	return self.registration.showNotification(notificationTitle, notificationOptions)
// })

messaging.onBackgroundMessage(function (payload) {
	console.log('[firebase-messaging-sw.js] Received background message ', payload)
	const notificationTitle = 'Background Message Title'
	const notificationOptions = {
		body: 'Background Message body.',
		icon: '/images/icon-512.png',

	}
	return self.registration.showNotification(notificationTitle, notificationOptions)
})

