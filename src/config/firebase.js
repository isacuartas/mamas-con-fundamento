import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvzymgTIsRQRNpKJSYbDChi-BFnlHXMlg",
  authDomain: "minsa-gestante-app.firebaseapp.com",
  projectId: "minsa-gestante-app",
  storageBucket: "minsa-gestante-app.firebasestorage.app",
  messagingSenderId: "634686776924",
  appId: "1:634686776924:web:25d2809d7d399c49c7e899"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
