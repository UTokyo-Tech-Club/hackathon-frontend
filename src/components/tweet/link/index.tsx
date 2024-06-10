import { TweetInterface } from "../../../interfaces/Tweet";
import Content from './Content';

// MUI
import Typography from '@mui/material/Typography';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

const Link: React.FC<{ prev: boolean, tweet?: TweetInterface }> = ({ prev, tweet }) => {
    if (!tweet) return <></>;
    return (
        <Box
            sx={{
                width: '100%',
                display: 'grid',
                gridTemplateAreas: `"linkDirection linkText"
                                    ". divider"
                                    "profileIcon profileName"
                                    ". content"`,
                gridTemplateColumns: '50px auto',
                gridTemplateRows: '40px auto',
                alignItems: 'center', // Ensure all items are vertically centered
            }}
        >
            <Box sx={{ gridArea: 'linkDirection', display: 'flex', justifyContent: 'center' }}>
                {prev ? <KeyboardDoubleArrowUpIcon /> : <KeyboardDoubleArrowDownIcon />}
            </Box>
            <Box sx={{ gridArea: 'linkText', display: 'flex', justifyContent: 'flex-start', my: 1 }}>
                <Typography variant="body2">Link Text ...</Typography>
            </Box>
            <Box sx={{ gridArea: 'divider' }}>
                <Divider variant="fullWidth" />
            </Box>
            <Box sx={{ gridArea: 'profileIcon', display: 'flex', justifyContent: 'center' }}>
                <Avatar sx={{ width: 32, height: 32, mt: 1 }} src={tweet?.ownerPhotoURL} alt={tweet?.ownerUsername} />
            </Box>
            <Box sx={{ gridArea: 'profileName', display: 'flex', justifyContent: 'flex-start' }}>
                <Typography variant="body2">{tweet?.ownerUsername}</Typography>
            </Box>
            <Box sx={{ gridArea: 'content', display: 'flex', justifyContent: 'flex-start', mb: 1 }}>
                {tweet && (
                    <Box>
                        <Content tweetUID={tweet?.uid + "link"} data={tweet?.content} />
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default Link;