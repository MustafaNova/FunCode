export class AccessToken {
    private constructor(
        public readonly token: string,
        public readonly expiresIn: number,
    ) {}

    static create(token: string, expiresIn: number) {
        return new AccessToken(token, expiresIn);
    }
}
