import { Module } from '@nestjs/common';
import { MATCH_CLEANUP_PORT } from './token';
import { MatchCleanupAdapter } from './match.cleanup.adapter';
import { ClassicMatchStateModule } from '../matchStates/ClassicMatchState/classicMatchState.module';
import { BugHunterMatchStateModule } from '../matchStates/BugHunterMatchState/bugHunterMatchState.module';
import { CodeGolfMatchStateModule } from '../matchStates/CodeGolfMatchState/codeGolfMatchState.module';
import { PlayerGatewayModule } from '../playerGateway/player.gateway.module';


@Module({
    imports: [
        ClassicMatchStateModule,
        BugHunterMatchStateModule,
        CodeGolfMatchStateModule,
        PlayerGatewayModule,
    ],
    providers: [
        {
            provide: MATCH_CLEANUP_PORT,
            useClass: MatchCleanupAdapter,
        }
    ],
    exports: [MATCH_CLEANUP_PORT]
})
export class MatchCleanupModule {}