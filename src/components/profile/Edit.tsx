import UseAppStore from '../../stores/App';
import { WebSocketContext } from '../../websocket/websocket';
import { useContext } from 'react';
import UseProfileStore from '../../stores/Profile';
import Editor from './Editor';

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

const Edit: React.FC = () => {

    const wsCtx = useContext(WebSocketContext);
    if (!wsCtx) {
        throw new Error('Context not found');
    }
    const { sendMessage } = wsCtx;

    const { isEditProfileOpen, closeEditProfile } = UseAppStore();

    const { blocks } = UseProfileStore();

    const handleSave = () => {
        // sendMessage(JSON.stringify({ type: 'tweet', action: 'post', data: JSON.stringify(blocks) }));
        // closeNewTweet();
        closeEditProfile();
    }

    return (
        <Dialog open={isEditProfileOpen} fullWidth sx={{ maxHeight: "80vh" }}>
            <ClickAwayListener onClickAway={closeEditProfile}>
                <Paper>
                    {/* Header */}
                    <AppBar position="sticky" color="inherit">
                        <Toolbar sx={{ display: "flex" }}>
                            <IconButton edge="end" color="inherit" onClick={closeEditProfile}>
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="body1" sx={{ ml: 3 }}>
                                プロフィール編集
                            </Typography>
                            <Button variant="contained" sx={{ m: 1, ml: "auto", p: 2, py: 1, alignSelf: "flex-end" }} onClick={handleSave}>
                                Save
                            </Button>
                        </Toolbar>
                    </AppBar>

                    {/* Editor */}
                    <Stack>
                        <Stack direction='row' sx={{ m: 1, p: 1, minHeight: "40vh" }}>
                            <Avatar sx={{ width: 32, height: 32, m: 1}}>
                                <PersonIcon />
                            </Avatar>
                            <Editor />
                        </Stack>
                    </Stack>
                </Paper>
            </ClickAwayListener>
        </Dialog>   
    );
}

export default Edit;