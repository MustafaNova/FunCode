import { SearchClansUC } from '../../../application/use-cases/searchClans/searchClans.uc';
import { Inject } from '@nestjs/common';
import { CLAN_REPO_PORT } from '../../clanRepo/tokens';
import type { ClanRepositoryPort } from '../../../application/ports/outbound/clan.repository.port';

export class SearchClansService extends SearchClansUC {
    constructor(
        @Inject(CLAN_REPO_PORT)
        clanRepo: ClanRepositoryPort,
    ) {
        super(clanRepo);
    }
}