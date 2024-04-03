
import log from 'loglevel';
import UseProfileStore from "../../../stores/Profile";
import UseUserStore from "../../../stores/User";
import React from "react";
import { useContext } from "react";
import { WebSocketContext } from '../../../websocket/websocket';
import UseAppStore from '../../../stores/App';

// MUI
import LoadingButton from '@mui/lab/LoadingButton';
import TouchRipple from '@mui/material/ButtonBase/TouchRipple';

const FollowButton: React.FC<{ userToFollowUID: string }> = ({ userToFollowUID }) => {

    const wsCtx = useContext(WebSocketContext);
    if (!wsCtx) {
        throw new Error('Context not found');
    }
    const { sendWS } = wsCtx;

    const { isProcessingFollow, setIsProcessingFollow } = UseProfileStore();
    const { addFollowingUser, removeFollowingUser, followingUsers, isSignedIn } = UseUserStore();
    const { openSnack } = UseAppStore();

    const isFollowing = followingUsers.includes(userToFollowUID);

    const handleFollow = () => {
        if (!isSignedIn) {
            openSnack("ログインしてください", "warning");
            return;
        }

        setIsProcessingFollow(true);
        sendWS<{ error: string }>({ 
            type: "user", 
            action: "follow",
            data: { 
                userToFollowUID: userToFollowUID
            }
        })
            .then((r) => {
                if (r.error !== "null") throw new Error(r.error);
                addFollowingUser(userToFollowUID);
            })
            .catch((error) => {
                log.error("Error following user: ", error);
            })
            .finally(() => {
                setIsProcessingFollow(false);
            });
    }

    const handleUnfollow = () => {
        if (!isSignedIn) {
            openSnack("ログインしてください", "warning");
            return;
        }
        
        setIsProcessingFollow(true);
        sendWS<{ error: string }>({ 
            type: "user", 
            action: "unfollow",
            data: { 
                userToUnfollowUID: userToFollowUID
            }
        })
            .then((r) => {
                if (r.error !== "null") throw new Error(r.error);
                removeFollowingUser(userToFollowUID);
            })
            .catch((error) => {
                log.error("Error unfollowing user: ", error);
            })
            .finally(() => {
                setIsProcessingFollow(false);
            });
    }

    return (
        <>
        {isFollowing ? 
            <LoadingButton loading={isProcessingFollow} variant="outlined" onClick={handleUnfollow}>
                Unfollow
                <TouchRipple center/>
            </LoadingButton>
            :
            <LoadingButton loading={isProcessingFollow} variant="contained" onClick={handleFollow}>
                Follow
                <TouchRipple center/>
            </LoadingButton>
        }
        </>
    );
}

export default FollowButton;