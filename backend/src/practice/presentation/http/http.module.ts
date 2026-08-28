import { Module } from '@nestjs/common';
import { BugHunterController } from './controllers/bugHunter.controller';
import { UCServicesModule } from '../../infrastructure/uc-wiring/uc.services.module';
import { PracticeController } from './controllers/practice.controller';


@Module({
    imports: [UCServicesModule],
    controllers: [BugHunterController, PracticeController]
})
export class HttpModule {}