import { GetMyClanPort } from '../../ports/inbound/getMyClan.port';
import { ClanRepositoryPort } from '../../ports/outbound/clan.repository.port';
import { GetMyClanRes } from './getMyClan.res';
import { ClanNotFoundError } from '../errors/ClanNotFoundError';


export class GetMyClanUC implements GetMyClanPort {
    constructor(
        private readonly clanRepo: ClanRepositoryPort
    ) {}

    async getMyClan(userId: string): Promise<GetMyClanRes> {
        const myClan = await this.clanRepo.getMyClan(userId)
        if (myClan === null) {
            throw new ClanNotFoundError()
        }

        return {
            clanId: myClan.clanId,
            name: myClan.name,
            description: myClan.description,
            role: myClan.role
        }
    }
}