import { Module } from '@nestjs/common';
import { MATCH_PORT } from '../uc-wiring/tokens';
import { MatchAdapter } from './match.adapter';

@Module({
    providers: [{ provide: MATCH_PORT, useClass: MatchAdapter }],
    exports: [MATCH_PORT],
})
export class MatchModule {}
