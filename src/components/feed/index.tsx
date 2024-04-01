import { useEffect, useRef } from "react";
import UseFeedStore from "../../stores/Feed";
import { TweetInterface } from "../../interfaces/Tweet";
import Tweet from "../tweet";
import CircularProgress from '@mui/material/CircularProgress';

// MUI
import Container from '@mui/material/Container';

const Feed = () => {
    const loaderRef = useRef(null);

    const { tweets, addTweet } = UseFeedStore();

    const fetchMoreData = () => {

        const tweetData: TweetInterface = {
            uid: "1",
            ownerUID: "1",
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
            content: "Some content...",
            links: [],
        }

        addTweet(tweetData);
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