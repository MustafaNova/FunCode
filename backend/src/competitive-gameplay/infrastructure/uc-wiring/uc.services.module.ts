import { Module } from '@nestjs/common';
import { MatchMakerService } from './match.maker.service';
import { DatabaseModule } from '../database/database.module';
import { IdGeneratorModule } from '../idGenerator/idGenerator.module';
import { RedisModule } from '../redis/redis.module';
import { JoinService } from './join.service';
import { JOIN_MATCHMAKING_PORT } from '../../application/tokens';

@Module({
    imports: [DatabaseModule, IdGeneratorModule, RedisModule],
    providers: [
        MatchMakerService,
        { provide: JOIN_MATCHMAKING_PORT, useClass: JoinService },
    ],
    exports: [JOIN_MATCHMAKING_PORT],
})
export class UCServicesModule {}
