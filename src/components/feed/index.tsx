import React, { useState, useEffect, useRef } from "react";
import UseFeedStore from "../../stores/Feed";
import TweetInterface from "../../interfaces/Tweet";
import log from 'loglevel';
import Tweet from "../tweet";

// MUI
import Container from '@mui/material/Container';

const Feed = () => {
    const loaderRef = useRef(null);

    const { tweets, addTweet } = UseFeedStore();

    const newTweet: TweetInterface = {
        uid: '2',
        content: 'This is a new tweet!',
        createdAt: new Date(),
        updatedAt: new Date(),
        numbLikes: 0,
        liked: false,
        bookmarked: false,
    };

    const fetchMoreData = () => {
        addTweet(newTweet);
        log.info(tweets.length)
        // Fetch next set of data and update state
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    fetchMoreData();
                }
            },
            { threshold: 1.0 }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, []);

    return (
        <Container>
            {tweets.map((item, index) => (
                <Tweet key={index} tweet={item} />
            ))}
            <div ref={loaderRef}>Loading more...</div>
        </Container>
    );
}

export default Feed;