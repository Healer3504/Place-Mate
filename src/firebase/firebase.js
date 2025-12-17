// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAomFmfPN-aaDF_4YrXUj3MifCL5XGp39U",
  authDomain: "placemate-81341.firebaseapp.com",
  projectId: "placemate-81341",
  storageBucket: "placemate-81341.firebasestorage.app",
  messagingSenderId: "681711206196",
  appId: "1:681711206196:web:05f347bac781494878af61",
  measurementId: "G-CDENLC0RZN"
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);


export default app;
