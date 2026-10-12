import { Module } from '@nestjs/common';
import { CODE_GOLF_MATCH_STATE_PORT } from './token';
import { CodeGolfMatchStateAdapter } from './codeGolfMatchState.adapter';


@Module({
    providers: [
        {
            provide: CODE_GOLF_MATCH_STATE_PORT,
            useClass: CodeGolfMatchStateAdapter,
        }
    ],
    exports: [CODE_GOLF_MATCH_STATE_PORT]
})
export class CodeGolfMatchStateModule {}