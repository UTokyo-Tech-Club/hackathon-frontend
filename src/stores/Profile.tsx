import { create } from 'zustand';

type Profile = {
    blocks: {
        type: string;
        data: {
            text: string;
        };
    }[];
    
    setBlocks: (blocks: Profile['blocks']) => void;
}

const UseProfileStore = create<Profile>((set) => ({
    blocks: {} as Profile['blocks'],

    setBlocks: (blocks) => set({ blocks })
}));

export default UseProfileStore;