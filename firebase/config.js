import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDDNMLD8WnxxFDJTKma-KMvAFq1D-rsimA",
  authDomain: "gallery-nextjs.firebaseapp.com",
  projectId: "gallery-nextjs",
  storageBucket: "gallery-nextjs.appspot.com",
  messagingSenderId: "908553752391",
  appId: "1:908553752391:web:ed5332a82e99c466c24662",
};

initializeApp(firebaseConfig);
const db = getFirestore();
const storege = getStorage();

export { db, storege };
