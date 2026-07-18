import { UserLookUpPort } from '../../application/ports/outbound/UserLookUp.port';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../auth/infrastructure/persistence/typeorm/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UserLookUpRes } from '../../domain/types/userLookUpRes';

@Injectable()
export class UserLookUpAdapter implements UserLookUpPort {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>
    ) {}

    async findUserIdByInviteCode(inviteCode: string): Promise<string | null> {
        const user = await this.userRepo.findOne({
            where: { inviteCode }
        })
        return user?.id ?? null
    }

    async findById(userId: string): Promise<UserLookUpRes | null> {
        const userRes = await this.userRepo.findOne({
            where: { id: userId },
        })

        if (userRes === null) {
            return null;
        }

        return {
            userId: userRes.id,
            username: userRes.username,
        }
    }
}