export interface PlayerInfo {
    userId: string;
    username: string;
}

export class Battle1vs1 {
    private constructor(
        public readonly roomId: string,
        public readonly player1: PlayerInfo,
        public readonly player2: PlayerInfo,
    ) {}

    static create(roomId: string, player1: PlayerInfo, player2: PlayerInfo) {
        return new Battle1vs1(roomId, player1, player2);
    }
}
