import { create } from 'zustand';

type ContentType = "feed" | "tweet" | "newTweet";

type AppStore = {
    currentContent: ContentType;
    isNewTweetOpen: boolean;
    
    setContent: (content: ContentType) => void;

    openNewTweet: () => void;
    closeNewTweet: () => void;
}

const UseAppStore = create<AppStore>((set) => ({
    currentContent: "feed",
    isNewTweetOpen: false,

    setContent: (content) => set({ currentContent: content }),

    openNewTweet: () => set({ isNewTweetOpen: true }),
    closeNewTweet: () => set({ isNewTweetOpen: false }),
}));

export default UseAppStore;