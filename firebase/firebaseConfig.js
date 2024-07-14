import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyBin2_7kOlYadbufHokFJrfYmsHpd83FdQ",
  authDomain: "next-flexibble-e57a6.firebaseapp.com",
  projectId: "next-flexibble-e57a6",
  storageBucket: "next-flexibble-e57a6.appspot.com",
  messagingSenderId: "243930803007",
  appId: "1:243930803007:web:6ec3f03b8887957807818a"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);