interface TweetInterface {
    uid: string;
    ownerUID: string;
    ownerUsername: string;
    ownerPhotoURL: string;

    numLikes?: number;
    numComments?: number;
    numLinks?: number;
    numViews?: number;

    createdAt?: Date;
    updatedAt?: Date;

    content: string;
    links?: string[];
}

export type { TweetInterface }