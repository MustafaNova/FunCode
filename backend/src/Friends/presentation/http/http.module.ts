import { Module } from '@nestjs/common';
import { FriendsController } from './friends.controller';
import { UcServicesModule } from '../../infrastructure/uc-wiring/uc.services.module';


@Module({
    imports: [UcServicesModule],
    controllers: [FriendsController]
})
export class HttpModule {}