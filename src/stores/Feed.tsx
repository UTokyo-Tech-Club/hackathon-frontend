import { create } from 'zustand';
import { TweetInterface } from '../interfaces/Tweet';

type FeedStore = {
    tweets: TweetInterface[];

    addTweet: (tweet: TweetInterface) => void;
    removeTweet: (tweet: TweetInterface) => void;
}

const UseFeedStore = create<FeedStore>((set) => ({
    tweets: [],

    addTweet: (tweet) => set((state) => ({ tweets: [...state.tweets, tweet] })),
    removeTweet: (tweet) => set((state) => ({ tweets: state.tweets.filter((t) => t.uid !== tweet.uid) })),
}));

export default UseFeedStore;