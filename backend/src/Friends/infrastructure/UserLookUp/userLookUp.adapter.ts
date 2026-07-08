import { UserLookUpPort } from '../../application/ports/outbound/UserLookUp.port';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../auth/infrastructure/persistence/typeorm/user.entity';
import { InjectRepository } from '@nestjs/typeorm';


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
}