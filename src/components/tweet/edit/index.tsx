import Appbar from './Appbar';
import UseTweetStore from '../../../stores/Tweet';
import React, { useEffect } from 'react';
import Editor from './Editor';
import UseUserStore from '../../../stores/User';

// MUI
import Dialog from '@mui/material/Dialog';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import UseAppStore from '../../../stores/App';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

const EditTweet: React.FC = () => {

    const [isContentValid, setIsContentValid] = useState<boolean>(false);

    const { isEditTweetOpen, closeEditTweet } = UseAppStore();
    const { content, setContent, setIsProcessing } = UseTweetStore();
    const { username, photoURL } = UseUserStore();

    // useEffect(() => {
    //     if (!isEditTweetOpen) return;
    //     setTweet(tweets.find((t) => t.uid === tweetUID));
    //     console.log(tweetUID)
    //     console.log(tweets)
    //     console.log(tweets.find((t) => t.uid === tweetUID))
    // }, [isEditTweetOpen])
    

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