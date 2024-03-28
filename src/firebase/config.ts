import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBJYAF2fVlb2EKrACC7f8tVqPqu74C2cTI",
    authDomain: "hackathon-76e20.firebaseapp.com",
    projectId: "hackathon-76e20",
    storageBucket: "hackathon-76e20.appspot.com",
    messagingSenderId: "808489631124",
    appId: "1:808489631124:web:9f4f82493ec11231e6e381",
    measurementId: "G-V0MSX9CMV9"
};

const app = initializeApp(firebaseConfig);
export const authApp = getAuth(app);
export const googleProvider = new GoogleAuthProvider();