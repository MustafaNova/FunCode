import { Module } from '@nestjs/common';
import { RedisModule } from './redis/redis.module';
import { DatabaseModule } from './database/database.module';
import { PlayerGatewayModule } from './playerGateway/player.gateway.module';
import { IdGeneratorModule } from './idGenerator/idGenerator.module';
import { UCServicesModule } from './uc-wiring/uc.services.module';
import { UserCodeExecutionModule } from './userCodeExecution/usercode.execution.module';
import { MatchModule } from './match/match.module';

@Module({
    imports: [
        RedisModule,
        DatabaseModule,
        PlayerGatewayModule,
        IdGeneratorModule,
        UCServicesModule,
        UserCodeExecutionModule,
        MatchModule,
    ],
    exports: [
        RedisModule,
        DatabaseModule,
        PlayerGatewayModule,
        IdGeneratorModule,
        UCServicesModule,
        UserCodeExecutionModule,
        MatchModule,
    ],
})
export class InfrastructureModule {}
