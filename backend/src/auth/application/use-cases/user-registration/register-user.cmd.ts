export class UserRegistrationCmd {
    constructor(
        public readonly username: string,
        public readonly email: string,
        public readonly password: string,
    ) {}
}
