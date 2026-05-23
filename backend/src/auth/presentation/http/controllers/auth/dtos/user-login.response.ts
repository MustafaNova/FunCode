export class UserLoginResponse {
    private constructor(
        public readonly token: string,
        public readonly expiresIn: number,
        public readonly username: string,
        public readonly hasCompletedOnboarding: boolean,
    ) {}

    static create(token: string, expiresIn: number, username: string, hasCompletedOnboarding: boolean) {
        return new UserLoginResponse(token, expiresIn, username, hasCompletedOnboarding);
    }
}
