// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcKJSWdgSzxKOkwDjNv_QKQk6iPxbN14E",
  authDomain: "chat-app-ca568.firebaseapp.com",
  projectId: "chat-app-ca568",
  storageBucket: "chat-app-ca568.appspot.com",
  messagingSenderId: "494320370781",
  appId: "1:494320370781:web:5b7f45fd536e62107d39b4",
  measurementId: "G-XTX4VX486J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
