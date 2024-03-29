import { create } from 'zustand';

type Post = {
    blocks: {
        type: string;
        data: {
            text: string;
        };
    }[];
    
    setBlocks: (blocks: Post['blocks']) => void;
}


const UsePostStore = create<Post>((set) => ({
    blocks: {} as Post['blocks'],

    setBlocks: (blocks) => set({ blocks })
}));

export default UsePostStore;