import { ClanRepositoryPort } from '../../application/ports/outbound/clan.repository.port';
import { ClanEntity } from '../entities/clan.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ClanMemberEntity } from '../entities/clan-member.entity';
import { CreateClanData } from '../../application/ports/outbound/data/createClan.data';
import { Clan } from '../../domain/entities/clan';
import { AddClanMemberData } from '../../application/ports/outbound/data/addClanMember.data';
import { ClanMapper } from '../mapper/clan.mapper';
import { ClanMemberMapper } from '../mapper/clanMember.mapper';
import { ClanMember } from '../../domain/entities/clanMember';
import { MyClan } from '../../domain/types/myClan.type';
import { SearchClansData } from '../../application/ports/outbound/data/searchClans.data';
import { SearchClansResData } from '../../application/ports/outbound/data/searchClansRes.data';


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

    async getMyClan(userId: string): Promise<MyClan | null> {
        const clanMemberEntity = await this.clanMemberRepo.findOne({
            where: { userId }
        })

        if (!clanMemberEntity) {
            return null
        }

        const clanEntity = await this.clanRepo.findOne({
            where: { id: clanMemberEntity.clanId }
        })

        if (!clanEntity) {
            return null
        }

        return {
            clanId: clanEntity.id,
            name: clanEntity.name,
            description: clanEntity.description,
            role: clanMemberEntity.role
        }
    }

    async leaveClan(userId: string): Promise<void> {
        const clanMemberEntity = await this.clanMemberRepo.findOne({
            where: { userId }
        })

        if (!clanMemberEntity) {
            return;
        }

        await this.clanMemberRepo.remove(clanMemberEntity);

        const memberCount = await this.clanMemberRepo.count({
            where: { clanId: clanMemberEntity.clanId }
        })

        if (memberCount === 0) {
            await this.clanRepo.delete({
                id: clanMemberEntity.clanId
            })
        }

    }

    async searchClans(data: SearchClansData): Promise<SearchClansResData[]> {
        const clans = await this.clanRepo.find({
            where: {
                name: ILike(`%${data.name}%`)
            },
            relations: {
                members: true
            },
            order: {
                name: 'ASC'
            },
            skip: (data.page - 1) * data.limit,
            take: data.limit,
        })

        return clans.map((clan) => ({
            id: clan.id,
            name: clan.name,
            description: clan.description,
            memberCount: clan.members.length,
        }))
    }

    async clanExists(clanId: string): Promise<boolean> {
        return this.clanRepo.exists({
            where: {id: clanId}
        });
    }
}
