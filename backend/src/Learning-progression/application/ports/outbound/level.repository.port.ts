import { Course } from '@funcode/shared';
import { LevelModel } from '../../../domain/value-objects/level.model';

export interface LevelRepositoryPort {
    getLevel(course: Course, module: string, level: number): LevelModel;
}
