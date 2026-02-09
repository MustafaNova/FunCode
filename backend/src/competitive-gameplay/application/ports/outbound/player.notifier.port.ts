export interface PlayerNotifierPort {
    joinPlayersToRoom1v1(
        roomId: string,
        userId1: string,
        userId2: string,
    ): Promise<void>;
    notifyBattleRoom(
        roomId: string,
        name1: string,
        name2: string,
        msg: string,
    ): void;
}
