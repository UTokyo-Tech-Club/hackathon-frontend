import UseUserStore from '../../stores/User';
import UseAppStore from '../../stores/App';
import { signInWithGoogle } from '../../firebase/auth';
import Edit from './Edit';

// MUI
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

const Profile = () => {

    const { isSignedIn, username, email, signOut } = UseUserStore();
    const { isProfileSettingsOpen, profileSettingsAnchor, toggleProfileSettings, closeProfileSettings, setProfileSettingsAnchor, openEditProfile } = UseAppStore();
    
    const handleProfileSettings = (event: React.MouseEvent<HTMLElement>) => {
        setProfileSettingsAnchor(event.currentTarget)
        toggleProfileSettings();
    }

    return (
        <Container sx={{ alignSelf: "flex-end" }}>
            {/* Profile Icon */}
            <Tooltip title={username}> 
                <IconButton onClick={handleProfileSettings}>
                    <Avatar>
                        <PersonIcon />
                    </Avatar>
                </IconButton>
            </Tooltip>

            {/* Profile View */}
            <BasePopup open={isProfileSettingsOpen} anchor={profileSettingsAnchor} placement='top-end'>
                <ClickAwayListener onClickAway={closeProfileSettings}>
                        {isSignedIn ? 
                            // Signed in
                            <Paper elevation={2}>
                                <Stack>
                                    <Stack direction="row">
                                        <Avatar>
                                            <PersonIcon />
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
                                        <Button onClick={openEditProfile}>
                                            Edit
                                        </Button>
                                        <Button onClick={signOut}>
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

            {/* Edit Profile */}
            <Edit />

        </Container>
    );
}

export default Profile;