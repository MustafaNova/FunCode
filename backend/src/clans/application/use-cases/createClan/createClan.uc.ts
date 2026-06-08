import { CreateClanPort } from '../../ports/inbound/createClan.port';
import { ClanRepositoryPort } from '../../ports/outbound/clan.repository.port';
import { ClanNameAlreadyExistsError } from '../../errors/clan.name.already.exists.error';
import { CreateClanCmd } from './createClan.cmd';
import { UserAlreadyInClanError } from '../../errors/userAlreadyInClan.error';
import { ClanRole } from '../../../domain/enums/clanRole.enum';


export class CreateClanUC implements CreateClanPort {
    constructor(
        private readonly clanRepo: ClanRepositoryPort,
    ) {}

    async createClan(req: CreateClanCmd) {
        const nameAlreadyExists = await this.clanRepo.existsByName(req.name);
        if (nameAlreadyExists) {
            throw new ClanNameAlreadyExistsError()
        }

        const userAlreadyInClan = await this.clanRepo.isUserInClan(req.userId)
        if (userAlreadyInClan) {
            throw new UserAlreadyInClanError()
        }

        const clan = await this.clanRepo.createClan({ name: req.name, description: req.description })
        await this.clanRepo.addMember({ userId: req.userId, clanId: clan.id, role: ClanRole.LEADER })
        return clan;

    }
}
