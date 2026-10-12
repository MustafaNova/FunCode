import { SearchClansCmd } from '../../use-cases/searchClans/searchClans.cmd';
import { SearchClansRes } from '../../use-cases/searchClans/searchClans.res';

export interface SearchClansPort {
    search(cmd: SearchClansCmd): Promise<SearchClansRes[]>;
}
