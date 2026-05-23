export type LoginResponse = {
    token: string,
    expiresIn: string,
    username: string,
    hasCompletedOnboarding: boolean
}