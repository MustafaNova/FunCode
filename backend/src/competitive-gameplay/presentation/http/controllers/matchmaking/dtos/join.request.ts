import { IsEnum, IsString } from 'class-validator';
import { MatchType, PlayerCount } from '../../../../../domain/types';

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
