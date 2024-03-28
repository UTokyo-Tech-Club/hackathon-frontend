import UseUserStore from '../../stores/User';
import UseAppStore from '../../stores/App';
import { signInWithGoogle } from '../../firebase/auth';

// MUI
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

const Profile = () => {

    const { isSignedIn, username, email, signOut } = UseUserStore();
    const { isProfileSettingsOpen, profileSettingsAnchor, toggleProfileSettings, setProfileSettingsAnchor } = UseAppStore();
    
    const handleProfileSettings = (event: React.MouseEvent<HTMLElement>) => {
        setProfileSettingsAnchor(event.currentTarget)
        toggleProfileSettings();
    }

    return (
        <Container>
            {/* Profile Icon */}
            <Tooltip title={email}> 
                <IconButton onClick={handleProfileSettings}>
                    <Avatar>
                        <PersonIcon />
                    </Avatar>
                </IconButton>
            </Tooltip>

            <BasePopup open={isProfileSettingsOpen} anchor={profileSettingsAnchor} placement='right-start'>
                    {isSignedIn ? 
                        // Signed in
                        <Paper elevation={2}>
                            <h1>{username}</h1>
                            <p>{email}</p>
                            <Button onClick={signOut}>
                                Sign Out
                            </Button>
                        </Paper>
                        :
                        // Signed out
                        <Paper elevation={2}>
                            <Button onClick={signInWithGoogle}>
                                Sign In
                            </Button>
                        </Paper>
                    }
                
            </BasePopup>

        </Container>
    );
}

export default Profile;