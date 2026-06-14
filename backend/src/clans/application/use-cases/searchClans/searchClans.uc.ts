import { SearchClansPort } from '../../ports/inbound/searchClans.port';
import { SearchClansCmd } from './searchClans.cmd';
import { SearchClansRes } from './searchClans.res';
import { ClanRepositoryPort } from '../../ports/outbound/clan.repository.port';


export class SearchClansUC implements SearchClansPort {
    constructor(
        private readonly clanRepo: ClanRepositoryPort,
    ) {}

    async search(cmd: SearchClansCmd): Promise<SearchClansRes[]> {
        console.log('search UC');
        return [{
            name: 's',
            description: 's',
            memberCount: 1,
        }]
    }
}