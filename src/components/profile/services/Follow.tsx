
import { WebSocketContextType } from "../../../websocket/websocket";
import log from 'loglevel';

const handleFollow = (wsCtx: WebSocketContextType | undefined, userToFollowUID: string) => {
    if (!wsCtx) {
        throw new Error('Context not found');
    }
    const { sendWS } = wsCtx;

    sendWS<{ error: string }>({ 
        type: "user", 
        action: "follow",
        data: { 
            userToFollowUID: userToFollowUID
        }
    })
        .then((result) => {
            if (result.error !== "null") throw new Error(result.error);
        })
        .catch((error) => {
            log.error("Error following user: ", error);
        });

}

export default handleFollow;