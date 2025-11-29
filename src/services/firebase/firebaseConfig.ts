import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAmAEasWVGivE2dfP-ImzAoPYBONNBA9ZI",
  authDomain: "satisfatingyou-44df1.firebaseapp.com",
  projectId: "satisfatingyou-44df1",
  storageBucket: "satisfatingyou-44df1.firebasestorage.app",
  messagingSenderId: "196891174832",
  appId: "1:196891174832:web:b4944d6be45d0b547f9875",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
