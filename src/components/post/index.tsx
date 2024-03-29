import UseAppStore from '../../stores/App';
import Editor from './Editor';
import { WebSocketContext } from '../../websocket/websocket';
import { useContext } from 'react';
import UsePostStore from '../../stores/Post';

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

const Post: React.FC = () => {

    const wsCtx = useContext(WebSocketContext);
    if (!wsCtx) {
        throw new Error('Context not found');
    }
    const { sendMessage } = wsCtx;

    const { isNewTweetOpen, closeNewTweet } = UseAppStore();

    const { blocks } = UsePostStore();

    const handPublish = () => {
        sendMessage(JSON.stringify({ type: 'tweet', action: 'post', data: JSON.stringify(blocks) }));
        closeNewTweet();
    }

    return (
        <Dialog open={isNewTweetOpen} fullWidth sx={{ maxHeight: "80vh" }}>
            {/* Header */}
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton edge="end" color="inherit" onClick={closeNewTweet}>
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Editor */}
            <Stack>
                <Stack direction='row' sx={{ m: 1, p: 1, minHeight: "40vh" }}>
                    <Avatar sx={{ width: 32, height: 32, m: 1}}>
                        <PersonIcon />
                    </Avatar>
                    <Editor />
                    {/* Footer */}
                </Stack>
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
        </Dialog>   
    );
}

export default Post;