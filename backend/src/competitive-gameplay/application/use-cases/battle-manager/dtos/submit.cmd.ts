export class SubmitCmd {
    private constructor(
        public readonly userId: string,
        public readonly roomId: string,
        public readonly playerName: string,
        public readonly taskId: string,
        public readonly solution: string,
    ) {}

    static create(
        userId: string,
        roomId: string,
        playerName: string,
        taskId: string,
        solution: string,
    ) {
        return new SubmitCmd(userId, roomId, playerName, taskId, solution);
    }
}
