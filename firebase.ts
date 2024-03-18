import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getApp, getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAJz4uB3afxuxfSD2xpaElKtJvkX2TEY_o",
  authDomain: "dropstore-d467c.firebaseapp.com",
  projectId: "dropstore-d467c",
  storageBucket: "dropstore-d467c.appspot.com",
  messagingSenderId: "956856180631",
  appId: "1:956856180631:web:7e40d70d655d8c4af9aed2",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app)


export {db, storage}