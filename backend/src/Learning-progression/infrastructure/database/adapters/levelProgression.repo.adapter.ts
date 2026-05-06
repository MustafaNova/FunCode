import { LevelProgressionRepositoryPort } from '../../../application/ports/outbound/LevelProgressionRepository.port';
import { Course } from '@funcode/shared';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PlayerProgressEntity } from '../entities/player.progress.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LevelProgressionRepoAdapter implements LevelProgressionRepositoryPort {
    constructor(
        @InjectRepository(PlayerProgressEntity)
        private readonly progressRepo: Repository<PlayerProgressEntity>,
    ) {}

    async completeLevel(
        userId: string,
        course: Course,
        module: string,
    ): Promise<void> {
        await this.progressRepo.increment(
            { userId, course, module },
            'unlockedLevel',
            1,
        );
    }
}
