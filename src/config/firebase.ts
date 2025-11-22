import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZiw3fReT0OTurVtkA5P6CTjsSBg-rJPk",
  authDomain: "hqrecov.firebaseapp.com",
  projectId: "hqrecov",
  storageBucket: "hqrecov.firebasestorage.app",
  messagingSenderId: "869255222828",
  appId: "1:869255222828:web:4bcd71f05537907eee6389",
  measurementId: "G-2XBEDMMJYX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Analytics (optional, can be used later)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
