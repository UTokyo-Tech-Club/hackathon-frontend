export default interface TweetInterface {
    uid: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    numbLikes: number;
    liked: boolean;
    bookmarked: boolean;
}