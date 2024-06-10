import { create } from 'zustand';
import { TweetInterface } from '../interfaces/Tweet';
import EditorJS from '@editorjs/editorjs';

type FeedStore = {
    tweets: TweetInterface[];
    tweetMapInstance: Map<string, EditorJS | null>;
    lastTweetAddMethod: "back" | "front";
    lastUpdatedUID: string;

    frontLinks: Map<string, TweetInterface[]>;
    backLinks: Map<string, TweetInterface[]>;

    // tweetsToUpdate: string[];

    addTweet: (tweet: TweetInterface) => void;
    addTweetFront: (tweet: TweetInterface) => void;
    updateTweet: (tweet: TweetInterface) => void;
    removeTweet: (tweet: TweetInterface) => void;
    addTweetMapInstance: (uid: string, instance: EditorJS) => void;

    incrementLikes: (tweetUID: string) => void;
    decrementLikes: (tweetUID: string) => void;

    resetLastTweetAddMethod: () => void;

    // addFrontLink: (tweetUID: string, tweet: TweetInterface) => void;
    // addBackLink: (tweetUID: string, tweet: TweetInterface) => void;

    // getFrontLinks: (tweetUID: string) => TweetInterface[];
    // getBackLinks: (tweetUID: string) => TweetInterface[];

    // setBackLinkedTweets: (tweetUID: string, tweets: TweetInterface[]) => void;
    // setFrontLinkedTweets: (tweetUID: string, tweets: TweetInterface[]) => void;

    // addTweetsToUpdate: (tweetUID: string) => void;
    // removeTweetsToUpdate: (tweetUID: string) => void;
}

const UseFeedStore = create<FeedStore>((set, get) => ({
    tweets: [],
    lastTweetAddMethod: "back",
    tweetMapInstance: new Map(),
    lastUpdatedUID: "",

    // tweetsToUpdate: [],

    frontLinks: new Map<string, TweetInterface[]>(),
    backLinks: new Map<string, TweetInterface[]>(),

    addTweet: (tweet) => set((state) => ({ tweets: [...state.tweets, tweet], lastTweetAddMethod: "back" })),
    addTweetFront: (tweet) => set((state) => {
        // if (tweet.linksBack && tweet.linksBack.length > 0) {
        //     tweet.linksBack.forEach(link => {
        //         state.backLinks.get(link)?.push(tweet);
        //         state.tweetsToUpdate.push(link);
        //     });
        // }
        return { tweets: [tweet, ...state.tweets], lastTweetAddMethod: "front" };
    }),
    updateTweet: (tweet) => set((state) => ({ tweets: state.tweets.map((t) => (t.uid === tweet.uid ? tweet : t)), lastUpdatedUID: tweet.uid })),
    removeTweet: (tweet) => set((state) => ({ tweets: state.tweets.filter((t) => t.uid !== tweet.uid) })),
    addTweetMapInstance: (uid, instance) => set((state) => ({ tweetMapInstance: state.tweetMapInstance.set(uid, instance) })),

    incrementLikes: (tweetUID) => set((state) => ({ tweets: state.tweets.map((t) => (t.uid === tweetUID ? { ...t, numLikes: (t.numLikes ?? 0) + 1 } : t)) })),
    decrementLikes: (tweetUID) => set((state) => ({ tweets: state.tweets.map((t) => (t.uid === tweetUID ? { ...t, numLikes: (t.numLikes ?? 0) - 1 } : t)) })),

    resetLastTweetAddMethod: () => set(() => ({ lastTweetAddMethod: "back" })),

    // addFrontLink: (tweetUID, tweet) => set((state) => {
    //     const existingTweets = state.frontLinks.get(tweetUID) || [];
    //     existingTweets.push(tweet);
    //     state.frontLinks.set(tweetUID, existingTweets);
    //     return { frontLinks: new Map(state.frontLinks) };
    // }),
    // addBackLink: (tweetUID, tweet) => set((state) => {
    //     const existingTweets = state.backLinks.get(tweetUID) || [];
    //     existingTweets.push(tweet);
    //     state.backLinks.set(tweetUID, existingTweets);
    //     return { backLinks: new Map(state.backLinks) };
    // }),

    // getFrontLinks: (tweetUID) => {
    //     const state = get();
    //     return state.frontLinks.get(tweetUID) || [];
    // },
    // getBackLinks: (tweetUID) => {
    //     const state = get();
    //     return state.backLinks.get(tweetUID) || [];
    // },
    // setBackLinkedTweets: (tweetUID, tweets) => set((state) => {
    //     state.backLinks.set(tweetUID, tweets);
    //     return { backLinks: new Map(state.backLinks) };
    // }),
    // setFrontLinkedTweets: (tweetUID, tweets) => set((state) => {
    //     state.frontLinks.set(tweetUID, tweets);
    //     return { frontLinks: new Map(state.frontLinks) };
    // }),

    // addTweetsToUpdate: (tweetUID) => set((state) => {
    //     state.tweetsToUpdate.push(tweetUID);
    //     return { tweetsToUpdate: state.tweetsToUpdate };
    // }),
    // removeTweetsToUpdate: (tweetUID) => set((state) => {
    //     state.tweetsToUpdate = state.tweetsToUpdate.filter((t) => t !== tweetUID);
    //     return { tweetsToUpdate: state.tweetsToUpdate };
    // }),
}));

export default UseFeedStore;