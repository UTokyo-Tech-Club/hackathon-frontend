import { create } from 'zustand';

type Profile = {
    content: string;
    processing: boolean;

    setContent: (content: string) => void;
    setProcessing: (processing: boolean) => void;
}

const UseProfileStore = create<Profile>((set) => ({
    content: '',
    processing: false,

    setContent: (content) => set({ content: content }),
    setProcessing: (processing) => set({ processing: processing })
}));

export default UseProfileStore;