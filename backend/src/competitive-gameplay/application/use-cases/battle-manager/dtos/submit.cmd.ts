export class SubmitCmd {
    private constructor(
        public readonly roomId: string,
        public readonly playerName: string,
        public readonly taskId: string,
        public readonly solution: string,
    ) {}

    static create(
        roomId: string,
        playerName: string,
        taskId: string,
        solution: string,
    ) {
        return new SubmitCmd(roomId, playerName, taskId, solution);
    }
}
