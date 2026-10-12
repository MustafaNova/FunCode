import { ArenaGameModeId } from '@funcode/shared';

export class JoinCmd {
    private constructor(
        public readonly userId: string,
        public readonly username: string,
        public readonly gameModeId: ArenaGameModeId
    ) {}

    static create(
        userId: string,
        username: string,
        gameModeId: ArenaGameModeId,
    ) {
        return new JoinCmd(userId, username, gameModeId);
    }
}
