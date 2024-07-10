// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvM_2h9-BcuYSA8qVInI3CMAk8rbo62bw",
  authDomain: "business-directory-845b1.firebaseapp.com",
  projectId: "business-directory-845b1",
  storageBucket: "business-directory-845b1.appspot.com",
  messagingSenderId: "75501517924",
  appId: "1:75501517924:web:086d482585441a4dfb7371",
  measurementId: "G-BWQJNFF5RC",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);
