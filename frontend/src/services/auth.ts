import { API_URLS } from './urls.ts';
import type { LoginReq, LoginResponse, RegisterReq } from '../types/auth.ts';
import { STORAGE_KEYS } from '../constants/storageKeys.ts';

export async function registerUser(data: RegisterReq) {
    await fetch(API_URLS.REGISTER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
}

export async function loginUser(data: LoginReq) {
    const response = await fetch(API_URLS.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    const token: LoginResponse = await response.json()
    sessionStorage.setItem(STORAGE_KEYS.TOKEN, token.token)
}
