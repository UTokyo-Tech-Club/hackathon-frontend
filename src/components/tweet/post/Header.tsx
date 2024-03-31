
// MUI
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import React from 'react';

interface HeaderProps {
    handleClose: () => void;
}

const Header: React.FC<HeaderProps> = ({ handleClose }) => {
    return (
        <AppBar position="sticky" color="inherit">
            <Toolbar>
                <IconButton edge="end" color="inherit" onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
                <Typography variant="body1" sx={{ ml: 3 }}>
                    新規投稿
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;