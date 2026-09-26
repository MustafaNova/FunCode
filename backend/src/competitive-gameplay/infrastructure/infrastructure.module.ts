import { Module } from '@nestjs/common';
import { RedisModule } from './redis/redis.module';
import { DatabaseModule } from './database/database.module';
import { PlayerGatewayModule } from './playerGateway/player.gateway.module';
import { IdGeneratorModule } from './idGenerator/idGenerator.module';
import { UCServicesModule } from './uc-wiring/uc.services.module';
import { CodeExecutionModule } from './codeExecution/code.execution.module';
import { CodeGolfMatchStateModule } from './CodeGolfMatchState/codeGolfMatchState.module';

@Module({
    imports: [
        RedisModule,
        DatabaseModule,
        PlayerGatewayModule,
        IdGeneratorModule,
        UCServicesModule,
        CodeExecutionModule,
        CodeGolfMatchStateModule
    ],
    exports: [
        RedisModule,
        DatabaseModule,
        PlayerGatewayModule,
        IdGeneratorModule,
        UCServicesModule,
        CodeExecutionModule,
        CodeGolfMatchStateModule
    ],
})
export class InfrastructureModule {}
