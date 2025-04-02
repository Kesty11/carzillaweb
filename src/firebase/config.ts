import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWNj9aQRsVxFnI3ZegqipAm1DjWhYqStI",
  authDomain: "carzilla-48fbb.firebaseapp.com",
  projectId: "carzilla-48fbb",
  storageBucket: "carzilla-48fbb.firebasestorage.app",
  messagingSenderId: "1006536744813",
  appId: "1:1006536744813:web:ee8574e1ed4fca19b80464",
  measurementId: "G-DE4ND9GH9V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app; 