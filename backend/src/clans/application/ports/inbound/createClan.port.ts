import { CreateClanCmd } from '../../use-cases/createClan/createClan.cmd';
import { Clan } from '../../../domain/entities/clan';

export interface CreateClanPort {
    createClan(req: CreateClanCmd): Promise<Clan>;
}