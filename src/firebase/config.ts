import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDvZAy6r6X4iDC77ZaDoZJIfRv8_fexqVU",
	authDomain: "qfilm-12e84.firebaseapp.com",
	projectId: "qfilm-12e84",
	storageBucket: "qfilm-12e84.appspot.com",
	messagingSenderId: "1097212486038",
	appId: "1:1097212486038:web:0f240ab9a8d3e95822fdb7",
	measurementId: "G-RREHPG7VTP"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);