// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApo-1x2hj2zu6RqKOb-_xm4rnF_HBTMsk",
  authDomain: "chatapp-edc0a.firebaseapp.com",
  projectId: "chatapp-edc0a",
  storageBucket: "chatapp-edc0a.appspot.com",
  messagingSenderId: "931930646366",
  appId: "1:931930646366:web:689680f5c31cb127c4d1cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { auth }