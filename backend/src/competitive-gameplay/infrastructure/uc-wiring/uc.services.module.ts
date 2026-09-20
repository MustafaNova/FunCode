import { Module } from '@nestjs/common';
import { MatchMakerService } from './match.maker.service';
import { DatabaseModule } from '../database/database.module';
import { IdGeneratorModule } from '../idGenerator/idGenerator.module';
import { RedisModule } from '../redis/redis.module';
import { JoinService } from './join.service';
import {
    BATTLE_MANAGER_PORT,
    JOIN_MATCHMAKING_PORT, LEAVE_MATCHMAKING_PORT, MATCH_MAKER_PORT,
    VALIDATOR_PORT,
} from './tokens';
import { ValidatorService } from './validator.service';
import { BattleManagerService } from './battle.manager.service';
import { UserCodeExecutionModule } from '../userCodeExecution/usercode.execution.module';
import { PlayerGatewayModule } from '../playerGateway/player.gateway.module';
import { LeaveService } from './leave.service';

@Module({
    imports: [
        DatabaseModule,
        IdGeneratorModule,
        RedisModule,
        UserCodeExecutionModule,
        PlayerGatewayModule,
    ],
    providers: [
        { provide: MATCH_MAKER_PORT, useClass: MatchMakerService },
        { provide: JOIN_MATCHMAKING_PORT, useClass: JoinService },
        { provide: LEAVE_MATCHMAKING_PORT, useClass: LeaveService },
        { provide: VALIDATOR_PORT, useClass: ValidatorService },
        { provide: BATTLE_MANAGER_PORT, useClass: BattleManagerService },
    ],
    exports: [JOIN_MATCHMAKING_PORT, VALIDATOR_PORT, BATTLE_MANAGER_PORT, LEAVE_MATCHMAKING_PORT],
})
export class UCServicesModule {}
