import { Module } from '@nestjs/common';
import { UCServicesModule } from '../../infrastructure/uc-wiring/uc.services.module';

@Module({
    imports: [UCServicesModule],
    controllers: [],
})
export class HttpModule {}
