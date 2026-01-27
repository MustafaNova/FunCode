export class JoinRes {
    private constructor(public readonly success: boolean) {}

    static ok() {
        return new JoinRes(true);
    }
}
