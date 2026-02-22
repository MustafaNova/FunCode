import { Module } from '@nestjs/common';
import { RedisModule } from './redis/redis.module';
import { DatabaseModule } from './database/database.module';
import { PlayerGatewayModule } from './playerGateway/player.gateway.module';

@Module({
    imports: [RedisModule, DatabaseModule, PlayerGatewayModule],
    exports: [RedisModule, DatabaseModule, PlayerGatewayModule],
})
export class InfrastructureModule {}
