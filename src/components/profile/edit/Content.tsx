import UseUserStore from '../../../stores/User';
import Editor from './Editor';

// MUI
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const Content: React.FC = () => {

    // Validation
    const minUsernameLength = 3;

    const { username, email, setUsername } = UseUserStore();

    return (
        <>
            {/* Username */}
            <TextField
                required
                error={username.length < minUsernameLength}
                helperText={username.length < minUsernameLength ? "3文字以上を入力してください" : ""}
                label="ユーザー名"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                inputProps={{ maxLength: 20 }}
                sx={{ width: "50%", m: 2 }} />

            {/* Email */}
            <TextField
                required
                disabled
                label="メール"
                defaultValue={email}
                sx={{ width: "50%", m: 2 }} />

            {/* Bio */}
            <Container sx={{ mt: 1 }}>
                <Typography variant="body2" sx={{ ml: 1 }}>
                    自己紹介
                </Typography>
                <Divider orientation="horizontal" variant="fullWidth" sx={{ my: 0.5 }} />
            </Container>
            <Container sx={{ minHeight: "30vh", ml: 1, width: "95%" }}>
                <Editor />
            </Container>
        </>
    );
}

export default Content;