export class QueueEntry {
    private constructor(
        public readonly userId: string,
        public readonly username: string,
    ) {}

    static create(userId: string, username: string) {
        return new QueueEntry(userId, username);
    }
}
