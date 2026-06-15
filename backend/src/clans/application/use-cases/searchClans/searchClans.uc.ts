import { SearchClansPort } from '../../ports/inbound/searchClans.port';
import { SearchClansCmd } from './searchClans.cmd';
import { SearchClansRes } from './searchClans.res';
import { ClanRepositoryPort } from '../../ports/outbound/clan.repository.port';


export class SearchClansUC implements SearchClansPort {
    constructor(
        private readonly clanRepo: ClanRepositoryPort,
    ) {}

    async search(cmd: SearchClansCmd): Promise<SearchClansRes[]> {
        return [{
            name: 'testUC',
            description: 'testUC',
            memberCount: 0,
        }]
    }
}
