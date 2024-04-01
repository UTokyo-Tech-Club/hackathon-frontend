import { useEffect, useRef, useState, useContext } from "react";
import UseFeedStore from "../../stores/Feed";
import { TweetInterface } from "../../interfaces/Tweet";
import Tweet from "../tweet";
import CircularProgress from '@mui/material/CircularProgress';
import { WebSocketContext } from '../../websocket/websocket';
import log from 'loglevel';

// MUI
import Container from '@mui/material/Container';

const Feed = () => {
    const wsCtx = useContext(WebSocketContext);
    if (!wsCtx) {
        throw new Error('Context not found');
    }
    const { sendWS } = wsCtx;

    const loaderRef = useRef(null);

    const { tweets, addTweet } = UseFeedStore();

    const [isLocked, setIsLocked] = useState(false);

    const fetchMoreData = () => {
        if (isLocked) return;

        setIsLocked(true);
        sendWS<{ 
            error: string, 
            data: { 
                uid: string, 
                ownerUID: string, 
                content: object, 
                createdAt: string, 
                updatedAt: string 
            }}>({ 
                type: "tweet", 
                action: "get_newest", 
                data: {
                    index: tweets.length
                }
            })
            .then((r) => {
                if (r.error !== "null") throw new Error(r.error);

                if (!r.data.content) return;

                const tweetData: TweetInterface = {
                    uid: r.data.uid,
                    ownerUID: r.data.ownerUID,
                    ownerUsername: "User A",
                    ownerPhotoURL: "https://www.w3schools.com/howto/img_avatar.png",
                    isFollowingOwner: false,
                    isBookmarked: false,
                    isLiked: false,
                    isViewed: false,
                    numLikes: 0,
                    numComments: 0,
                    numLinks: 0,
                    numViews: 0,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    content: JSON.stringify(r.data.content),
                    links: [],
                }
        
                addTweet(tweetData);
            })
            .catch((error) => {
                log.error("Error getting tweet: ", error);
            })
            .finally(() => {
                setIsLocked(false);
            });
    };


    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    fetchMoreData();
                }
            },
            { threshold: 0.5 }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [fetchMoreData]);

    return (
        <Container>
            {tweets.map((item, index) => (
                <Tweet key={index} tweet={item} />
            ))}

            <CircularProgress ref={loaderRef} sx={{ alignSelf: "center" }} />
        </Container>
    );
}

export default Feed;