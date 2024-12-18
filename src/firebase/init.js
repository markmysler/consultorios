// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
	browserLocalPersistence,
	getAuth,
	setPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const functions = getFunctions(firebaseApp);
export const storage = getStorage(firebaseApp);

// if (location.hostname === "localhost") {
// 	connectFunctionsEmulator(functions, "localhost", 5001);
// }

setPersistence(auth, browserLocalPersistence).catch((error) => {
	console.error("Error setting persistence: ", error);
});
