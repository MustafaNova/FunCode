import { BugHunterProgressRepoPort } from '../../application/ports/outbound/bugHunterProgress.repo.port';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BugHunterProgressEntity } from './bugHunterProgress.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BugHunterProgressRepoAdapter implements BugHunterProgressRepoPort {
    constructor(
        @InjectRepository(BugHunterProgressEntity)
        private readonly bugHunterProgressRepo: Repository<BugHunterProgressEntity>
    ) {}

    async getOrCreateHighestUnlockedLevel(userId: string): Promise<number> {
        const res = await this.bugHunterProgressRepo.findOne({
            where: { userId },
        })

        if (res == null) {
            await this.bugHunterProgressRepo.insert({ userId })
            return 1;
        }

        return res.highestUnlockedLevel;
    }
}