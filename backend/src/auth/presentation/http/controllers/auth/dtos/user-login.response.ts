export class UserLoginResponse {
    private constructor(
        public readonly token: string,
        public readonly expiresIn: number,
    ) {}

    static create(token: string, expiresIn: number) {
        return new UserLoginResponse(token, expiresIn);
    }
}
