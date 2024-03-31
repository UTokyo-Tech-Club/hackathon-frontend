import UseUserStore from '../../stores/User';
import UseAppStore from '../../stores/App';
import { signInWithGoogle } from '../../firebase/auth';

// MUI
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

const SidebarPopup = () => {

    const { isSignedIn, username, email, photoURL, signOut } = UseUserStore();
    const { isProfileSettingsOpen, profileSettingsAnchor, closeProfileSettings, openEditProfile } = UseAppStore();

    return (
        <BasePopup open={isProfileSettingsOpen} anchor={profileSettingsAnchor} placement='top-end'>
            <ClickAwayListener onClickAway={closeProfileSettings}>
                    {isSignedIn ? 
                        // Signed in
                        <Paper elevation={2}>
                            <Stack>
                                <Stack direction="row">
                                    <Avatar>
                                    <img src={photoURL} alt={username} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    </Avatar>
                                    <Stack>
                                        <Typography variant="body2">
                                            {username}
                                        </Typography>
                                        <Typography variant="body2">
                                            {email}
                                        </Typography>
                                    </Stack>
                                </Stack>
                                <Container>
                                    <Button variant="outlined" onClick={openEditProfile}>
                                        Edit
                                    </Button>
                                    <Button variant="outlined" onClick={signOut}>
                                        Sign Out
                                    </Button>
                                </Container>
                            </Stack>
                        </Paper>
                        :
                        // Signed out
                        <Paper elevation={2}>
                            <Button onClick={signInWithGoogle}>
                                Sign In
                            </Button>
                        </Paper>
                    }
            </ClickAwayListener>
        </BasePopup>
    );
}

export default SidebarPopup;