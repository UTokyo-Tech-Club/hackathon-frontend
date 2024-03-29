import { createContext, ReactNode } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import log from 'loglevel';

interface WebSocketContextType {
    sendMessage: (message: string) => void;
    lastMessage: MessageEvent<any> | null;
    readyState: ReadyState;
}

export const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider = ({ children }: {children: ReactNode}) => {

    const WS_URL = import.meta.env.VITE_WS_URI;

    const { sendMessage, lastMessage, readyState } = useWebSocket(WS_URL, {
        onOpen: () => {
            log.info("WebSocket connection established.");
        },
        onMessage: (event) => {
            log.info('Server:', event.data);
        },
        onError: (event) => {
            log.error('WebSocket error:', event);
        },
        onClose: () => {
            log.warn('WebSocket connection closed.')
        }
    });

    // Values accessible from context consumers
    const value = {
        sendMessage,
        lastMessage,
        readyState,
    };

    return (
        <WebSocketContext.Provider value={value}>
            {children}
        </WebSocketContext.Provider>
    );
};