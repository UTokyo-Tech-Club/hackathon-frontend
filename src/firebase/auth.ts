import { signInWithPopup, signOut } from "firebase/auth";
import { authApp, googleProvider } from './config'
import { signInAnonymously as firebaseSignInAnonymously } from "firebase/auth";
import log from "loglevel";

const getToken = async () => {
    try {
        const user = authApp.currentUser;
        if (user) {
            const token = await user.getIdToken();
            return token; // Return the token
        } else {
            log.warn('No user is signed in');
        }
    } catch (error) {
        log.error('Error getting token:', error);
    }
};


const signOutUser = () => {
    signOut(authApp).then(() => {
        log.info("Signed out successfully");
        window.location.reload();
    }).catch((error) => {
        log.error("Sign out error", error);
    });
}


const signInWithGoogle = () => signInWithPopup(authApp, googleProvider)


const signInAnonymously = () => {
    firebaseSignInAnonymously(authApp).catch((error: any) => {
        alert(error.message);
    });
};


export { getToken, signInWithGoogle, signOutUser, signInAnonymously };