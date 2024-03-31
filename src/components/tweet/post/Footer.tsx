import UsePostStore from '../../../stores/Post';

// MUI
import LoadingButton from '@mui/lab/LoadingButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Container from '@mui/material/Container';
import BottomNavigation from '@mui/material/BottomNavigation';

interface FooterProps {
    isContentValid: boolean;
    handlePublish: () => void;
}

const Footer: React.FC<FooterProps> = ({ isContentValid, handlePublish }) => {

    const { isProcessing } = UsePostStore();

    return (
        <BottomNavigation>
            <Container sx={{ display: "flex", justifyContent: "right" }}>
                <LoadingButton loading={isProcessing} disabled={!isContentValid} variant="contained" sx={{ m: 1, p: 2, py: 2.5 }} onClick={handlePublish}>
                    投稿
                    <ArrowForwardIcon />
                </LoadingButton>
            </Container>
        </BottomNavigation>
    );
}

export default Footer