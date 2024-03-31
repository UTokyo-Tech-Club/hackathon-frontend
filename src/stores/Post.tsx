import { create } from 'zustand';

// type Post = {
//     blocks: {
//         type: string;
//         data: {
//             text: string;
//         };
//     }[];
    
//     setBlocks: (blocks: Post['blocks']) => void;
// }


// const UsePostStore = create<Post>((set) => ({
//     blocks: {} as Post['blocks'],

//     setBlocks: (blocks) => set({ blocks })
// }));

type Post = {
    content: string;
    isProcessing: boolean;

    setContent: (content: Post['content']) => void;
    setIsProcessing: (isProcessing: Post['isProcessing']) => void;
}

const UsePostStore = create<Post>((set) => ({
    content: '',
    isProcessing: false,

    setContent: (content) => set({ content: content }),
    setIsProcessing: (isProcessing) => set({ isProcessing: isProcessing })
}));

export default UsePostStore;