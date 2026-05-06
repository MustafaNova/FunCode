import { Course } from '@funcode/shared';

export interface LevelProgressionPort {
    unlockNextLevel(
        userId: string,
        course: Course,
        module: string,
    ): Promise<void>;
}
