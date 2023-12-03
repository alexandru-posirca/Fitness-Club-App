import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCtq_X2AQEZQQwMQJ2XawGp3OgZzW3MQ2I",
  authDomain: "fitness-landing-page-332e0.firebaseapp.com",
  projectId: "fitness-landing-page-332e0",
  storageBucket: "fitness-landing-page-332e0.appspot.com",
  messagingSenderId: "913531159836",
  appId: "1:913531159836:web:37ad61fb0b1ec74930e6d9",
  measurementId: "G-K5J9JWY2Q3",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);