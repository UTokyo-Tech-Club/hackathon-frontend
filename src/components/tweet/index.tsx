import React from 'react';
import TweetInterface from "../../interfaces/Tweet";

interface Props {
    tweet: TweetInterface;
}

const Tweet: React.FC<Props> = ({ tweet }) => {
    return (
        <div>
            <h3>{tweet.uid}</h3>
            <p>{tweet.content}</p>
        </div>
    );
}

export default Tweet;