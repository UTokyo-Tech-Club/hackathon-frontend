interface TweetInterface {
    uid: string;
    ownerUID: string;
    ownerUsername: string;
    ownerPhotoURL: string;
    imageUrl: string;

    numLikes?: number;
    numComments?: number;
    numLinks?: number;
    numViews?: number;

    createdAt?: Date;
    updatedAt?: Date;

    content: string;
    links?: string[];
    linksBack?: string[];
    linksFront?: string[];

    comments?: string[];
    commentingUserUsernames?: string[];
    commentingUserIconUrls?: string[];
}

export type { TweetInterface }