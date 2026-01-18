export class LoginUserCmd {
    constructor(
        public readonly username: string,
        public readonly password: string,
    ) {}
}
