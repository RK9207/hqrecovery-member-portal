import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSx2b4yqjDR-FlPaY-Pr3hevNe4K1eOmY",
  authDomain: "hq-recovery-b9630.firebaseapp.com",
  projectId: "hq-recovery-b9630",
  storageBucket: "hq-recovery-b9630.firebasestorage.app",
  messagingSenderId: "1078785407956",
  appId: "1:1078785407956:web:360ae893c67e28885f3441",
  measurementId: "G-SJ1KTZ867Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Analytics (optional, can be used later)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
