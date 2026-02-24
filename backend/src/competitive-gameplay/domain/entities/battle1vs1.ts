export interface PlayerInfo {
    userId: string;
    username: string;
}

export class Battle1vs1 {
    private constructor(
        public readonly player1: PlayerInfo,
        public readonly player2: PlayerInfo,
        public readonly roomId?: string,
    ) {}

    static create(player1: PlayerInfo, player2: PlayerInfo, roomId?: string) {
        return new Battle1vs1(player1, player2, roomId);
    }
}
