import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore, memoryLocalCache } from "firebase/firestore";

// const firebaseConfig = {
// 	apiKey: "AIzaSyDvZAy6r6X4iDC77ZaDoZJIfRv8_fexqVU",
// 	authDomain: "qfilm-12e84.firebaseapp.com",
// 	projectId: "qfilm-12e84",
// 	storageBucket: "qfilm-12e84.appspot.com",
// 	messagingSenderId: "1097212486038",
// 	appId: "1:1097212486038:web:0f240ab9a8d3e95822fdb7",
// 	measurementId: "G-RREHPG7VTP"
// };

const firebaseConfig = {
	apiKey: "AIzaSyDqksHm-YhQr9AlWiYz1hGFmCMYLvhhsJI",
	authDomain: "cinebolt.firebaseapp.com",
	projectId: "cinebolt",
	storageBucket: "cinebolt.appspot.com",
	messagingSenderId: "2286633730",
	appId: "1:2286633730:web:3e499731defaa5ca01b81b"
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);