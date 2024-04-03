import { create } from 'zustand';

type Profile = {
    content: string;
    isProcessing: boolean;

    isProcessingFollow: boolean;

    setContent: (content: string) => void;
    setIsProcessing: (processing: boolean) => void;
    setIsProcessingFollow: (processing: boolean) => void;
}

const UseProfileStore = create<Profile>((set) => ({
    content: "",
    isProcessing: false,

    isProcessingFollow: false,

    setContent: (content) => set({ content: content }),
    setIsProcessing: (processing) => set({ isProcessing: processing }),
    setIsProcessingFollow: (processing) => set({ isProcessingFollow: processing })
}));

export default UseProfileStore;