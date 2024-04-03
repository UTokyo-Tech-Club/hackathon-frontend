import UseAppStore from '../../../stores/App';
import Editor from './Editor';
import { WebSocketContext } from '../../../websocket/websocket';
import { useContext, useEffect, useState } from 'react';
import UsePostStore from '../../../stores/Post';
import log from 'loglevel';
import UseUserStore from '../../../stores/User';
import Header from './Header';
import Footer from './Footer';
import UseFeedStore from '../../../stores/Feed';
import { TweetInterface } from '../../../interfaces/Tweet';

// MUI
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import Paper from '@mui/material/Paper';

const Post: React.FC = () => {
    const wsCtx = useContext(WebSocketContext);
    if (!wsCtx) {
        throw new Error('Context not found');
    }
    const { sendWS } = wsCtx;

    const [isContentValid, setIsContentValid] = useState<boolean>(false);

    const { isNewTweetOpen, closeNewTweet, openSnack } = UseAppStore();

    const { username, photoURL } = UseUserStore();

    const { content, setIsProcessing } = UsePostStore();

    const { addTweetFront } = UseFeedStore();

    useEffect(() => {
        if (!content) return;
        setIsContentValid(JSON.parse(content)['blocks'].length > 0);
    }, [content]);

    const handlePublish = () => {
        setIsProcessing(true);

        sendWS<{ error: string }>({ 
            type: "tweet", 
            action: "post", 
            data: {
                content: content
            }
        })
            .then((r) => {
                if (r.error !== "null") throw new Error(r.error);
                openSnack("Posted New Tweet!", "success");
                handleClose();
            })
            .catch((error) => {
                log.error("Error sending tweet to backend: ", error);
                openSnack("Failed to Post", "error");
                return;
            })
            .finally(() => {

                sendWS<{ 
                    error: string, 
                    data: { 
                        uid: string, 
                        ownerUID: string, 
                        ownerUsername: string,
                        ownerPhotoURL: string,
                        content: object, 
                        createdAt: string, 
                        updatedAt: string 
                    }}>({ 
                        type: "tweet", 
                        action: "get_newest", 
                        data: {
                            index: 0
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
                
                        addTweetFront(tweetData);
                    })
                    .catch((error) => {
                        log.error("Error getting tweet: ", error);
                    })

                setIsProcessing(false);
            });
    }

    const handleClose = () => {
        closeNewTweet()
    }

    return (
        <Dialog open={isNewTweetOpen} fullWidth sx={{ maxHeight: "80vh" }}>
            <ClickAwayListener onClickAway={handleClose}>
                <Paper>
                    {/* Header */}
                    <Header handleClose={handleClose}/>

                    {/* Post Tweet */}
                    <Stack>
                        <Stack direction='row' sx={{ m: 1, p: 1, minHeight: "40vh" }}>
                            <Avatar sx={{ width: 32, height: 32, m: 1, mr: 2}}>
                                <img src={photoURL} alt={username} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> 
                            </Avatar>
                            {/* Editor */}
                            <Editor />
                        </Stack>

                        {/* Footer */}
                        <Divider variant="middle" />
                        <Footer isContentValid={isContentValid} handlePublish={handlePublish}/>

                    </Stack>
                </Paper>
            </ClickAwayListener>
        </Dialog>   
    );
}

export default Post;