// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore/lite';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAL58LDV55sEtahsP-uCPoTyVjCp0Hilv0',
  authDomain: 'shisha-counter-e65f6.firebaseapp.com',
  projectId: 'shisha-counter-e65f6',
  storageBucket: 'shisha-counter-e65f6.appspot.com',
  messagingSenderId: '260632925033',
  appId: '1:260632925033:web:a5397f68f4502e32f923f8',
  measurementId: 'G-QEWM6FESY3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
