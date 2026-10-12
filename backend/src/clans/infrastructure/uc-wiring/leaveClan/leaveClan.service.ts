import { LeaveClanUC } from '../../../application/use-cases/leaveClan/leaveClan.uc';
import { Inject, Injectable } from '@nestjs/common';
import { type ClanRepositoryPort } from '../../../application/ports/outbound/clan.repository.port';
import { CLAN_REPO_PORT } from '../../clanRepo/tokens';

@Injectable()
export class LeaveClanService extends LeaveClanUC {
    constructor(
        @Inject(CLAN_REPO_PORT)
        clanRepo: ClanRepositoryPort,
    ) {
        super(clanRepo);
    }
}