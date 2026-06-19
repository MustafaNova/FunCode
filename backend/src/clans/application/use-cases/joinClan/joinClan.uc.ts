import { JoinClanPort } from '../../ports/inbound/joinClan.port';
import { JoinClanCmd } from './joinClan.cmd';
import { ClanRepositoryPort } from '../../ports/outbound/clan.repository.port';


export class JoinClanUC implements JoinClanPort {
    constructor(
        private readonly clanRepo: ClanRepositoryPort,
    ) {}

    async join(cmd: JoinClanCmd): Promise<void> {
    }
}