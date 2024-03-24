import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCKHLVg_KPnsuVirVD8PYT-p2Jz7jYqyS0",
    authDomain: "mesh-ade28.firebaseapp.com",
    projectId: "mesh-ade28",
    storageBucket: "mesh-ade28.appspot.com",
    messagingSenderId: "189001086824",
    appId: "1:189001086824:web:9faaee1bb04740eee888dd",
    measurementId: "G-B4E68X45BV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();