import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClanMessageEntity } from '../entities/clan-message.entity';
import { CLAN_CHAT_REPO_PORT } from './tokens';
import { ClanChatRepoAdapter } from './clanChat.repo.adapter';


@Module({
    imports: [TypeOrmModule.forFeature([ClanMessageEntity])],
    providers: [
        {
            provide: CLAN_CHAT_REPO_PORT,
            useClass: ClanChatRepoAdapter,
        }
    ],
    exports: [CLAN_CHAT_REPO_PORT]
})
export class ClanChatRepoModule {}