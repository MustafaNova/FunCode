import { IsEnum, IsString } from 'class-validator';
import { PlayerCount } from '../../../../../domain/enums/playercount';
import { MatchType } from '../../../../../domain/enums/matchtype';

export class JoinPayload {
    @IsEnum(MatchType)
    matchType: MatchType;

    @IsEnum(PlayerCount)
    playerCount: PlayerCount;
}

export class AuthUser {
    @IsString()
    userId: string;

    @IsString()
    username: string;
}
