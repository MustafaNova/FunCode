export type RegisterReq = {
    username: string;
    email: string;
    password: string;
    passwordRepeat: string;
}

export type LoginReq = {
    username: string;
    password: string;
}
