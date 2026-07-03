export type AuthUser = {
    userId: string,
    username: string,
}

export type AuthContextValue = {
    user: AuthUser | null,
    loading: boolean,
}