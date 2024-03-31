import { create } from 'zustand';

type Profile = {
    content: string;
    isProcessing: boolean;

    setContent: (content: string) => void;
    setIsProcessing: (processing: boolean) => void;
}

const UseProfileStore = create<Profile>((set) => ({
    content: '',
    isProcessing: false,

    setContent: (content) => set({ content: content }),
    setIsProcessing: (processing) => set({ isProcessing: processing })
}));

export default UseProfileStore;