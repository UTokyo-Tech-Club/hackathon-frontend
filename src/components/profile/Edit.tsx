import UseAppStore from '../../stores/App';
import { WebSocketContext } from '../../websocket/websocket';
import { useContext, useEffect } from 'react';
import UseProfileStore from '../../stores/Profile';
import Editor from './Editor';
import { authApp } from '../../firebase/config';
import { updateProfile } from "firebase/auth";
import log from 'loglevel';
import { useState } from 'react';

// MUI
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import UseUserStore from '../../stores/User';
import { ProfileContentResponse, ProfileContentSchema, PushResponse, PushSchema } from '../../websocket/model';

const Edit: React.FC = () => {

    const minUsernameLength = 3;

    const wsCtx = useContext(WebSocketContext);
    if (!wsCtx) {
        throw new Error('Context not found');
    }
    const { sendWS } = wsCtx;

    const { isEditProfileOpen, closeEditProfile, openSnack } = UseAppStore();

    const { blocks, setBlocks } = UseProfileStore();

    const { photoURL, username, email, setUsername } = UseUserStore();


    const handleSave = async () => {

        const updateFirebaseProfile = async () => {
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
        };

        const updateBackendProfile = async () => {
            try {
                const result = await sendWS<PushResponse>(
                    JSON.stringify({ 
                        type: "user", 
                        action: "edit", 
                        data: JSON.stringify({ 
                            username: username, 
                            photoURL: photoURL, 
                            profileContent: JSON.stringify(blocks)
                        })}),
                        PushSchema) as PushResponse;
                if (result.error !== "null") throw new Error(result.error);
            } catch (error) {
                log.error("Error sending edit message: ", error)
            }
        }

        Promise.all([updateFirebaseProfile(), updateBackendProfile()])
            .then(() => {
                closeEditProfile();
                openSnack("Profile Updated!", "success");
            })
            .catch((error) => {
                openSnack("Please Retry...", "error");
                log.error("Error updating profile: ", error)
            });
    }



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