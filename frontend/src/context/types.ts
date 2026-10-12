export type AuthUser = {
    userId: string,
    username: string,
    inviteCode: string,
}

export type AuthContextValue = {
    user: AuthUser | null,
    loading: boolean,
}