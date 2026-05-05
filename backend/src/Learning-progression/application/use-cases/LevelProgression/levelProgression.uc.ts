import { LevelProgressionPort } from '../../ports/inbound/LevelProgression.port';
import { Course } from '@funcode/shared';
import { LevelProgressionRepositoryPort } from '../../ports/outbound/LevelProgressionRepository.port';

export class LevelProgressionUC implements LevelProgressionPort {
    constructor(
        private readonly levelProgressionRepo: LevelProgressionRepositoryPort,
    ) {}
    async unlockNextLevel(course: Course, module: string): Promise<void> {
        await this.levelProgressionRepo.completeLevel(course, module);
    }
}
