export class SubmitCmd {
    private constructor(
        public readonly userId: string,
        public readonly roomId: string,
        public readonly playerName: string,
        public readonly solution: string,
    ) {}

    static create(
        userId: string,
        roomId: string,
        playerName: string,
        solution: string,
    ) {
        return new SubmitCmd(userId, roomId, playerName, solution);
    }
}
