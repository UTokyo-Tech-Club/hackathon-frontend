import UseUserStore from '../../../stores/User';

// MUI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import UploadIcon from '@mui/icons-material/Upload';

const Picture: React.FC = () => {

    const { photoURL, username } = UseUserStore();

    return (
        <Container sx={{ display: "flex", mb: 2 }} >
            <Avatar sx={{ width: 64, height: 64, ml: 3, mt: 3 }}>
                <img src={photoURL} alt={username} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </Avatar>
            <Container sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                <Button variant="outlined" sx={{ width: 2, px: 5 }}>
                    <UploadIcon />
                </Button>
            </Container>
        </Container>
    );
}

export default Picture;