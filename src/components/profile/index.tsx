import Edit from './edit';
import SidebarIcon from './SidebarIcon';
import SidebarPopup from './SidebarPopup';

// MUI
import Container from '@mui/material/Container';

const Profile = () => {

    return (
        <>
            {/* Profile icon displayed on the left bottom corner */}
            <Container sx={{ alignSelf: "flex-end" }}>
                <SidebarIcon />
            </Container>
            
            {/* click sidebar icon */}
            <SidebarPopup />

            {/* click sidebar icon -> click edit button */}
            <Edit />
        </>
    );
}

export default Profile;