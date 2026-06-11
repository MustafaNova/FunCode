import { ActiveScreenRepositoryPort } from '../../../application/ports/outbound/activeScreenRepository.port';
import { Injectable } from '@nestjs/common';
import { Course } from '@funcode/shared';
import { Repository } from 'typeorm';
import { PlayerActiveScreenEntity } from '../entities/player.active.screen.entity';
import { PlayerProgressEntity } from '../entities/player.progress.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ActiveScreen } from '../../../domain/entities/activeScreen';
import { NotFoundProgressIdException } from '../errors/notFoundException.err';
import { CourseMapService } from '../levels-content/course.map';

@Injectable()
export class ActiveScreenRepositoryAdapter implements ActiveScreenRepositoryPort {
    constructor(
        @InjectRepository(PlayerActiveScreenEntity)
        private readonly activeScreenRepo: Repository<PlayerActiveScreenEntity>,
        @InjectRepository(PlayerProgressEntity)
        private readonly progressRepo: Repository<PlayerProgressEntity>,
    ) {}

    async initActiveScreen(
        userId: string,
        course: Course,
    ): Promise<void> {
        const activeScreen = await this.activeScreenRepo.findOne({
            where: { userId },
        });

        if (!activeScreen) {
            const firstModule = CourseMapService.getModuleName(course, 1);
            if (!firstModule) {
                throw new Error()
            }

            const newProgress = this.progressRepo.create({
                userId,
                course,
                module: firstModule,
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
            throw new NotFoundProgressIdException();
        }

        return {
            course: activeProgress.course,
            module: activeProgress.module,
            unlockedLevel: activeProgress.unlockedLevel,
        };
    }
}
