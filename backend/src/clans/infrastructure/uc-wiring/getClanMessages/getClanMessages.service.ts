import { Inject, Injectable } from '@nestjs/common';
import { GetClanMessagesUC } from '../../../application/use-cases/getClanMessages/getClanMessages.uc';
import { type ClanRepositoryPort } from '../../../application/ports/outbound/clan.repository.port';
import { CLAN_REPO_PORT } from '../../clanRepo/tokens';


@Injectable()
export class GetClanMessagesService extends GetClanMessagesUC {
    constructor(
        @Inject(CLAN_REPO_PORT)
        clanRepo: ClanRepositoryPort
    ) {
        super(clanRepo);
    }

}