import { API_URLS } from '../constants/urls.ts';
import type {
    AcceptFriendReqRes,
    CreateFriendRequestReq,
    ErrorResponse,
    GetFriendsRes,
    IncomingFriendRequestRes
} from '@funcode/shared';

export async function sendFriendReq(payload: CreateFriendRequestReq) {
    const res = await fetch(API_URLS.SEND_FRIEND_REQUEST, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })

    if (!res.ok) {
        throw await res.json() as ErrorResponse;
    }
}


export async function getIncomingFriendRequests() {
    const res = await fetch(API_URLS.GET_INCOMING_FRIEND_REQUESTS, {
        method: 'GET',
        credentials: 'include'
    })
    const incomingFriendRequests: IncomingFriendRequestRes[] = await res.json();
    return incomingFriendRequests;
}


export async function acceptFriendRequest(friendReqId: string) {
    const url = API_URLS.ACCEPT_FRIEND_REQUEST + `/${friendReqId}`;
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'include'
    });

    const acceptedFriend: AcceptFriendReqRes = await res.json();
    return acceptedFriend;
}

export async function declineFriendRequest(friendReqId: string) {
    const url = API_URLS.DECLINE_FRIEND_REQUEST + `/${friendReqId}`;
    await fetch(url, {
        method: 'POST',
        credentials: 'include'
    });
}

export async function getFriends() {
    const res = await fetch(API_URLS.GET_FRIENDS, {
        method: 'GET',
        credentials: 'include'
    });

    const friends: GetFriendsRes[] = await res.json();
    return friends;
}


export async function deleteFriend(friendUserId: string) {
    const url = API_URLS.DELETE_FRIEND + `/${friendUserId}`;
    await fetch(url, {
        method: 'DELETE',
        credentials: 'include',
    });
}