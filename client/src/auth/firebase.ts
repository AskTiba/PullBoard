// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCEjaQbpTImBSezXu0i4NI5NF-km2R-uzU",
    authDomain: "pr-board-79e2c.firebaseapp.com",
    projectId: "pr-board-79e2c",
    storageBucket: "pr-board-79e2c.firebasestorage.app",
    messagingSenderId: "119941915189",
    appId: "1:119941915189:web:7de65bf58f727fb652477c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);