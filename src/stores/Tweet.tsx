import { create } from 'zustand';

type Tweet = {
    content: string;
    imageUrl: String;
    isProcessing: boolean;
    tweetUID: string;

    setContent: (content: string) => void;
    setIsProcessing: (isProcessing: boolean) => void;
    setTweetUID: (tweetUID: string) => void;
    setImageUrl: (imageUrl: string) => void;
}

const UseTweetStore = create<Tweet>((set) => ({
    content: '',
    isProcessing: false,
    tweetUID: '',
    imageUrl: '',


    setContent: (content) => set({ content: content }),
    setIsProcessing: (isProcessing: boolean) => set({ isProcessing }),
    setTweetUID: (tweetUID: string) => set({ tweetUID }),
    setImageUrl: (imageUrl: string) => set({ imageUrl }),
}));

export default UseTweetStore;