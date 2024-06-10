import { create } from 'zustand';

type Post = {
    content: string;
    linkUid: string;
    isProcessing: boolean;

    setContent: (content: string) => void;
    setLinkUid: (linkUid: string) => void;
    setIsProcessing: (isProcessing: boolean) => void;
}

const UsePostStore = create<Post>((set) => ({
    content: '',
    linkUid: '',
    isProcessing: false,

    setContent: (content) => set({ content: content }),
    setLinkUid: (linkUid) => set({ linkUid: linkUid }),
    setIsProcessing: (isProcessing) => set({ isProcessing: isProcessing })
}));

export default UsePostStore;