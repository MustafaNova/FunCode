import { Module } from '@nestjs/common';
import { ClanRepoModule } from './clanRepo/clan.repo.module';
import { ClanChatRepoModule } from './clanChatRepo/clanChat.repo.module';


@Module({
    imports: [ClanRepoModule, ClanChatRepoModule],
    exports: [ClanRepoModule, ClanChatRepoModule]
})
export class InfrastructureModule {}