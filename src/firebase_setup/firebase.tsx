// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-I6uCAC5noSS67VuzYskMOYn0SbMyvXc",
  authDomain: "projectunicorn-2463b.firebaseapp.com",
  projectId: "projectunicorn-2463b",
  storageBucket: "projectunicorn-2463b.appspot.com",
  messagingSenderId: "505946466182",
  appId: "1:505946466182:web:88580b37086439f854ae07",
  measurementId: "G-V9WQ05RS22",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { firestore, app, storage };
