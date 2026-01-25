export class UserId {
    private constructor(private readonly userId: string) {}

    static create(userId: string) {
        return new UserId(userId);
    }
    get() {
        return this.userId;
    }
}
