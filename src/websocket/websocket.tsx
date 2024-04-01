// import { createContext, ReactNode } from 'react';
// import log from 'loglevel';
// import { JSONSchemaType } from "ajv";
// import { Validate } from './model';


// interface WebSocketContextType {
//     sendWS: <T>(message: string, schema: JSONSchemaType<any>) => Promise<T>;
// }

// export const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

// export const WebSocketProvider = ({ children }: {children: ReactNode}) => {
//     const WS_URL = import.meta.env.VITE_WS_URI;

//     const ws = new WebSocket(WS_URL);
//     ws.onopen = () => { log.info('WebSocket connection established'); };
//     ws.onclose = () => { log.warn('WebSocket connection closed'); };
    
//     async function sendWS<T>(message: string, schema: JSONSchemaType<any>): Promise<T> {
//         return new Promise((resolve, reject) => {
//             ws.send(message);
//             ws.onmessage = (event) => {
//                 try {
//                     const response = JSON.parse(event.data);
//                     if (Validate(schema, response)) {
//                         resolve(response as T);
//                     }
//                 } catch(error) {
//                     reject(new Error('Failed to parse response: ' + error));
//                 }
//             };
//             ws.onerror = (event) => {
//                 reject(new Error('WebSocket error: ' + event))
//             };
//             ws.onclose = event => {
//                 if (!event.wasClean) {
//                     reject(new Error('WebSocket closed unexpectedly : ' + event))
//                 }
//             };
//         })
//     }

//     // Values accessible from context consumers
//     const value = {
//         sendWS,
//     };

//     return (
//         <WebSocketContext.Provider value={value}>
//             {children}
//         </WebSocketContext.Provider>
//     );
// };

import { createContext, ReactNode } from 'react';
import log from 'loglevel';
import useWebSocket from 'react-use-websocket';

interface WebSocketContextType {
    sendWS: <T>(message: object) => Promise<T>;
}

export const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);


export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
    const WS_URL = import.meta.env.VITE_WS_URI;

    // Custom hook to send and receive WebSocket messages
    const { sendJsonMessage, getWebSocket } = useWebSocket(WS_URL, {
        onOpen: () => log.info('WebSocket connection established'),
        onClose: () => log.warn('WebSocket connection closed'),
        // shouldReconnect: (closeEvent) => true, // Automatically reconnect on close
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

            // ws.addEventListener('close', (event) => {
            //     if (!event.wasClean) {
            //         reject(new Error('WebSocket closed unexpectedly: ' + event));
            //     }
            // });

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