import { create } from 'zustand';

type ContentType = "feed" | "tweet" | "newTweet";

type AppStore = {
    isDeployed: boolean;

    currentContent: ContentType;
    isNewTweetOpen: boolean;
    isProfileSettingsOpen: boolean;
    profileSettingsAnchor: HTMLElement | null;
    
    setContent: (content: ContentType) => void;

    openNewTweet: () => void;
    closeNewTweet: () => void;

    toggleProfileSettings: () => void;
    setProfileSettingsAnchor: (anchor: HTMLElement | null) => void;
}

const UseAppStore = create<AppStore>((set) => ({
    isDeployed: Boolean(process.env.VERCEL),

    currentContent: "feed",
    isNewTweetOpen: false,
    isProfileSettingsOpen: false,
    profileSettingsAnchor: null,

    setContent: (content) => set({ currentContent: content }),

    openNewTweet: () => set({ isNewTweetOpen: true }),
    closeNewTweet: () => set({ isNewTweetOpen: false }),

    toggleProfileSettings: () => set((state) => ({ isProfileSettingsOpen: !state.isProfileSettingsOpen })),
    setProfileSettingsAnchor: (anchor) => set({ profileSettingsAnchor: anchor }),
}));

export default UseAppStore;