// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// TO CHANGE
const firebaseConfig = {
  apiKey: "AIzaSyDXY6aMCrv2-WTy0abVQTbJpV3nJNF13Fs",
  authDomain: "howirdcom.firebaseapp.com",
  projectId: "howirdcom",
  storageBucket: "howirdcom.appspot.com",
  messagingSenderId: "42633865788",
  appId: "1:42633865788:web:30025cb23f16832d83f139",
  measurementId: "G-WQDRMVFD0P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);