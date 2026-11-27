// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnmKHwPXMWThnJEl1skgxKtf76_7zvRGU",
  authDomain: "organic-devbhoomi.firebaseapp.com",
  projectId: "organic-devbhoomi",
  storageBucket: "organic-devbhoomi.firebasestorage.app",
  messagingSenderId: "452770500856",
  appId: "1:452770500856:web:83d7bd92bd144ff0676b0d",
  measurementId: "G-W2D0YKD0RE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
