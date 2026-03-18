import { io } from 'socket.io-client';
import { API_URLS, SERVER_URL } from '../constants/urls.ts';

export async function matchmakingCodeDuel() {
    const socket = io(SERVER_URL, { withCredentials: true });
    await fetch(API_URLS.MATCHMAKING, { method: 'POST', credentials: 'include'})
    return socket;
}
