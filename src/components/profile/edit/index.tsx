import UseAppStore from '../../../stores/App';
import { WebSocketContext } from '../../../websocket/websocket';
import { useContext, useEffect } from 'react';
import UseProfileStore from '../../../stores/Profile';
import { authApp } from '../../../firebase/config';
import { updateProfile } from "firebase/auth";
import log from 'loglevel';
import Appbar from './Appbar';
import { PushResponse, PushSchema } from '../../../websocket/model';
import Picture from './Picture';
import Content from './Content';
import { ProfileContentResponse, ProfileContentSchema } from '../../../websocket/model';

// MUI
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import Paper from '@mui/material/Paper';
import UseUserStore from '../../../stores/User';

const Edit: React.FC = () => {
    // WebSocket Context
    const wsCtx = useContext(WebSocketContext);
    if (!wsCtx) {
        throw new Error('Context not found');
    }
    const { sendWS } = wsCtx;

    const { isEditProfileOpen, closeEditProfile, openSnack } = UseAppStore();
    const { content, setContent, setIsProcessing, isProcessing } = UseProfileStore();
    const { photoURL, username } = UseUserStore();

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
                        profileContent: content
                    })}),
                    PushSchema) as PushResponse;
            if (result.error !== "null") throw new Error(result.error);
        } catch (error) {
            log.error("Error sending edit message: ", error)
        }
    }

    const handleClose = () => {
        setContent('');
        closeEditProfile();
    }

    const handleSave = async () => {
        setIsProcessing(true);
        Promise.all([updateFirebaseProfile(), updateBackendProfile()])
            .then(() => {
                handleClose();
                openSnack("Profile Updated!", "success");
            })
            .catch((error) => {
                openSnack("Please Retry...", "error");
                log.error("Error updating profile: ", error)
            })
            .finally(() => {
                setIsProcessing(false);
            });
    }

    useEffect(() => {
        if (!isEditProfileOpen || content) return;

        setIsProcessing(true);
        sendWS<ProfileContentResponse>(
            JSON.stringify({ 
                type: "user", 
                action: "get_profile_content"}),
                ProfileContentSchema)
            .then((result) => {
                if (result.error !== "null") throw new Error(result.error);
                setContent(result.content)
            })
            .catch((error) => {
                log.error("Error getting profile content: ", error);
                openSnack("Error Getting Profile", "error");
            })
            .finally(() => {
                setIsProcessing(false);
            });

    }, [isEditProfileOpen]);

    return (
        <Dialog open={isEditProfileOpen && Boolean(content) && !isProcessing} fullWidth sx={{ maxHeight: "90vh" }}>
            <ClickAwayListener onClickAway={handleClose}>
                <Paper>
                    {/* Header */}
                    <Appbar handleClose={handleClose} handleSave={handleSave}/>

                    <Stack>
                        {/* Profile Picture */}
                        <Picture />

                        {/* Content */}
                        <Content />

                    </Stack>
                </Paper>
            </ClickAwayListener>
        </Dialog>
    );
}

export default Edit;