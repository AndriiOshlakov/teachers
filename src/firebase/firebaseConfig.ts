// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrlHiZspmeQHaJCiZuqSmvy8FGF7Wz9_k",
  authDomain: "teachers-22122025.firebaseapp.com",
  databaseURL:
    "https://teachers-22122025-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "teachers-22122025",
  storageBucket: "teachers-22122025.firebasestorage.app",
  messagingSenderId: "663439901410",
  appId: "1:663439901410:web:a4aeccfd3065beaced94bb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
