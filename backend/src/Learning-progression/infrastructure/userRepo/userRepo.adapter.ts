import { UserRepoPort } from '../../application/ports/outbound/userRepo.port';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../../auth/infrastructure/persistence/typeorm/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepoAdapter implements UserRepoPort {
    constructor(
        @InjectRepository(UserEntity)
        private readonly repo: Repository<UserEntity>,
    ) {}

    async markOnboardingCompleted(userId: string) {
        await this.repo.update(
            { id: userId },
            { hasCompletedOnboarding: true }
        )
    }
}