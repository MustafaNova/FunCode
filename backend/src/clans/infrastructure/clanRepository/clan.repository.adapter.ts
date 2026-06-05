import { ClanRepositoryPort } from '../../application/ports/outbound/clan.repository.port';
import { ClanEntity } from '../entities/clan.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ClanMemberEntity } from '../entities/clan-member.entity';


export class ClanRepositoryAdapter implements ClanRepositoryPort {
    constructor(
        @InjectRepository(ClanEntity)
        private readonly clanRepo: Repository<ClanEntity>,
        @InjectRepository(ClanMemberEntity)
        private readonly clanMemberRepo: Repository<ClanMemberEntity>
    ) {}

    existsByName(name: string): Promise<boolean> {
        return this.clanRepo.exists({
            where: { name },
        })
    }

    isUserInClan(userId: string): Promise<boolean> {
        return this.clanMemberRepo.exists({
            where: { userId },
        })
    }
}