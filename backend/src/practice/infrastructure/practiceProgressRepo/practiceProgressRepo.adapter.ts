import { PracticeProgressRepoPort } from '../../application/ports/outbound/practiceProgress.repo.port';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PracticeProgressEntity } from './practiceProgress.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PracticeProgress } from '../../domain/models/practiceProgress';
import { PracticeGameMode } from '@funcode/shared';

@Injectable()
export class PracticeProgressRepoAdapter implements PracticeProgressRepoPort {

    constructor(
        @InjectRepository(PracticeProgressEntity)
        private readonly practiceProgressRepo: Repository<PracticeProgressEntity>
    ) {}

    async getOrCreateProgress(userId: string, gameMode: PracticeGameMode): Promise<PracticeProgress> {
        const res = await this.practiceProgressRepo.findOne({
            where: { userId, gameMode },
        })

        if (res === null) {
            await this.practiceProgressRepo.insert({ userId, gameMode })
            return {
                highestUnlockedLevel: 1,
                completedAllLevels: false,
            };
        }
        return {
            highestUnlockedLevel: res.highestUnlockedLevel,
            completedAllLevels: res.completedAllLevels,
        };
    }

    async markAllLevelsAsCompleted(userId: string, gameMode: PracticeGameMode): Promise<void> {
        await this.practiceProgressRepo.update(
            { userId, gameMode },
            { completedAllLevels: true }
        )
    }

    async incrementUnlockedLevel(userId: string, gameMode: PracticeGameMode): Promise<void> {
        await this.practiceProgressRepo.increment(
            { userId, gameMode },
            'highestUnlockedLevel',
            1,
        )
    }
}
