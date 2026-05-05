import { Course } from '@funcode/shared';

export interface LevelProgressionRepositoryPort {
    completeLevel(course: Course, module: string): Promise<void>;
}
