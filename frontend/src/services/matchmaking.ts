import { io } from 'socket.io-client';
import { API_URLS, SERVER_URL } from '../constants/urls.ts';
import { createMatchMakingPayload } from '../utils/matchmaking.ts';

export async function matchmakingUnranked1v1() {
    const socket = io(SERVER_URL, { withCredentials: true });
    await fetch(API_URLS.MATCHMAKING, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(createMatchMakingPayload('unranked', 1))
    })
    return socket;
}
