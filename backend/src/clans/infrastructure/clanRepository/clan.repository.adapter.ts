import { ClanRepositoryPort } from '../../application/ports/outbound/clan.repository.port';
import { ClanEntity } from '../entities/clan.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ClanMemberEntity } from '../entities/clan-member.entity';
import { CreateClanData } from '../../application/ports/outbound/data/createClan.data';
import { Clan } from '../../domain/entities/clan';
import { AddClanMemberData } from '../../application/ports/outbound/data/addClanMember.data';
import { ClanMapper } from '../mapper/clan.mapper';
import { ClanMemberMapper } from '../mapper/clanMember.mapper';
import { ClanMember } from '../../domain/entities/clanMember';


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

    async createClan(data: CreateClanData): Promise<Clan> {
        const clanEntity = this.clanRepo.create({
            name: data.name,
            description: data.description,
        })
        const savedClan = await this.clanRepo.save(clanEntity)
        return ClanMapper.toDomain(savedClan)
    }

    async addMember(data: AddClanMemberData): Promise<ClanMember> {
        const clanMemberEntity = this.clanMemberRepo.create({
            userId: data.userId,
            clanId: data.clanId,
            role: data.role
        })
        const savedClanMember = await this.clanMemberRepo.save(clanMemberEntity)
        return ClanMemberMapper.toDomain(savedClanMember)
    }
}