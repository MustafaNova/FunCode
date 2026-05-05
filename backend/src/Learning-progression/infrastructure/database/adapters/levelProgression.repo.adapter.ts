import { LevelProgressionRepositoryPort } from '../../../application/ports/outbound/LevelProgressionRepository.port';
import { Course } from '@funcode/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LevelProgressionRepoAdapter implements LevelProgressionRepositoryPort {
    completeLevel(course: Course, module: string): Promise<void> {

    }
}
