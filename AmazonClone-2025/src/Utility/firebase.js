import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

//web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOabAzEp6iruklIzDvS21MTLfXH5sCNzk",
  authDomain: "clone-cde16.firebaseapp.com",
  projectId: "clone-cde16",
  storageBucket: "clone-cde16.firebasestorage.app",
  messagingSenderId: "738634959432",
  appId: "1:738634959432:web:e5b682620227a77b3a667d",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
