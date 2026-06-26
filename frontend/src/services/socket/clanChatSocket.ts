import { io, type Socket } from 'socket.io-client';
import { me } from '../auth.ts';
import { CLAN_SOCKET_EVENTS, type ClanMsg, type JoinClanChatReq, type SendClanMsgReq } from '@funcode/shared';


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


export function joinClanChatRoom(clanId: string | undefined) {
    if (!clanId) return;
    const req: JoinClanChatReq = { clanId };
    chatSocket?.emit(CLAN_SOCKET_EVENTS.JOIN_CLAN_CHAT, req);
}

export function sendClanMsg(req: SendClanMsgReq) {
    if (!req.message.trim()) return;
    chatSocket?.emit(CLAN_SOCKET_EVENTS.SEND_CLAN_MSG, req);
}

export function onNewMsg(callback: (msg: ClanMsg) => void) {
    chatSocket?.on(CLAN_SOCKET_EVENTS.NEW_CLAN_MSG, callback)
    return () => {
        chatSocket?.off(CLAN_SOCKET_EVENTS.NEW_CLAN_MSG, callback)
    }
}