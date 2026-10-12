import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { ClanRepoModule } from '../../infrastructure/clanRepo/clan.repo.module';
import { ClanChatRepoModule } from '../../infrastructure/clanChatRepo/clanChat.repo.module';


@Module({
    imports: [ClanRepoModule, ClanChatRepoModule],
    providers: [ChatGateway, ChatService],
})
export class WebsocketModule {}