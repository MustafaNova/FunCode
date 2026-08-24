import { Module } from '@nestjs/common';
import { BugHunterController } from './controller/bugHunter.controller';
import { UCServicesModule } from '../../infrastructure/uc-wiring/uc.services.module';
import { PracticeController } from './controller/practice.controller';


@Module({
    imports: [UCServicesModule],
    controllers: [BugHunterController, PracticeController]
})
export class HttpModule {}