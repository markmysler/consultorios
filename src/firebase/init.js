// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAnW2HUrkIZSVy3xDBdyQ47Gp0ZDwO8HJE",
	authDomain: "consultorios-971ac.firebaseapp.com",
	projectId: "consultorios-971ac",
	storageBucket: "consultorios-971ac.appspot.com",
	messagingSenderId: "987097314423",
	appId: "1:987097314423:web:37ecb38df2e64ab16b0272",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore();
