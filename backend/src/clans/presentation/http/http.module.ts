import { Module } from '@nestjs/common';
import { ClansController } from './controllers/clans.controller';
import { UCServicesModule } from '../../infrastructure/uc-wiring/uc.services.module';
import { ClanChatController } from './controllers/clanChat.controller';


@Module({
    imports: [UCServicesModule],
    controllers: [ClansController, ClanChatController]
})
export class HttpModule {}
