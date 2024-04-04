
import log from 'loglevel';
import UseUserStore from "../../../stores/User";
import React, { useState } from "react";
import { useContext } from "react";
import { WebSocketContext } from '../../../websocket/websocket';
import UseAppStore from '../../../stores/App';

// MUI
import LoadingButton from '@mui/lab/LoadingButton';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

const BookmarkButton: React.FC<{ tweetUID: string }> = ({ tweetUID }) => {
    const wsCtx = useContext(WebSocketContext);
    if (!wsCtx) {
        throw new Error('Context not found');
    }
    const { sendWS } = wsCtx;

    const [isProcessing, setIsProcessing] = useState(false);
    const { addBookmarkedTweet, removeBookmarkedTweet, bookmarkedTweets, isSignedIn } = UseUserStore();
    const { openSnack } = UseAppStore();

    const handleBookmark = () => {
        if (!isSignedIn) {
            openSnack("ログインしてください", "warning");
            return;
        }

        if (bookmarkedTweets.includes(tweetUID)) {
            handleUnbookmark();
            return;
        }

        setIsProcessing(true);
        sendWS<{ error: string }>({ 
            type: "user", 
            action: "bookmark",
            data: { 
                tweeToBookmarkUID: tweetUID
            }
        })
            .then((r) => {
                if (r.error !== "null") throw new Error(r.error);
                addBookmarkedTweet(tweetUID);
            })
            .catch((error) => {
                log.error("Error bookmarking tweet: ", error);
            })
            .finally(() => {
                setIsProcessing(false);
            });
    }

    const handleUnbookmark = () => {
        if (!isSignedIn) {
            openSnack("ログインしてください", "warning");
            return;
        }
        
        setIsProcessing(true);
        sendWS<{ error: string }>({ 
            type: "user", 
            action: "unbookmark",
            data: { 
                tweeToUnbookmarkUID: tweetUID
            }
        })
            .then((r) => {
                if (r.error !== "null") throw new Error(r.error);
                removeBookmarkedTweet(tweetUID);
            })
            .catch((error) => {
                log.error("Error unbookmarking tweet: ", error);
            })
            .finally(() => {
                setIsProcessing(false);
            });
    }

    return (
        <LoadingButton loading={isProcessing} onClick={handleBookmark} sx={{ mt: 1 }}>
            {bookmarkedTweets.includes(tweetUID) ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </LoadingButton>
    );
}

export default BookmarkButton;