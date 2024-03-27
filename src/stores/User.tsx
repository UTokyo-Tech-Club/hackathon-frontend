import firebase from 'firebase/compat/app';
import { create } from 'zustand';
import { signOutUser } from '../firebase/auth';

type User = {
    isSignedIn: boolean;
    uid: string;
    username: string;
    email: string;

    signIn: (user: firebase.User) => void;
    signOut: () => void;
    setUid: (uid: string) => void;
    setUsername: (username: string) => void;
    setEmail: (email: string) => void;
}

const UseUserStore = create<User>((set) => ({
    isSignedIn: false,
    uid: '',
    username: '',
    email: '',

    signIn: (user) => set({ isSignedIn: true, uid: user.uid, username: user.displayName || '', email: user.email || ''}),
    signOut: () => {
        set({ isSignedIn: false, uid: '', username: '', email: ''})
        signOutUser();
    },
    setUid: (uid: string) => set({ uid: uid }),
    setUsername: (username: string) => set({ username: username }),
    setEmail: (email: string) => set({ email: email }),
}));

export default UseUserStore;