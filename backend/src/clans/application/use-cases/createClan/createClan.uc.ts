import { CreateClanPort } from '../../ports/inbound/createClan.port';
import { CreateClanReq } from '@funcode/shared';
import { ClanRepositoryPort } from '../../ports/outbound/clan.repository.port';
import { ClanNameAlreadyExistsError } from '../../errors/clan.name.already.exists.error';


export class CreateClanUC implements CreateClanPort {
    constructor(
        private readonly clanRepo: ClanRepositoryPort,
    ) {}

    async createClan(req: CreateClanReq) {
        const nameAlreadyExists = await this.clanRepo.existsByName(req.name);
        if (nameAlreadyExists) {
            throw new ClanNameAlreadyExistsError()
        }
    }
}
