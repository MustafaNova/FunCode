import { GetMyClanPort } from '../../ports/inbound/getMyClan.port';
import { ClanRepositoryPort } from '../../ports/outbound/clan.repository.port';
import { GetMyClanRes } from './getMyClan.res';
import { NotFoundException } from '@nestjs/common';


export class GetMyClanUC implements GetMyClanPort {
    constructor(
        private readonly clanRepo: ClanRepositoryPort
    ) {}

    async getMyClan(userId: string): Promise<GetMyClanRes> {
        const myClan = await this.clanRepo.getMyClan(userId)
        if (!myClan) {
            throw new NotFoundException()
        }

        return {
            clanId: myClan.clanId,
            name: myClan.name,
            description: myClan.description,
            role: myClan.role
        }
    }
}