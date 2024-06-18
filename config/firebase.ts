import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore , collection , getDocs} from 'firebase/firestore';

import firebase from "firebase/compat/app"; // Note: You only need to import 'app' once
import "firebase/compat/auth";
import "firebase/compat/firestore";
import 'firebase/firestore';


  const firebaseConfig = {
    apiKey: "AIzaSyCANYXThMZNdoMkuMwd0Jne0OExbyqY6hg",
    authDomain: "fitify-4ee09.firebaseapp.com",
    projectId: "fitify-4ee09",
    storageBucket: "fitify-4ee09.appspot.com",
    messagingSenderId: "63121778909", 
    appId: "1:63121778909:web:69c07be94e5592d8731334",
    measurementId: "G-72FV2R1G4F"
  };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
console.log("Firebase initialized");
// Get authentication instance
const authentication = getAuth();


// get referemce to firestore collection
const firestore = getFirestore();

// collectiopn reference 

const colRefUsers = collection(db , 'users');

// get all documents from the collection
getDocs(colRefUsers).then(
    (snapshot) => {
        snapshot.forEach(doc => {
        // console.log(doc.id, '=>', doc.data());
        });
    }
);



export { firebase, authentication , db};
export default firebase; // Export the initialized Firebase instance for convenience