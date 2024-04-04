import { useEffect, useRef, useState, useContext } from "react";
import UseFeedStore from "../../stores/Feed";
import { TweetInterface } from "../../interfaces/Tweet";
import Tweet from "../tweet";
import { WebSocketContext } from '../../websocket/websocket';
import log from 'loglevel';
import GradientCircularProgress from "../decorations/progress/Circular";

// MUI
import Container from '@mui/material/Container';

const Feed = () => {
    const wsCtx = useContext(WebSocketContext);
    if (!wsCtx) {
        throw new Error('Context not found');
    }
    const { sendWS } = wsCtx;

    const loaderRef = useRef(null);

    const { tweets, lastTweetAddMethod, addTweet } = UseFeedStore();

    const [isLocked, setIsLocked] = useState(false);

    const [isVisible, setIsVisible] = useState(true);

    const fetchMoreData = () => {
        if (isLocked) return;

        setIsLocked(true);
        sendWS<{ 
            error: string, 
            data: { 
                uid: string, 
                ownerUID: string, 
                ownerUsername: string,
                ownerPhotoURL: string,
                content: object, 
                createdAt: string, 
                updatedAt: string,

                numLikes: number,
                numComments: number,
                numLinks: number,
                numViews: number,
            }}>({ 
                type: "tweet", 
                action: "get_newest", 
                data: {
                    index: tweets.length
                }
            })
            .then((r) => {
                if (r.error !== "null" || r.data === undefined) throw new Error(r.error);

                if (!r.data.content) return;

                const tweetData: TweetInterface = {
                    uid: r.data.uid,
                    ownerUID: r.data.ownerUID,
                    ownerUsername: r.data.ownerUsername,
                    ownerPhotoURL: r.data.ownerPhotoURL,
                    numLikes: r.data.numLikes ? r.data.numLikes : 0,
                    numComments: r.data.numLikes ? r.data.numComments : 0,
                    numLinks: r.data.numLikes ? r.data.numLinks : 0,
                    numViews: r.data.numLikes ? r.data.numViews : 0,
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

    useEffect(() => {
        if (lastTweetAddMethod === "front") {
            setIsVisible(false);
            setTimeout(() => {
                setIsVisible(true);
            }, 10);
        }
    }, [tweets]);

    return (
    <>
        {isVisible && 
            <Container>
                {tweets.map((item, index) => (
                    <Tweet key={index} tweetData={item} />
                ))}
                <div ref={loaderRef}></div>
                <GradientCircularProgress />
            </Container>
        }       
    </>
        
    );
}

export default Feed;