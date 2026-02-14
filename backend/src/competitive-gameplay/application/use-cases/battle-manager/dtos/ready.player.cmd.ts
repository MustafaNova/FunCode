export class ReadyPlayerCmd {
    private constructor(
        public readonly userId: string,
        public readonly roomId: string,
        public readonly roomSize: number,
    ) {}

    static create(userId: string, roomId: string, roomSize: number) {
        return new ReadyPlayerCmd(userId, roomId, roomSize);
    }
}
