import { LevelRepositoryPort } from '../../../application/ports/outbound/level.repository.port';
import { Course } from '@funcode/shared';
import { LevelModel } from '../../../domain/value-objects/level.model';
import { Injectable } from '@nestjs/common';
import { LevelsMap } from '../levels-content/levels.map';

@Injectable()
export class LevelRepositoryAdapter implements LevelRepositoryPort {
    getLevel(course: Course, module: string, level: number): LevelModel {
        const res = LevelsMap[course]?.[module]?.[level];

    }
}
