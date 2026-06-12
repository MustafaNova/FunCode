import type { CreateClanReq, CreateClanRes, ErrorResponse, GetMyClanRes } from '@funcode/shared';
import { API_URLS } from '../constants/urls.ts';


export async function createClan(req: CreateClanReq) {
    const res = await fetch(API_URLS.CREATE_CLAN, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req)
    })

    if (!res.ok) {
        const err: ErrorResponse = await res.json()
        throw new Error(err.message)
    }

    return await res.json() as CreateClanRes
}

export async function getMyClan() {
    const res = await fetch(API_URLS.GET_MY_CLAN, {
        method: 'GET',
        credentials: 'include'
    });

    if (!res.ok) {
        return null;
    }
    const body: GetMyClanRes = await res.json();
    return body;
}