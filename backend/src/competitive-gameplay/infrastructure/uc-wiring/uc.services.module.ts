import { Module } from '@nestjs/common';
import { MatchMakerService } from './match.maker.service';
import { DatabaseModule } from '../database/database.module';
import { IdGeneratorModule } from '../idGenerator/idGenerator.module';
import { RedisModule } from '../redis/redis.module';
import { JoinService } from './join.service';
import {
    BATTLE_MANAGER_PORT,
    JOIN_MATCHMAKING_PORT, LEAVE_MATCHMAKING_PORT, MATCH_MAKER_PORT, SUBMIT_ARENA_SOLUTION_PORT,
    CLASSIC_VALIDATOR_PORT, BUG_HUNTER_VALIDATOR_PORT,
} from './tokens';
import { ClassicValidatorService } from './classicValidator.service';
import { BattleManagerService } from './battle.manager.service';
import { PlayerGatewayModule } from '../playerGateway/player.gateway.module';
import { LeaveService } from './leave.service';
import { SubmitArenaSolutionService } from './submitArenaSolution.service';
import { CodeExecutionModule } from '../codeExecution/code.execution.module';
import { BugHunterValidatorService } from './bugHunterValidator.service';

@Module({
    imports: [
        DatabaseModule,
        IdGeneratorModule,
        RedisModule,
        PlayerGatewayModule,
        CodeExecutionModule
    ],
    providers: [
        { provide: MATCH_MAKER_PORT, useClass: MatchMakerService },
        { provide: JOIN_MATCHMAKING_PORT, useClass: JoinService },
        { provide: LEAVE_MATCHMAKING_PORT, useClass: LeaveService },
        { provide: CLASSIC_VALIDATOR_PORT, useClass: ClassicValidatorService },
        { provide: BATTLE_MANAGER_PORT, useClass: BattleManagerService },
        { provide: SUBMIT_ARENA_SOLUTION_PORT, useClass: SubmitArenaSolutionService },
        { provide: BUG_HUNTER_VALIDATOR_PORT, useClass: BugHunterValidatorService }
    ],
    exports: [
        JOIN_MATCHMAKING_PORT,
        CLASSIC_VALIDATOR_PORT,
        BATTLE_MANAGER_PORT,
        LEAVE_MATCHMAKING_PORT,
        SUBMIT_ARENA_SOLUTION_PORT,
        BUG_HUNTER_VALIDATOR_PORT
    ],
})
export class UCServicesModule {}
