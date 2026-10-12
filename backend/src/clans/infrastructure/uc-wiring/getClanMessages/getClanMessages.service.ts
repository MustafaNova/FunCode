import { Inject, Injectable } from '@nestjs/common';
import { GetClanMessagesUC } from '../../../application/use-cases/getClanMessages/getClanMessages.uc';
import { type ClanRepositoryPort } from '../../../application/ports/outbound/clan.repository.port';
import { CLAN_REPO_PORT } from '../../clanRepo/tokens';
import { type ClanChatRepositoryPort } from '../../../application/ports/outbound/clanChat.repository.port';
import { CLAN_CHAT_REPO_PORT } from '../../clanChatRepo/tokens';


@Injectable()
export class GetClanMessagesService extends GetClanMessagesUC {
    constructor(
        @Inject(CLAN_REPO_PORT)
        clanRepo: ClanRepositoryPort,
        @Inject(CLAN_CHAT_REPO_PORT)
        clanChatRepo: ClanChatRepositoryPort,
    ) {
        super(clanRepo, clanChatRepo);
    }

}