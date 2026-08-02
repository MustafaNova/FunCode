import { Module } from '@nestjs/common';
import { ApiModule } from './presentation/api.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
    imports: [ApiModule, InfrastructureModule]
})
export class PracticeModule {}