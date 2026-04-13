import { API_URLS } from '../constants/urls.ts';
import type { LoginReq, RegisterReq } from '../types/auth.ts';

export async function registerUser(data: RegisterReq) {
    await fetch(API_URLS.REGISTER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
}

export async function loginUser(data: LoginReq) {
    console.log('STARTED LOGINUSER');

    await fetch(API_URLS.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
    })
    console.log('DONE LOGINUSER');
}
