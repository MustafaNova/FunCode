import { API_URLS } from '../constants/urls.ts';

export async function sendFriendReq(inviteCode: string) {
    await fetch(API_URLS.SEND_FRIEND_REQUEST, {
        credentials: 'include',
        body: JSON.stringify({ inviteCode }),
    })
}