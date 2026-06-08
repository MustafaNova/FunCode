import type { CreateClanReq, CreateClanRes, ErrorResponse } from '@funcode/shared';
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