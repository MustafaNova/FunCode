import { API_URLS } from '../constants/urls.ts';
import type { LoginReq, LoginUserRes, RegisterReq } from '../types/auth.ts';
import type { LoginResponse, MeRes } from '@funcode/shared';

export async function registerUser(data: RegisterReq) {
    await fetch(API_URLS.REGISTER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
}

export async function loginUser(data: LoginReq): Promise<LoginUserRes | false> {
    const res = await fetch(API_URLS.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
    })
    if (!res.ok) {
        return false;
    }

    const loginResponse: LoginResponse = await res.json();
    return {
        hasCompletedOnboarding: loginResponse.hasCompletedOnboarding,
        username: loginResponse.username
    };
}

export async function me(): Promise<MeRes> {
    const res = await fetch(API_URLS.ME, {
        method: 'GET',
        credentials: 'include',
    })
    return await res.json();
}