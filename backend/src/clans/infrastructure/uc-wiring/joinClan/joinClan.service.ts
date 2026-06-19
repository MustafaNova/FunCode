import { JoinClanUC } from '../../../application/use-cases/joinClan/joinClan.uc';
import { Inject, Injectable } from '@nestjs/common';
import { type ClanRepositoryPort } from '../../../application/ports/outbound/clan.repository.port';
import { CLAN_REPO_PORT } from '../../clanRepository/tokens';

@Injectable()
export class JoinClanService extends JoinClanUC {
    constructor(
        @Inject(CLAN_REPO_PORT)
        clanRepo: ClanRepositoryPort
    ) {
        super(clanRepo);
    }
}