import { Module } from '@nestjs/common';
import { JoinMatchmakingService } from './use-cases/matchmaking-join/join-matchmaking.service';
import { BATTLE_MANAGER_PORT, JOIN_MATCHMAKING_PORT } from './tokens';
import { MatchMakerService } from './use-cases/matchMaker/match-maker.service';
import { BattleManagerService } from './use-cases/battle-manager/battle-manager.service';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { TaskService } from './use-cases/battle-manager/tasks/task.service';

@Module({
    imports: [InfrastructureModule],
    controllers: [],
    providers: [
        {
            provide: JOIN_MATCHMAKING_PORT,
            useClass: JoinMatchmakingService,
        },
        {
            provide: BATTLE_MANAGER_PORT,
            useClass: BattleManagerService,
        },
        MatchMakerService,
        TaskService,
    ],
    exports: [JOIN_MATCHMAKING_PORT, BATTLE_MANAGER_PORT],
})
export class ApplicationModule {}
