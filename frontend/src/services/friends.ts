import { API_URLS } from '../constants/urls.ts';
import type { CreateFriendRequestReq } from '@funcode/shared';

export async function sendFriendReq(payload: CreateFriendRequestReq) {
    await fetch(API_URLS.SEND_FRIEND_REQUEST, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
}