import type { CreateClanReq } from '@funcode/shared';
import { API_URLS } from '../constants/urls.ts';


export async function createClan(req: CreateClanReq) {
    await fetch(API_URLS.CREATE_CLAN, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req)
    })
}