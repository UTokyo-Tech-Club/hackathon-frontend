import React from 'react';

// MUI
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

interface AppbarProps {
    handleClose : () => void;
    handleSave : () => void;
}

const Appbar: React.FC<AppbarProps> = ({ handleClose, handleSave }) => {
    
    return (
        <AppBar position="sticky" color="inherit">
            <Toolbar sx={{ display: "flex" }}>
                <IconButton edge="end" color="inherit" onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
                <Typography variant="body1" sx={{ ml: 3 }}>
                    プロフィール編集
                </Typography>
                <Button variant="contained" sx={{ m: 1, ml: "auto", p: 2, py: 1, alignSelf: "flex-end" }} onClick={handleSave}>
                    Save
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default Appbar;