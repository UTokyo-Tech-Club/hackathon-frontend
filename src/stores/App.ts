import { create } from 'zustand';

type DisplayType = "feed" | "tweet" | "newTweet";

type AppStore = {
    currentDisplay: DisplayType;
    
    setDisplay: (display: DisplayType) => void;
}

const UseAppStore = create<AppStore>((set) => ({
    currentDisplay: "feed",

    setDisplay: (display) => set({ currentDisplay: display }),
}));

export default UseAppStore;