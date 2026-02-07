import { Module } from '@nestjs/common';
import { ApplicationModule } from './application/application.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { ApiModule } from './presentation/http/api.module';

@Module({
    imports: [ApplicationModule, InfrastructureModule, ApiModule],
})
export class CompetitiveGameplayModule {}
