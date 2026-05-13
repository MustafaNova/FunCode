import { MatchType } from '../../../domain/enums/matchtype';
import { PlayerCount } from '../../../domain/enums/playercount';

export class LeaveCmd {
    private constructor(
        public readonly userId: string,
        public readonly username: string,
        public readonly matchType: MatchType,
        public readonly playerCount: PlayerCount,
    ) {}

    static create(
        userId: string,
        username: string,
        matchType: MatchType,
        playerCount: PlayerCount,
    ) {
        return new LeaveCmd(userId, username, matchType, playerCount);
    }
}
