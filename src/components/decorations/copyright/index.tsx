import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import './index.css';

const Copyright = () => {
    return (
        <div className='copyright-sticky'>
            <Typography variant="body2" color="text.secondary" align="right" sx={{ mr: "10px" }}>
                {'© '}
                {new Date().getFullYear()}
                {' '}
                <Link color="inherit" href="https://github.com/theoj246">
                    Theo Jang
                </Link>
            </Typography>
        </div>
    );
}

export default Copyright;