// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwG37nay1cMXRo9yWn6rwzuMXAN_m7I3s",
  authDomain: "e-commerce-3ac72.firebaseapp.com",
  projectId: "e-commerce-3ac72",
  storageBucket: "e-commerce-3ac72.firebasestorage.app",
  messagingSenderId: "551720256054",
  appId: "1:551720256054:web:9bc8176277fefc13e9ce97",
  measurementId: "G-4GYYZENWXE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

let analytics = null;

// Analytics is only available in supported browser environments.
if (typeof window !== "undefined") {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch(() => {
      analytics = null;
    });
}

export { app, auth, provider, analytics };
