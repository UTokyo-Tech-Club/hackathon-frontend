import { TweetInterface } from "../../interfaces/Tweet";

export const getLinkedTweets = async (sendWS: <T>(message: { [key: string]: any }) => Promise<T>, links: string[]) => {
    const tweets: TweetInterface[] = [];
    try {
        const responses = await Promise.all(links.map((link) =>
            sendWS<{
                error: string,
                data: {
                    uid: string,
                    ownerUID: string,
                    ownerUsername: string,
                    ownerPhotoURL: string,
                    content: object,
                    linksBack: string[],
                    linksFront: string[],
                    createdAt: string,
                    updatedAt: string,

                    numLikes: number,
                    numComments: number,
                    numLinks: number,
                    numViews: number,
                }
            }>({
                type: "tweet",
                action: "get_single",
                data: {
                    uid: link
                }
            })
        ));

        responses.forEach(response => {
            if (response.error == "null") {
                tweets.push({
                    uid: response.data.uid,
                    ownerUID: response.data.ownerUID,
                    ownerUsername: response.data.ownerUsername,
                    ownerPhotoURL: response.data.ownerPhotoURL,
                    content: JSON.stringify(response.data.content),
                    createdAt: new Date(response.data.createdAt),
                    updatedAt: new Date(response.data.updatedAt),
                    numLikes: response.data.numLikes,
                    numComments: response.data.numComments,
                    numLinks: response.data.numLinks,
                    numViews: response.data.numViews,
                    linksBack: response.data.linksBack,
                    linksFront: response.data.linksFront,
                });
            }
        });
    } catch (error) {
        console.error("Error fetching linked tweets: ", error);
    }
    tweets.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
    });
    return tweets;
};