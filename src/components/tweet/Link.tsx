import { TweetInterface } from "../../interfaces/Tweet";

// MUI
import Typography from '@mui/material/Typography';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import Box from '@mui/material/Box';


const Link: React.FC<{ prev: boolean, tweet?: TweetInterface }> = ({ prev }) => {
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
            }}
            >
            <Box sx={{ gridArea: 'linkDirection', display: 'flex', justifyContent: 'center', my: 0.2}}>
                {prev ? <KeyboardDoubleArrowUpIcon /> : <KeyboardDoubleArrowDownIcon />}
            </Box>
            <Box sx={{ gridArea: 'linkText', display: 'flex', justifyContent: 'flex-start', }}>
                <Typography alignSelf="center" variant="body2">Link Text ...</Typography>
            </Box>
            <Box sx={{ gridArea: 'divider'}}>
                <Divider variant="fullWidth" />
            </Box>
            <Box sx={{ gridArea: 'profileIcon', display: 'flex', justifyContent: 'center', my: 0.5}}>
                <Avatar sx={{ width: 32, height: 32}}>
                    <PersonIcon />
                </Avatar>
            </Box>
            <Box sx={{ gridArea: 'profileName', display: 'flex', justifyContent: 'flex-start'}}>
                <Typography alignSelf="center" variant="body2">User B</Typography>
            </Box>
            <Box sx={{ gridArea: 'content', display: 'flex', justifyContent: 'flex-start', mb: 1}}>
                <Typography alignSelf="center" variant="body2">Some Text ...</Typography>
            </Box>
        </Box>
    );
}

export default Link;