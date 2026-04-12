export class UserLoginResponse {
    private constructor(
        public readonly token: string,
        public readonly expiresIn: number,
        public readonly course: string,
        public readonly module: string,
        public readonly unlockedLevel: number,
    ) {}

    static create(
        token: string,
        expiresIn: number,
        course: string,
        module: string,
        unlockedLevel: number,
    ) {
        return new UserLoginResponse(
            token,
            expiresIn,
            course,
            module,
            unlockedLevel,
        );
    }
}
