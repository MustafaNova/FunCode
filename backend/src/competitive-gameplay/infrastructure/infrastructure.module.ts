import { Module } from '@nestjs/common';
import { RedisModule } from './redis/redis.module';
import { DatabaseModule } from './database/database.module';
import { PlayerGatewayModule } from './playerGateway/player.gateway.module';
import { IdGeneratorModule } from './idGenerator/idGenerator.module';
import { UCServicesModule } from './uc-wiring/uc.services.module';
import { CodeExecutionModule } from './codeExecution/code.execution.module';
import { CodeGolfMatchStateModule } from './matchStates/CodeGolfMatchState/codeGolfMatchState.module';
import { BugHunterMatchStateModule } from './matchStates/BugHunterMatchState/bugHunterMatchState.module';
import { ClassicMatchStateModule } from './matchStates/ClassicMatchState/classicMatchState.module';

@Module({
    imports: [
        RedisModule,
        DatabaseModule,
        PlayerGatewayModule,
        IdGeneratorModule,
        UCServicesModule,
        CodeExecutionModule,
        CodeGolfMatchStateModule,
        BugHunterMatchStateModule,
        ClassicMatchStateModule
    ],
    exports: [
        RedisModule,
        DatabaseModule,
        PlayerGatewayModule,
        IdGeneratorModule,
        UCServicesModule,
        CodeExecutionModule,
        CodeGolfMatchStateModule,
        BugHunterMatchStateModule,
        ClassicMatchStateModule
    ],
})
export class InfrastructureModule {}
