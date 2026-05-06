import { Course } from '@funcode/shared';

export interface LevelProgressionRepositoryPort {
    completeLevel(
        userId: string,
        course: Course,
        module: string,
    ): Promise<void>;
}
