// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7JtH068jhTn_KOtuTmVCaM0W6-DLPusE",
  authDomain: "howird-d4446.firebaseapp.com",
  projectId: "howird-d4446",
  storageBucket: "howird-d4446.appspot.com",
  messagingSenderId: "149473313641",
  appId: "1:149473313641:web:f6b21047b93b21f80c73f8",
  measurementId: "G-K7VQXBJXPT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);