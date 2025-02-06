import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query, // HOZZÁADVA
  where, // HOZZÁADVA
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Firebase inicializálása
const app = initializeApp(firebaseConfig);

// Firestore és Auth inicializálása
const db = getFirestore(app);
const auth = getAuth(app);

// Exportálás
export { db, auth, collection, addDoc, getDocs, deleteDoc, doc, query, where };
