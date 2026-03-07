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
import { BattleManagerService } from './battle-manager/battle.manager.service';
import { MatchModule } from '../match/match.module';
import { MatchFound1v1Listener } from './battle-manager/match.found1v1.listener';
import { UserCodeExecutionModule } from '../userCodeExecution/usercode.execution.module';
import { PlayerGatewayModule } from '../playerGateway/player.gateway.module';

@Module({
    imports: [
        DatabaseModule,
        IdGeneratorModule,
        RedisModule,
        MatchModule,
        UserCodeExecutionModule,
        PlayerGatewayModule,
    ],
    providers: [
        MatchMakerService,
        MatchFound1v1Listener,
        { provide: JOIN_MATCHMAKING_PORT, useClass: JoinService },
        { provide: VALIDATOR_PORT, useClass: ValidatorService },
        { provide: BATTLE_MANAGER_PORT, useClass: BattleManagerService },
    ],
    exports: [JOIN_MATCHMAKING_PORT, VALIDATOR_PORT, BATTLE_MANAGER_PORT],
})
export class UCServicesModule {}
