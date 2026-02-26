import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { ApiModule } from './presentation/api.module';

@Module({
    imports: [InfrastructureModule, ApiModule],
})
export class AuthModule {}
