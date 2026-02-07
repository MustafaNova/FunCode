import { Module } from '@nestjs/common';
import { RedisModule } from './redis/redis.module';
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [RedisModule, DatabaseModule],
    exports: [RedisModule, DatabaseModule],
})
export class InfrastructureModule {}
