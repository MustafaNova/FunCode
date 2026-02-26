import { Module } from '@nestjs/common';
import { RedisModule } from './redis/redis.module';
import { DatabaseModule } from './database/database.module';
import { PlayerGatewayModule } from './playerGateway/player.gateway.module';
import { IdGeneratorModule } from './idGenerator/idGenerator.module';
import { UCServicesModule } from './uc-wiring/uc.services.module';

@Module({
    imports: [
        RedisModule,
        DatabaseModule,
        PlayerGatewayModule,
        IdGeneratorModule,
        UCServicesModule,
    ],
    exports: [
        RedisModule,
        DatabaseModule,
        PlayerGatewayModule,
        IdGeneratorModule,
        UCServicesModule,
    ],
})
export class InfrastructureModule {}
