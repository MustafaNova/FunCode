import { API_URLS } from '../constants/urls.ts';
import { createMatchMakingPayload } from '../utils/payloadBuilder.ts';
import { getSocket } from './socket.ts';

export async function matchmakingUnranked1v1() {
    const socket = await getSocket()
    await fetch(API_URLS.JOIN_MATCHMAKING, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: createMatchMakingPayload('unranked', 1)
    })
    return socket;
}

export async function leaveUnranked1v1() {
    await fetch(API_URLS.LEAVE_MATCHMAKING, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: createMatchMakingPayload('unranked', 1)
    })
}
