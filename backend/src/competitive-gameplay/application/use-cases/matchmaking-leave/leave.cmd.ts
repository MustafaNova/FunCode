import { ArenaGameModeId } from '@funcode/shared';

export class LeaveCmd {
    private constructor(
        public readonly userId: string,
        public readonly username: string,
        public readonly gameModeId: ArenaGameModeId
    ) {}

    static create(
        userId: string,
        username: string,
        gameModeId: ArenaGameModeId
    ) {
        return new LeaveCmd(userId, username, gameModeId);
    }
}
