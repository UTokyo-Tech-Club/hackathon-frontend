import UseAppStore from '../../stores/App';
import { WebSocketContext } from '../../websocket/websocket';
import { useContext } from 'react';
import UseProfileStore from '../../stores/Profile';
import Editor from './Editor';
import { authApp } from '../../firebase/config';
import { updateProfile } from "firebase/auth";
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
import TextField from '@mui/material/TextField';
import UseUserStore from '../../stores/User';

const Edit: React.FC = () => {

    const wsCtx = useContext(WebSocketContext);
    if (!wsCtx) {
        throw new Error('Context not found');
    }
    const { sendMessage } = wsCtx;

    const { isEditProfileOpen, closeEditProfile } = UseAppStore();

    const { blocks } = UseProfileStore();

    const { photoURL, username, email, setUsername } = UseUserStore();

    console.log(photoURL)

    const handleSave = async () => {
        // Update firebase
        const user = authApp.currentUser;
        if (user) {
            try {
                await updateProfile(user, {
                    displayName: username,
                    photoURL: photoURL
                });
            } catch (error) {
                log.error("Firebase error updating profile", error);
            }
        }

        // Update backend
        sendMessage(JSON.stringify({ 
            type: 'user', 
            action: 'edit', 
            data: { 
                username: username, 
                photoURL: photoURL, 
                bio: JSON.stringify(blocks) 
            }}));

        closeEditProfile();
    }

    const minUsernameLength = 3;

    return (
        <Dialog open={isEditProfileOpen} fullWidth sx={{ maxHeight: "90vh" }}>
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

                    {/* Edit Profile */}
                    <Stack>
                        {/* Profile Picture */}
                        <Container sx={{ display: "flex", mb: 2 }} >
                            <Avatar sx={{ width: 64, height: 64, ml: 3, mt: 3}}>
                                <img src={photoURL} alt={username} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            </Avatar>
                            <Container sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-end"}}>
                                <Button variant="outlined" sx={{ width: 2, px: 5 }}>Upload</Button>
                            </Container>
                        </Container>

                        {/* Username */}
                        <TextField 
                            required 
                            error={username.length < minUsernameLength}
                            helperText={username.length < minUsernameLength ? "3文字以上を入力してください" : ""}
                            label="Username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            inputProps={{ maxLength: 20 }}
                            sx={{ width: "50%", m: 2 }} />

                        {/* Email */}
                        <TextField 
                            required 
                            disabled
                            label="Email" 
                            defaultValue={email}
                            sx={{ width: "50%", m: 2 }} />

                        {/* Bio */}
                        <Container sx={{ mt: 1 }}>
                            <Typography variant="body2" sx={{ ml: 1 }}>
                                Bio
                            </Typography>
                            <Divider orientation="horizontal" variant="fullWidth" sx={{ my: 0.5 }} />
                        </Container>
                        <Container sx={{ minHeight: "30vh", ml: 1, width: "95%"}}>
                            <Editor />
                        </Container>
                    </Stack>
                </Paper>
            </ClickAwayListener>
        </Dialog>   
    );
}

export default Edit;