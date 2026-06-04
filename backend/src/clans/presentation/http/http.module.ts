import { Module } from '@nestjs/common';
import { ClansController } from './controllers/clans.controller';
import { UCServicesModule } from '../../infrastructure/uc-wiring/uc.services.module';


@Module({
    imports: [UCServicesModule],
    controllers: [ClansController]
})
export class HttpModule {}