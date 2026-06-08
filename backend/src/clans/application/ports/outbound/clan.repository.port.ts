import { CreateClanData } from './data/createClan.data';
import { Clan } from '../../../domain/entities/clan';
import { AddClanMemberData } from './data/addClanMember.data';
import { ClanMember } from '../../../domain/entities/clanMember';

export interface ClanRepositoryPort {
    existsByName(name: string): Promise<boolean>;
    isUserInClan(userId: string): Promise<boolean>;
    createClan(data: CreateClanData): Promise<Clan>;
    addMember(data: AddClanMemberData): Promise<ClanMember>;
}