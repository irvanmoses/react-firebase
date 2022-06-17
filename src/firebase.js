// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCX7VT4MZ40mEtdZkYcbgAU2wmM_6LvLV8",
  authDomain: "react-firebase-be3e5.firebaseapp.com",
  databaseURL:
    "https://react-firebase-be3e5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-firebase-be3e5",
  storageBucket: "react-firebase-be3e5.appspot.com",
  messagingSenderId: "867303780668",
  appId: "1:867303780668:web:191c73623f6d34fd146e39",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
