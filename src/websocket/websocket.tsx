import { createContext, ReactNode, useState, useRef, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import log from 'loglevel';
import Ajv from 'ajv';

import { PushResponse } from './model';

interface WebSocketContextType {
    sendWS: (message: string, expectedResponse: any ) => void;
}

export const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider = ({ children }: {children: ReactNode}) => {
    const WS_URL = import.meta.env.VITE_WS_URI;

    const ws = new WebSocket(WS_URL);
    ws.onopen = () => { log.info('WebSocket connection established'); };
    ws.onclose = () => { log.warn('WebSocket connection closed'); };
    
    async function sendWS(message: string, expectedResponse: any) {

        return new Promise((resolve, reject) => {
            ws.send(message);
            ws.onmessage = (event) => {
                const response = JSON.parse(event.data) as PushResponse;
                resolve(response);
            };
            ws.onerror = (event) => {
                reject(new Error('WebSocket error: ' + event))
            };
            ws.onclose = event => {
                if (!event.wasClean) {
                    reject(new Error('WebSocket closed unexpectedly : ' + event))
                }
            };
        })
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