import { JoinClanPort } from '../../ports/inbound/joinClan.port';
import { JoinClanCmd } from './joinClan.cmd';
import { ClanRepositoryPort } from '../../ports/outbound/clan.repository.port';
import { UserAlreadyInClanError } from '../errors/userAlreadyInClan.error';
import { ClanNotFoundError } from '../errors/ClanNotFoundError';
import { ClanRole } from '../../../domain/enums/clanRole.enum';


export class JoinClanUC implements JoinClanPort {
    constructor(
        private readonly clanRepo: ClanRepositoryPort,
    ) {}

    async join(cmd: JoinClanCmd): Promise<void> {
        console.log('started join uc');
        const userInClan = await this.clanRepo.isUserInClan(cmd.userId);
        if (userInClan) {
            throw new UserAlreadyInClanError();
        }

        const clanExists = await this.clanRepo.clanExists(cmd.clanId);
        if (!clanExists) {
            throw new ClanNotFoundError();
        }

        await this.clanRepo.addMember({
            userId: cmd.userId,
            clanId: cmd.clanId,
            role: ClanRole.MEMBER
        })
    }
}