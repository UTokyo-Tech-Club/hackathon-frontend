interface TweetData {
    // time: number;
    blocks: {
        type: string;
        data: {
            text: string;
        };
    }[];
}

interface TweetInterface {
    uid: string;
    createdBy: string;
    content: TweetData;
    createdAt: Date;
    updatedAt: Date;
    numbLikes: number;
    liked: boolean;
    bookmarked: boolean;
}

export type { TweetData, TweetInterface }