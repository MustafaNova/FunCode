import { Module } from '@nestjs/common';
import { BugHunterController } from './controllers/bugHunter.controller';
import { UCServicesModule } from '../../infrastructure/uc-wiring/uc.services.module';
import { PracticeController } from './controllers/practice.controller';
import { CodeGolfController } from './controllers/codeGolf.controller';


@Module({
    imports: [UCServicesModule],
    controllers: [BugHunterController, PracticeController, CodeGolfController]
})
export class HttpModule {}