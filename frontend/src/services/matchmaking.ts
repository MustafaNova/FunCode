import { API_URLS } from '../constants/urls.ts';
import { createMatchMakingPayload } from '../utils/payloadBuilder.ts';

export async function matchmakingUnranked1v1() {
    await fetch(API_URLS.JOIN_MATCHMAKING, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: createMatchMakingPayload('unranked', 1)
    })
}

export async function leaveUnranked1v1() {
    await fetch(API_URLS.LEAVE_MATCHMAKING, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: createMatchMakingPayload('unranked', 1)
    })
}
