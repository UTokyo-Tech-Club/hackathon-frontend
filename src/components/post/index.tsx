import UseAppStore from '../../stores/App';
import Editor from './Editor';
import { WebSocketContext } from '../../websocket/websocket';
import { useContext } from 'react';
import UsePostStore from '../../stores/Post';
import log from 'loglevel';

// MUI
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Container from '@mui/material/Container';
import BottomNavigation from '@mui/material/BottomNavigation';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import Paper from '@mui/material/Paper';
import { PushResponse, PushSchema } from '../../websocket/model';

const Post: React.FC = () => {

    const wsCtx = useContext(WebSocketContext);
    if (!wsCtx) {
        throw new Error('Context not found');
    }
    const { sendWS } = wsCtx;

    const { isNewTweetOpen, closeNewTweet, openSnack } = UseAppStore();

    const { blocks } = UsePostStore();

    const handPublish = async () => {

        try {
            const result = await sendWS<PushResponse>(
                JSON.stringify({ 
                    type: "tweet", 
                    action: "post", 
                    data: JSON.stringify(blocks)}),
                    PushSchema) as PushResponse;
            if (result.error !== "null") throw new Error(result.error);
        } catch (error) {
            log.error("Error sending auth to backend: ", error);
            openSnack("Failed to Sign In", "error");
            return;
        }

        openSnack("Posted New Tweet!", "success");
        closeNewTweet();
    }

    return (
        <Dialog open={isNewTweetOpen} fullWidth sx={{ maxHeight: "80vh" }}>
            <ClickAwayListener onClickAway={closeNewTweet}>
                <Paper>
                    {/* Header */}
                    <AppBar position="sticky" color="inherit">
                        <Toolbar>
                            <IconButton edge="end" color="inherit" onClick={closeNewTweet}>
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="body1" sx={{ ml: 3 }}>
                                新規投稿
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    {/* Post Tweet */}
                    <Stack>
                        <Stack direction='row' sx={{ m: 1, p: 1, minHeight: "40vh" }}>
                            <Avatar sx={{ width: 32, height: 32, m: 1}}>
                                <PersonIcon />
                            </Avatar>
                            {/* Editor */}
                            <Editor />
                        </Stack>
                        {/* Footer */}
                        <Divider variant="middle" />
                        <BottomNavigation>
                            <Container sx={{ display: "flex", justifyContent: "right" }}>
                                <Button variant="contained" sx={{ m: 1, p: 2, py: 2.5 }} onClick={handPublish}>
                                    投稿
                                    <ArrowForwardIcon />
                                </Button>
                            </Container>
                        </BottomNavigation>
                    </Stack>
                </Paper>
            </ClickAwayListener>
        </Dialog>   
    );
}

export default Post;