import firebase from 'firebase/compat/app';
import { create } from 'zustand';
import { signOutUser } from '../firebase/auth';

type User = {
    isSignedIn: boolean;
    uid: string;
    username: string;
    email: string;
    photoURL: string;

    followingUsers: string[];

    signIn: (user: firebase.User) => void;
    signOut: () => void;
    setUid: (uid: string) => void;
    setUsername: (username: string) => void;
    setEmail: (email: string) => void;
    setPhoto: (photoURL: string) => void;

    addFollowingUser: (uid: string) => void;
    removeFollowingUser: (uid: string) => void;
}

const UseUserStore = create<User>((set) => ({
    isSignedIn: false,
    uid: '',
    username: '',
    email: '',
    photoURL: '',

    followingUsers: [],

    signIn: (user) => set({ isSignedIn: true, uid: user.uid, username: user.displayName || '', email: user.email || '', photoURL: user.photoURL || '' }),
    signOut: () => {
        set({ isSignedIn: false, uid: '', username: '', email: ''})
        signOutUser();
    },
    setUid: (uid: string) => set({ uid: uid }),
    setUsername: (username: string) => set({ username: username }),
    setEmail: (email: string) => set({ email: email }),
    setPhoto: (photoURL: string) => set({ photoURL: photoURL }),

    addFollowingUser: (uid) => set((state) => ({ followingUsers: [...state.followingUsers, uid] })),
    removeFollowingUser: (uid) => set((state) => ({ followingUsers: state.followingUsers.filter((u) => u !== uid) })),
}));

export default UseUserStore;