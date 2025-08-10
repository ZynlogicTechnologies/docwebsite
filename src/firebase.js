// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyAzjP-1RMPrxCxtp8jsin0_CxyDbOZRO2k",
  authDomain: "docapp-9bdfb.firebaseapp.com",
  projectId: "docapp-9bdfb",
  storageBucket: "docapp-9bdfb.appspot.com",
  messagingSenderId: "1052145864161",
  appId: "1:1052145864161:web:e6d22681e92f10c8d84b9d",
  measurementId: "G-BWZW32HPRW"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging };
