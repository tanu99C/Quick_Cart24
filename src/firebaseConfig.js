
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMyzVR2AdI5dnSqSKs4GgxMEomi3xJGc8",
  authDomain: "gcw-180b0.firebaseapp.com",
  projectId: "gcw-180b0",
  storageBucket: "gcw-180b0.appspot.com",
  messagingSenderId: "232876551580",
  appId: "1:232876551580:web:fc971e98c3ff1cc71aec59",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
