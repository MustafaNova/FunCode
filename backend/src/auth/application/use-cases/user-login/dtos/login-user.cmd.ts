export class LoginUserCmd {
    private constructor(
        public readonly username: string,
        public readonly password: string,
    ) {}

    static create(username: string, password: string) {
        return new LoginUserCmd(username, password);
    }
}
