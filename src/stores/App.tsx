import { create } from 'zustand';

type ContentType = "feed" | "tweet" | "newTweet";

type AppStore = {
    currentContent: ContentType;
    isNewTweetOpen: boolean;
    isProfileSettingsOpen: boolean;
    isEditProfileOpen: boolean;
    profileSettingsAnchor: HTMLElement | null;

    isSnackOpen: boolean;
    snackMessage: string;
    snakcSeverity: "success" | "error" | "warning" | "info";
    
    setContent: (content: ContentType) => void;

    openNewTweet: () => void;
    closeNewTweet: () => void;

    openEditProfile: () => void;
    closeEditProfile: () => void;

    toggleProfileSettings: () => void;
    closeProfileSettings: () => void;
    setProfileSettingsAnchor: (anchor: HTMLElement | null) => void;

    openSnack: (message: string, severity: "success" | "error" | "warning" | "info") => void;
    closeSnack: () => void;
}

const UseAppStore = create<AppStore>((set) => ({
    currentContent: "feed",
    isNewTweetOpen: false,
    isProfileSettingsOpen: false,
    isEditProfileOpen: false,
    profileSettingsAnchor: null,

    isSnackOpen: false,
    snackMessage: '',
    snakcSeverity: "success",

    setContent: (content) => set({ currentContent: content }),

    openNewTweet: () => set({ isNewTweetOpen: true }),
    closeNewTweet: () => set({ isNewTweetOpen: false }),

    openEditProfile: () => set({ isEditProfileOpen: true, isProfileSettingsOpen: false }),
    closeEditProfile: () => set({ isEditProfileOpen: false }),

    toggleProfileSettings: () => set((state) => ({ isProfileSettingsOpen: !state.isProfileSettingsOpen })),
    closeProfileSettings: () => set({ isProfileSettingsOpen: false }),
    setProfileSettingsAnchor: (anchor) => set({ profileSettingsAnchor: anchor }),

    openSnack: (message, severity) => set({ isSnackOpen: true, snackMessage: message, snakcSeverity: severity}),
    closeSnack: () => set({ isSnackOpen: false }),
}));

export default UseAppStore;