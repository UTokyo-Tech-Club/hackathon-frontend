import { create } from 'zustand';

type Tweet = {
    content: string;
    isProcessing: boolean;
    tweetUID: string;

    setContent: (content: string) => void;
    setIsProcessing: (isProcessing: boolean) => void;
    setTweetUID: (tweetUID: string) => void;
}

const UseTweetStore = create<Tweet>((set) => ({
    content: '',
    isProcessing: false,
    tweetUID: '',

    setContent: (content) => set({ content: content }),
    setIsProcessing: (isProcessing) => set({ isProcessing: isProcessing }),
    setTweetUID: (tweetUID) => set({ tweetUID: tweetUID })
}));

export default UseTweetStore;