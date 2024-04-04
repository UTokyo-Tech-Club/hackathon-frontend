
import log from 'loglevel';
import UseUserStore from "../../../stores/User";
import React, { useState } from "react";
import { useContext } from "react";
import { WebSocketContext } from '../../../websocket/websocket';
import UseFeedStore from '../../../stores/Feed';
import UseAppStore from '../../../stores/App';

// MUI
import LoadingButton from '@mui/lab/LoadingButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


const LikeButton: React.FC<{ tweetUID: string }> = ({ tweetUID }) => {
    const wsCtx = useContext(WebSocketContext);
    if (!wsCtx) {
        throw new Error('Context not found');
    }
    const { sendWS } = wsCtx;

    const [isProcessing, setIsProcessing] = useState(false);
    const { addLikedTweet, removeLikedTweet, likedTweets, isSignedIn } = UseUserStore();
    const { openSnack } = UseAppStore();
    const { tweets } = UseFeedStore();
    const tweet = tweets.find((tweet) => tweet.uid === tweetUID);

    const handleLike = () => {
        if (!isSignedIn) {
            openSnack("ログインしてください", "warning");
            return;
        }

        if (likedTweets.includes(tweetUID)) {
            handleUnlike();
            return;
        }

        setIsProcessing(true);
        sendWS<{ error: string }>({ 
            type: "user", 
            action: "like",
            data: { 
                tweeToLikeUID: tweetUID
            }
        })
            .then((r) => {
                if (r.error !== "null") throw new Error(r.error);
                addLikedTweet(tweetUID);
            })
            .catch((error) => {
                log.error("Error liking tweet: ", error);
            })
            .finally(() => {
                setIsProcessing(false);
            });
    }

    const handleUnlike = () => {
        if (!isSignedIn) {
            openSnack("ログインしてください", "warning");
            return;
        }
        
        setIsProcessing(true);
        sendWS<{ error: string }>({ 
            type: "user", 
            action: "unlike",
            data: { 
                tweeToUnlikeUID: tweetUID
            }
        })
            .then((r) => {
                if (r.error !== "null") throw new Error(r.error);
                removeLikedTweet(tweetUID);
            })
            .catch((error) => {
                log.error("Error unliking tweet: ", error);
            })
            .finally(() => {
                setIsProcessing(false);
            });
    }

    return (
        <LoadingButton  loading={isProcessing} onClick={handleLike}>
            <Stack>
                {likedTweets.includes(tweetUID) ? <FavoriteIcon />: <FavoriteBorderIcon />} 
                <Typography variant="body2">{tweet?.numLikes}</Typography>
            </Stack>
        </LoadingButton>
    );
}

export default LikeButton;