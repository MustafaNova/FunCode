import { Module } from '@nestjs/common';
import { RedisModule } from './redis/redis.module';
import { DatabaseModule } from './database/database.module';
import { PlayerGatewayModule } from './playerGateway/player.gateway.module';
import { IdGeneratorModule } from './idGenerator/idGenerator.module';

@Module({
    imports: [
        RedisModule,
        DatabaseModule,
        PlayerGatewayModule,
        IdGeneratorModule,
    ],
    exports: [
        RedisModule,
        DatabaseModule,
        PlayerGatewayModule,
        IdGeneratorModule,
    ],
})
export class InfrastructureModule {}
