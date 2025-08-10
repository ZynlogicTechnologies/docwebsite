// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAzjP-1RMPrxCxtp8jsin0_CxyDbOZRO2k",
  authDomain: "docapp-9bdfb.firebaseapp.com",
  projectId: "docapp-9bdfb",
  storageBucket: "docapp-9bdfb.appspot.com",
  messagingSenderId: "1052145864161",
  appId: "1:1052145864161:web:e6d22681e92f10c8d84b9d",
  measurementId: "G-BWZW32HPRW"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
