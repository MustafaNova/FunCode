export class Battle1vs1 {
    private constructor(
        public readonly playerId1: string,
        public readonly playerId2: string,
    ) {}

    static create(playerId1: string, playerId2: string) {
        return new Battle1vs1(playerId1, playerId2);
    }
}
