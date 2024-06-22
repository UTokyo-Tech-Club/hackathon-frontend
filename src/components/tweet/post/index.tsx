import UseAppStore from '../../../stores/App';
import Editor from './Editor';
import { WebSocketContext } from '../../../websocket/websocket';
import { useContext, useEffect, useState } from 'react';
import UsePostStore from '../../../stores/Post';
import log from 'loglevel';
import UseUserStore from '../../../stores/User';
import Header from './Header';
import Footer from './Footer';
import useTweetStore from '../../../stores/Tweet';

// MUI
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import Paper from '@mui/material/Paper';
import UploadWidget from '../../uploadWidget';

const Post: React.FC = () => {
    const wsCtx = useContext(WebSocketContext);
    if (!wsCtx) {
        throw new Error('Context not found');
    }
    const { sendWS } = wsCtx;

    const [isContentValid, setIsContentValid] = useState<boolean>(false);

    const { isNewTweetOpen, closeNewTweet, openSnack } = UseAppStore();

    const { username, photoURL } = UseUserStore();

    const { content, linkUid, setIsProcessing } = UsePostStore();

    const { imageUrl, setImageUrl } = useTweetStore();


    useEffect(() => {
        if (!content) return;
        setIsContentValid(JSON.parse(content)['blocks'].length > 0);
    }, [content]);

    useEffect(() => {
        setImageUrl('');
    }, []);

    const handlePublish = () => {
        setIsProcessing(true);

        sendWS<{ error: string }>({
            type: "tweet",
            action: "post",
            data: {
                content: content,
                link: linkUid,
                imageUrl: imageUrl,
            }
        })
            .then((r) => {
                if (r.error !== "null") throw new Error(r.error);
                openSnack("新規投稿を作成しました!", "success");
                handleClose();
            })
            .catch((error) => {
                log.error("Error sending tweet to backend: ", error);
                openSnack("エラー", "error");
                return;
            })
            .finally(() => {
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
                    <Header handleClose={handleClose} />

                    {/* Post Tweet */}
                    <Stack>
                        <UploadWidget />
                        <Stack direction='row' sx={{ m: 1, p: 1, minHeight: "40vh" }}>
                            <Avatar sx={{ width: 32, height: 32, m: 1, mr: 2 }}>
                                <img src={photoURL} alt={username} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            </Avatar>
                            {/* Editor */}
                            <Editor />
                        </Stack>

                        {/* Footer */}
                        <Divider variant="middle" />
                        <Footer isContentValid={isContentValid} handlePublish={handlePublish} />

                    </Stack>
                </Paper>
            </ClickAwayListener>
        </Dialog>
    );
}

export default Post;