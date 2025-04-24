// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_tm6lcWoBSu6WKzwQ9pA39LEP6yj-OgA",
  authDomain: "smiski-angel.firebaseapp.com",
  projectId: "smiski-angel",
  storageBucket: "smiski-angel.appspot.com",
  messagingSenderId: "661828352717",
  appId: "1:661828352717:web:cf904459bfb4de1bda4784",
  measurementId: "G-G8BBPRQ43Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);