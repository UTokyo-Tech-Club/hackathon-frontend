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
    bookmarkedTweets: string[];
    likedTweets: string[];

    isLoadingProfile: boolean;

    signIn: (user: firebase.User) => void;
    signOut: () => void;
    setUid: (uid: string) => void;
    setUsername: (username: string) => void;
    setEmail: (email: string) => void;
    setPhoto: (photoURL: string) => void;

    addFollowingUser: (uid: string) => void;
    removeFollowingUser: (uid: string) => void;
    setFollowingUsers: (uids: string[]) => void;

    addBookmarkedTweet: (tweetUID: string) => void;
    removeBookmarkedTweet: (tweetUID: string) => void;
    setBookmarkedTweets: (tweetUIDs: string[]) => void;

    addLikedTweet: (tweetUID: string) => void;
    removeLikedTweet: (tweetUID: string) => void;
    setLikedTweets: (tweetUIDs: string[]) => void;

    setIsLoadingProfile: (isLoading: boolean) => void;
}

const UseUserStore = create<User>((set) => ({
    isSignedIn: false,
    uid: '',
    username: '',
    email: '',
    photoURL: '',

    followingUsers: [],
    bookmarkedTweets: [],
    likedTweets: [],

    isLoadingProfile: true,

    signIn: (user) => set({ isSignedIn: true, uid: user.uid, username: user.displayName || '', email: user.email || '', photoURL: user.photoURL || '' }),
    signOut: () => {
        set({ isSignedIn: false, uid: '', username: '', email: '', photoURL: '', followingUsers: []})
        signOutUser();
    },
    setUid: (uid: string) => set({ uid: uid }),
    setUsername: (username: string) => set({ username: username }),
    setEmail: (email: string) => set({ email: email }),
    setPhoto: (photoURL: string) => set({ photoURL: photoURL }),

    addFollowingUser: (uid) => set((state) => ({ followingUsers: [...state.followingUsers, uid] })),
    removeFollowingUser: (uid) => set((state) => ({ followingUsers: state.followingUsers.filter((u) => u !== uid) })),
    setFollowingUsers: (uids) => set({ followingUsers: uids }),

    addBookmarkedTweet: (tweetUID) => set((state) => ({ bookmarkedTweets: [...state.bookmarkedTweets, tweetUID] })),
    removeBookmarkedTweet: (tweetUID) => set((state) => ({ bookmarkedTweets: state.bookmarkedTweets.filter((t) => t !== tweetUID) })),
    setBookmarkedTweets: (tweetUIDs) => set({ bookmarkedTweets: tweetUIDs }),

    addLikedTweet: (tweetUID) => set((state) => ({ likedTweets: [...state.likedTweets, tweetUID] })),
    removeLikedTweet: (tweetUID) => set((state) => ({ likedTweets: state.likedTweets.filter((t) => t !== tweetUID) })),
    setLikedTweets: (tweetUIDs) => set({ likedTweets: tweetUIDs }),

    setIsLoadingProfile: (isLoading) => set({ isLoadingProfile: isLoading })
}));

export default UseUserStore;