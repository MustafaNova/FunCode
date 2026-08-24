import { PracticeProgressRepoPort } from '../../application/ports/outbound/practiceProgress.repo.port';
import { PracticeGameMode } from '../../domain/enums/practiceGameMode';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PracticeProgressEntity } from './practiceProgress.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PracticeProgress } from '../../domain/models/practiceProgress';

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
}
