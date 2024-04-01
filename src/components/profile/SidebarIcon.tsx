import UseUserStore from '../../stores/User';
import UseAppStore from '../../stores/App';
import GradientCircularProgress from '../decorations/progress/Circular';

// MUI
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Zoom from '@mui/material/Zoom';

const SidebarIcon = () => {

    const { username, photoURL } = UseUserStore();
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
                            <GradientCircularProgress />
                        }
                    </Avatar>
            </IconButton>
        </Tooltip>
    );
}

export default SidebarIcon;