import { create } from 'zustand';

type Post = {
    content: string;
    isProcessing: boolean;

    setContent: (content: string) => void;
    setIsProcessing: (isProcessing: boolean) => void;
}

const UsePostStore = create<Post>((set) => ({
    content: '',
    isProcessing: false,

    setContent: (content) => set({ content: content }),
    setIsProcessing: (isProcessing) => set({ isProcessing: isProcessing })
}));

export default UsePostStore;