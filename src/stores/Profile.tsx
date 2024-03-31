import { create } from 'zustand';

type Profile = {
    content: string;

    setContent: (content: string) => void;
}

const UseProfileStore = create<Profile>((set) => ({
    content: '',

    setContent: (content) => set({ content: content })
}));

export default UseProfileStore;