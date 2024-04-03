import { createContext, ReactNode } from 'react';
import log from 'loglevel';
import useWebSocket from 'react-use-websocket';
import UseAppStore from '../stores/App';

export interface WebSocketContextType {
    sendWS: <T>(message: object) => Promise<T>;
}

export const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);


export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
    const WS_URL = import.meta.env.VITE_WS_URI;

    const { openSnack } = UseAppStore();


    // Custom hook to send and receive WebSocket messages
    const { sendJsonMessage, getWebSocket } = useWebSocket(WS_URL, {
        onOpen: () => log.info('WebSocket connection established'),
        onClose: () => log.warn('WebSocket connection closed'),
        onMessage: (event) => {
            const msg = JSON.parse(event.data)

            if (msg["type"] === "user" && msg["action"] === "follow") {
                openSnack("New Follower!", "info")
            }
        },
        shouldReconnect: (closeEvent) => {
            log.warn('WebSocket closed unexpectedly:', closeEvent);
            return true; // Reconnect
        },
    });

    async function sendWS<T>(message: object): Promise<T> {
        return new Promise((resolve, reject) => {
            
            // Handles incoming JSON message
            // Resolves or rejects the promise based on the message content
            // <T> should contain the expected response types
            const handleMessage = (event: any) => {
                try {
                    const response = JSON.parse(event.data);
                    resolve(response)
                } catch (error) {
                    reject(new Error('Failed to parse response: ' + error));
                }
            };

            sendJsonMessage(message);

            const ws = getWebSocket();
            if (!ws) {
                reject(new Error('WebSocket connection not established'));
                return;
            }

            ws.addEventListener('message', (event) => handleMessage(event));

            ws.addEventListener('error', (event) => {
                reject(new Error('WebSocket error: ' + event));
            });

            return () => {
                ws.removeEventListener('message', (event) => handleMessage(event));
            };
        });
    }

    // Values accessible from context consumers
    const value = {
        sendWS,
    };

    return (
        <WebSocketContext.Provider value={value}>
            {children}
        </WebSocketContext.Provider>
    );
};