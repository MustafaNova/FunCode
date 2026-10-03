import { Module } from '@nestjs/common';
import { CLASSIC_MATCH_STATE_PORT } from './token';
import { ClassicMatchStateAdapter } from './classicMatchState.adapter';


@Module({
    providers: [
        {
            provide: CLASSIC_MATCH_STATE_PORT,
            useClass: ClassicMatchStateAdapter,
        }
    ],
    exports: [CLASSIC_MATCH_STATE_PORT]
})
export class ClassicMatchStateModule {}