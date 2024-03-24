import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from './config'
import log from "loglevel";

const getToken = async () => {
    try {
        const user = auth.currentUser;
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


const signInWithGoogle = () => signInWithPopup(auth, googleProvider)


export { getToken, signInWithGoogle };