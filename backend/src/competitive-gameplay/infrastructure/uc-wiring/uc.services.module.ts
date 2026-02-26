import { Module } from '@nestjs/common';
import { MatchMakerService } from './match.maker.service';
import { DatabaseModule } from '../database/database.module';
import { IdGeneratorModule } from '../idGenerator/idGenerator.module';
import { RedisModule } from '../redis/redis.module';

@Module({
    imports: [DatabaseModule, IdGeneratorModule, RedisModule],
    providers: [MatchMakerService],
})
export class UCServicesModule {}
