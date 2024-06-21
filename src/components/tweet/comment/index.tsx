import Typography from "@mui/material/Typography";
import { TweetInterface } from "../../../interfaces/Tweet";
import { useContext, useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { WebSocketContext } from "../../../websocket/websocket";
import UseUserStore from "../../../stores/User";
import UseAppStore from "../../../stores/App";
import log from "loglevel";
import IconButton from "@mui/material/IconButton";
import GradientCircularProgress from "../../decorations/progress/Circular";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";

const Comments: React.FC<{ tweet: TweetInterface }> = ({ tweet }) => {
    const wsCtx = useContext(WebSocketContext);
    if (!wsCtx) {
        throw new Error('Context not found');
    }
    const { sendWS } = wsCtx;

    const { uid, username, photoURL } = UseUserStore();
    const { openSnack } = UseAppStore();

    const [isLoading, setIsLoading] = useState(false);
    const [comment, setComment] = useState("");

    const [comments, setComments] = useState<string[]>([]);
    const [commentingUserUsernames, setCommentingUserUsernames] = useState<string[]>([]);
    const [commentingUserIconUrls, setCommentingUserIconUrls] = useState<string[]>([]);

    useEffect(() => {
        if (tweet.comments) {
            setComments([...(tweet.comments || [])]);
            setCommentingUserUsernames([...(tweet.commentingUserUsernames || [])]);
            setCommentingUserIconUrls([...(tweet.commentingUserIconUrls || [])]);
        }
    }, [tweet]);

    const handlePostComment = () => {



        setIsLoading(true);
        sendWS<{ error: string }>({
            type: "comment",
            action: "post",
            data: {
                comment: comment,
                postID: tweet.uid,
                commentingUserUID: uid,
            }
        })
            .then((r) => {
                if (r.error !== "null") throw new Error(r.error);
                openSnack("コメントを追加しました!", "success");
                setComment("");
                setComments([...comments, comment]);
                setCommentingUserUsernames([...commentingUserUsernames, username]);
                setCommentingUserIconUrls([...commentingUserIconUrls, photoURL]);
            })
            .catch((error) => {
                log.error("Error sending tweet to backend: ", error);
                openSnack("エラー", "error");
                return;
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <Box onClick={(event) => event.stopPropagation()} sx={{ mx: 2, my: 2 }}>
            <Typography>コメント</Typography>

            {comments.map((comment, index) => (
                <>
                    <Box key={index} sx={{ my: 1, p: 2, backgroundColor: 'background.paper', borderRadius: 2 }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Avatar src={commentingUserIconUrls[index]} alt={commentingUserUsernames[index]} sx={{ width: 24, height: 24 }} />
                            <Typography variant="body2" sx={{ flexGrow: 1 }}>{commentingUserUsernames[index]}</Typography>
                        </Stack>
                        <Box sx={{ width: '100%', height: 8 }}></Box>
                        <Typography variant="body2">{comment}</Typography>
                    </Box>
                    <Divider sx={{ mx: 2 }} />
                </>
            ))}

            <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                <TextField
                    fullWidth
                    multiline
                    variant="outlined"
                    placeholder="コメントを入力..."
                    autoFocus={true}
                    sx={{ my: 2, mr: 2 }}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <IconButton onClick={() => handlePostComment()} disabled={isLoading || comment.length === 0} style={{ border: '1px solid #ccc', borderRadius: '7px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                {isLoading ? <GradientCircularProgress /> : <Typography variant="body2" style={{ textAlign: 'center' }}>送信</Typography>}
                                <ArrowForwardIcon style={{ marginLeft: 4 }} />
                            </IconButton>
                        ),
                    }}
                />
            </Box>
        </Box>
    );
};

export default Comments;