import { Module } from '@nestjs/common';
import { BugHunterController } from './controller/bugHunter.controller';
import { UCServicesModule } from '../../infrastructure/uc-wiring/uc.services.module';


@Module({
    imports: [UCServicesModule],
    controllers: [BugHunterController]
})
export class HttpModule {}