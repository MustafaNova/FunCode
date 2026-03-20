import { API_URLS } from '../constants/urls.ts';
import { createMatchMakingPayload } from '../utils/matchmaking.ts';
import { getSocket } from './socket.ts';

export async function matchmakingUnranked1v1() {
    const socket = getSocket()
    await fetch(API_URLS.MATCHMAKING, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(createMatchMakingPayload('unranked', 1))
    })
    return socket;
}
