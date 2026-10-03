import { Module } from '@nestjs/common';
import { BUG_HUNTER_MATCH_STATE_PORT } from './token';
import { BugHunterMatchStateAdapter } from './bugHunterMatchState.adapter';

@Module({
    providers: [
        {
            provide: BUG_HUNTER_MATCH_STATE_PORT,
            useClass: BugHunterMatchStateAdapter,
        }
    ],
    exports: [BUG_HUNTER_MATCH_STATE_PORT]
})
export class BugHunterMatchStateModule {}