import { create } from 'zustand';
import { TweetInterface } from '../interfaces/Tweet';
import EditorJS from '@editorjs/editorjs';

type FeedStore = {
    tweets: TweetInterface[];
    tweetMapInstance: Map<string, EditorJS | null>;
    lastTweetAddMethod: "back" | "front";
    lastUpdatedUID: string;

    addTweet: (tweet: TweetInterface) => void;
    addTweetFront: (tweet: TweetInterface) => void;
    updateTweet: (tweet: TweetInterface) => void;
    removeTweet: (tweet: TweetInterface) => void;
    addTweetMapInstance: (uid: string, instance: EditorJS) => void;
}

const UseFeedStore = create<FeedStore>((set) => ({
    tweets: [],
    lastTweetAddMethod: "back",
    tweetMapInstance: new Map(),
    lastUpdatedUID: "",

    addTweet: (tweet) => set((state) => ({ tweets: [...state.tweets, tweet], lastTweetAddMethod: "back" })),
    addTweetFront: (tweet) => set((state) => ({ tweets: [tweet, ...state.tweets], lastTweetAddMethod: "front" })),
    updateTweet: (tweet) => set((state) => ({ tweets: state.tweets.map((t) => (t.uid === tweet.uid ? tweet : t)), lastUpdatedUID: tweet.uid })),
    removeTweet: (tweet) => set((state) => ({ tweets: state.tweets.filter((t) => t.uid !== tweet.uid) })),
    addTweetMapInstance: (uid, instance) => set((state) => ({ tweetMapInstance: state.tweetMapInstance.set(uid, instance) })),
}));

export default UseFeedStore;