import { Module } from '@nestjs/common';
import { RedisModule } from './redis/redis.module';
import { DatabaseModule } from './database/database.module';
import { NotifierModule } from './notifier/notifier.module';

@Module({
    imports: [RedisModule, DatabaseModule, NotifierModule],
    exports: [RedisModule, DatabaseModule, NotifierModule],
})
export class InfrastructureModule {}
