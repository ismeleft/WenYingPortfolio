// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB59Bvbp-sG3JYyIDAEl8sz_nxor5Tiu6I",
  authDomain: "wen-ying-portfolio.firebaseapp.com",
  projectId: "wen-ying-portfolio",
  storageBucket: "wen-ying-portfolio.appspot.com",
  messagingSenderId: "160124376399",
  appId: "1:160124376399:web:ed6c68ed9ddfbdd528213a",
  measurementId: "G-B7LSGGB14P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
