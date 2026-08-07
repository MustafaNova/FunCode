import type {
    ClanMsg,
    CreateClanReq,
    CreateClanRes,
    ErrorResponse,
    GetMyClanRes,
    SearchClansResDto
} from '@funcode/shared';
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

export async function leaveClan() {
    const res = await fetch(API_URLS.LEAVE_CLAN, {
        method: 'DELETE',
        credentials: 'include'
    })
    return res.ok
}

export async function searchClans(name: string, page: number, limit: number) {
    const url = `${API_URLS.SEARCH_CLANS}?name=${encodeURIComponent(name)}&page=${page}&limit=${limit}`
    const res = await fetch(url, {
        credentials: 'include'
    })

    const clans: SearchClansResDto = await res.json();
    return clans;
}

export async function joinClan(clanId: string) {
    const res = await fetch(API_URLS.JOIN_CLAN(clanId), {
        method: 'POST',
        credentials: 'include'
    })
    if (!res.ok) {
        const errorRes: ErrorResponse = await res.json();
        throw new Error(errorRes.message);
    }
}

export async function getClanMessages(limit: number, before?: string): Promise<ClanMsg[]> {
    const params = new URLSearchParams();
    params.set('limit', String(limit));

    if (before) {
        params.set('before', before)
    }

    const res = await fetch(`${API_URLS.GET_CLAN_MESSAGES}?${params.toString()}`, {
        method: 'GET',
        credentials: 'include',
    });

    return await res.json();
}