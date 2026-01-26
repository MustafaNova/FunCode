export class UserRegistrationCmd {
    private constructor(
        public readonly username: string,
        public readonly email: string,
        public readonly password: string,
    ) {}

    static create(username: string, email: string, password: string) {
        return new UserRegistrationCmd(username, email, password);
    }
}
