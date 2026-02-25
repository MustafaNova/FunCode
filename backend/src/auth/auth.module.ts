import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { ApplicationModule } from './application/application.module';
import { ApiModule } from './presentation/api.module';

@Module({
    imports: [InfrastructureModule, ApplicationModule, ApiModule],
    exports: [InfrastructureModule, ApplicationModule, ApiModule],
})
export class AuthModule {}
