export class JoinCmd {
    private constructor(public readonly userId: string) {}

    static create(userId: string) {
        return new JoinCmd(userId);
    }
}
