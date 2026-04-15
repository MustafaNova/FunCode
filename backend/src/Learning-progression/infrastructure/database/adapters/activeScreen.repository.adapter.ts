import { ActiveScreenRepositoryPort } from '../../../application/ports/outbound/activeScreenRepository.port';
import { Injectable } from '@nestjs/common';
import { Course } from '@funcode/shared';
import { Repository } from 'typeorm';
import { PlayerActiveScreenEntity } from '../entities/player.active.screen.entity';
import { PlayerProgressEntity } from '../entities/player.progress.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ActiveScreen } from '../../../domain/entities/activeScreen';
import { NotFoundException } from '../notFoundException.err';

@Injectable()
export class ActiveScreenRepositoryAdapter implements ActiveScreenRepositoryPort {
    constructor(
        @InjectRepository(PlayerActiveScreenEntity)
        private readonly activeScreenRepo: Repository<PlayerActiveScreenEntity>,
        @InjectRepository(PlayerProgressEntity)
        private readonly progressRepo: Repository<PlayerProgressEntity>,
    ) {}

    async updateActiveScreen(
        userId: string,
        course: Course,
        module: string,
    ): Promise<void> {
        const activeScreen = await this.activeScreenRepo.findOne({
            where: { userId },
        });

        if (!activeScreen) {
            const newProgress = this.progressRepo.create({
                userId,
                course,
                module,
                unlockedLevel: 1,
            });
            const saved = await this.progressRepo.save(newProgress);
            const newActiveScreen = this.activeScreenRepo.create({
                userId,
                progressId: saved.progressId,
            });
            await this.activeScreenRepo.save(newActiveScreen);
        }
    }

    async findByUserId(userId: string): Promise<ActiveScreen> {
        const res = await this.activeScreenRepo.findOne({
            where: { userId },
        });

        if (!res) {
            return {
                course: null,
                module: null,
                unlockedLevel: 0,
            };
        }

        const progressId = res.progressId;
        const activeProgress = await this.progressRepo.findOne({
            where: { progressId },
        });

        if (!activeProgress) {
            throw new NotFoundException();
        }

        return {
            course: activeProgress.course,
            module: activeProgress.module,
            unlockedLevel: activeProgress.unlockedLevel,
        };
    }
}
