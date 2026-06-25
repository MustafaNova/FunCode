import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { ClanRepoModule } from '../../infrastructure/clanRepository/clan.repo.module';


@Module({
    imports: [ClanRepoModule],
    providers: [ChatGateway, ChatService],
})
export class WebsocketModule {}