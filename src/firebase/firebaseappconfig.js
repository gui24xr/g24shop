// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACcT2q5QnnaMihHDNkBqcUaZXlI6IUM6Y",
  authDomain: "fir-practice-fd786.firebaseapp.com",
  projectId: "fir-practice-fd786",
  storageBucket: "fir-practice-fd786.appspot.com",
  messagingSenderId: "702403082534",
  appId: "1:702403082534:web:354d39b89029a7cc73e9e7"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)
//
export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)