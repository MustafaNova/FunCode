import { CreateClanData } from './data/createClan.data';
import { Clan } from '../../../domain/entities/clan';
import { AddClanMemberData } from './data/addClanMember.data';
import { ClanMember } from '../../../domain/entities/clanMember';
import { MyClan } from '../../../domain/types/myClan.type';
import { SearchClansData } from './data/searchClans.data';
import { SearchClansResData } from './data/searchClansRes.data';

export interface ClanRepositoryPort {
    existsByName(name: string): Promise<boolean>;
    isUserInClan(userId: string): Promise<boolean>;
    isUserInClanByClanId(userId: string, clanId: string): Promise<boolean>;
    createClan(data: CreateClanData): Promise<Clan>;
    addMember(data: AddClanMemberData): Promise<ClanMember>;
    getMyClan(userId: string): Promise<MyClan | null>
    leaveClan(userId: string): Promise<void>;
    searchClans(data: SearchClansData): Promise<SearchClansResData[]>;
    clanExists(clanId: string): Promise<boolean>;
    getUserClanRole(userId: string): Promise<string | null>;
}