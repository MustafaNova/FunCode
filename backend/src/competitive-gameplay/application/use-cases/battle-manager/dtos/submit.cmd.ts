export class SubmitCmd {
    private constructor(
        public readonly roomId: string,
        public readonly playerName: string,
        public readonly solution: string,
    ) {}

    static create(roomId: string, playerName: string, solution: string) {
        return new SubmitCmd(roomId, playerName, solution);
    }
}
