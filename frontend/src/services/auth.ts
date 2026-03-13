import { API_URLS } from './urls.ts';

type RegisterReq = {
    username: string
    email: string
    password: string
    passwordRepeat: string
}

export async function registerUser(data: RegisterReq) {
    const response = await fetch(API_URLS.register, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    console.log(response.json())
}

export function loginUser() {

}
