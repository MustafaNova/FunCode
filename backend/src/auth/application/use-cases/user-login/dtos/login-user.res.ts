export class LoginUserRes {
    private constructor(
        public readonly token: string,
        public readonly expiresIn: number,
    ) {}

    static create(token: string, expiresIn: number) {
        return new LoginUserRes(token, expiresIn);
    }
}
