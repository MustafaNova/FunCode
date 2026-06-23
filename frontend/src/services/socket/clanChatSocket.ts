import { io, type Socket } from 'socket.io-client';
import { me } from '../auth.ts';


let chatSocket: Socket | null = null;
const SOCKET_URL = `${import.meta.env.VITE_SERVER_URL}/chat`;

export async function getSocket(): Promise<Socket> {
    if (!chatSocket) {
        const meRes = await me();
        chatSocket = io(SOCKET_URL, {
            auth: {
                token: meRes.token
            }
        });
    }
    return chatSocket;
}

export async function socketDisconnect() {
    chatSocket?.disconnect();
    chatSocket = null;
}