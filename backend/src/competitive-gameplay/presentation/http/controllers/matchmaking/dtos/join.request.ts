import { IsEnum } from 'class-validator';
import { PlayerCount } from '../../../../../domain/enums/playercount';
import { MatchType } from '../../../../../domain/enums/matchtype';

export class MatchMakingPayload {
    @IsEnum(MatchType)
    matchType: MatchType;

    @IsEnum(PlayerCount)
    playerCount: PlayerCount;
}
