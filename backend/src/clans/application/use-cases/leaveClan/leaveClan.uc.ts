import { LeaveClanPort } from '../../ports/inbound/leaveClan.port';
import { ClanRepositoryPort } from '../../ports/outbound/clan.repository.port';


export class LeaveClanUC implements LeaveClanPort {
    constructor(
        private readonly clanRepo: ClanRepositoryPort,
    ) {}

    async leaveClan(userId: string): Promise<void> {
        await this.clanRepo.leaveClan(userId);
    }
}