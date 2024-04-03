import { create } from 'zustand';
import { TweetInterface } from '../interfaces/Tweet';

type FeedStore = {
    tweets: TweetInterface[];

    addTweet: (tweet: TweetInterface) => void;
    addTweetFront: (tweet: TweetInterface) => void;
    updateTweet: (tweet: TweetInterface) => void;
    removeTweet: (tweet: TweetInterface) => void;
}

const UseFeedStore = create<FeedStore>((set) => ({
    tweets: [],

    addTweet: (tweet) => set((state) => ({ tweets: [...state.tweets, tweet] })),
    addTweetFront: (tweet) => set((state) => ({ tweets: [tweet, ...state.tweets] })),
    updateTweet: (tweet) => set((state) => ({ tweets: state.tweets.map((t) => (t.uid === tweet.uid ? tweet : t)) })),
    removeTweet: (tweet) => set((state) => ({ tweets: state.tweets.filter((t) => t.uid !== tweet.uid) })),
}));

export default UseFeedStore;