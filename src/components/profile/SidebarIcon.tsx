import UseUserStore from '../../stores/User';
import UseAppStore from '../../stores/App';
import GradientCircularProgress from '../decorations/progress/Circular';

// MUI
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Zoom from '@mui/material/Zoom';
import PersonIcon from '@mui/icons-material/Person';


const SidebarIcon = () => {

    const { username, photoURL, isLoadingProfile } = UseUserStore();
    const { toggleProfileSettings, setProfileSettingsAnchor } = UseAppStore();

    const handleProfileSettings = (event: React.MouseEvent<HTMLElement>) => {
        setProfileSettingsAnchor(event.currentTarget)
        toggleProfileSettings();
    }
    
    return (
        <Tooltip title={username} arrow TransitionComponent={Zoom}> 
            <IconButton onClick={handleProfileSettings}>
                    <Avatar>
                        {photoURL ? 
                            <img 
                                src={photoURL} 
                                alt={username} 
                                style={{ width: "100%", height: "100%", objectFit: "cover" }} /> 
                            : 
                            isLoadingProfile ? <GradientCircularProgress /> : <PersonIcon />
                        }
                    </Avatar>
            </IconButton>
        </Tooltip>
    );
}

export default SidebarIcon;