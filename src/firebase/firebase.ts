// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC59C91cZD6KVlFr9QoeKh4ZbiuqWQcaSc",
  authDomain: "mgj-website.firebaseapp.com",
  databaseURL: "https://mgj-website-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mgj-website",
  storageBucket: "mgj-website.firebasestorage.app",
  messagingSenderId: "1068796830764",
  appId: "1:1068796830764:web:9110e88f67350f30b19d89",
  measurementId: "G-PFZY2L7RP4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);

