import { Module } from '@nestjs/common';
import { MatchMakerService } from './match.maker.service';
import { DatabaseModule } from '../database/database.module';
import { IdGeneratorModule } from '../idGenerator/idGenerator.module';
import { RedisModule } from '../redis/redis.module';
import { JoinService } from './join.service';
import {
    BATTLE_MANAGER_PORT,
    JOIN_MATCHMAKING_PORT,
    VALIDATOR_PORT,
} from './tokens';
import { ValidatorService } from './validator.service';
import { BattleManagerService } from './battle.manager.service';

@Module({
    imports: [DatabaseModule, IdGeneratorModule, RedisModule],
    providers: [
        MatchMakerService,
        { provide: JOIN_MATCHMAKING_PORT, useClass: JoinService },
        { provide: VALIDATOR_PORT, useClass: ValidatorService },
        { provide: BATTLE_MANAGER_PORT, useClass: BattleManagerService },
    ],
    exports: [JOIN_MATCHMAKING_PORT, VALIDATOR_PORT, BATTLE_MANAGER_PORT],
})
export class UCServicesModule {}
