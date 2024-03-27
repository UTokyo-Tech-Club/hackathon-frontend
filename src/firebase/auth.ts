import { signInWithPopup, getAuth, signOut } from "firebase/auth";
import { authApp, googleProvider } from './config'
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
    }).catch((error) => {
        log.error("Sign out error", error);
    });
}


const signInWithGoogle = () => signInWithPopup(authApp, googleProvider)


export { getToken, signInWithGoogle, signOutUser };