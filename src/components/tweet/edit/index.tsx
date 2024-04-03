import Appbar from './Appbar';
import UseTweetStore from '../../../stores/Tweet';
import React, { useEffect, useContext } from 'react';
import Editor from './Editor';
import UseUserStore from '../../../stores/User';
import { WebSocketContext } from '../../../websocket/websocket';
import log from 'loglevel';

// MUI
import Dialog from '@mui/material/Dialog';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import UseAppStore from '../../../stores/App';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

const EditTweet: React.FC = () => {
    const wsCtx = useContext(WebSocketContext);
    if (!wsCtx) {
        throw new Error('Context not found');
    }
    const { sendWS } = wsCtx;

    const [isContentValid, setIsContentValid] = useState<boolean>(false);

    const { isEditTweetOpen, closeEditTweet, openSnack } = UseAppStore();
    const { content, tweetUID, setContent, setIsProcessing } = UseTweetStore();
    const { username, photoURL } = UseUserStore();

    useEffect(() => {
        if (!content) return;
        setIsContentValid(JSON.parse(content)['blocks'].length > 0);
    }, [content]);

    const handleClose = () => {
        setContent("");
        closeEditTweet();
    }

    const handleSave = () => {
        setIsProcessing(true);
        sendWS<{ error: string }>({ 
            type: "tweet", 
            action: "edit",
            data: { 
                tweetUID: tweetUID,
                content: content
            }
        })
            .then((r) => {
                if (r.error !== "null") throw new Error(r.error);
                openSnack("Updated Tweet!", "success");
                handleClose();
            })
            .catch((error) => {
                log.error("Error updating tweet: ", error);
                openSnack("Failed to Save", "error");
            })
            .finally(() => {
                setIsProcessing(false);
            });
    }

    const handleDelete = () => {
        setIsProcessing(true);

    }

    return (
        <Dialog open={isEditTweetOpen} fullWidth sx={{ maxHeight: "90vh" }}>
            <ClickAwayListener onClickAway={handleClose}>
                <Paper>
                    {/* Header */}
                    <Appbar isContentValid={isContentValid} handleClose={handleClose} handleSave={handleSave} handleDelete={handleDelete} />

                    {/* Editor */}
                    <Stack direction='row' sx={{ m: 1, p: 1, minHeight: "40vh" }}>
                        <Avatar sx={{ width: 32, height: 32, m: 1, mr: 2}}>
                            <img src={photoURL} alt={username} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> 
                        </Avatar>
                        {/* Editor */}
                        <Editor />
                    </Stack>
                </Paper>
            </ClickAwayListener>
        </Dialog>
    )
}

export default EditTweet;