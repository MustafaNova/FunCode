import { Course } from '@funcode/shared';

export interface LevelProgressionPort {
    unlockNextLevel(course: Course, module: string): Promise<void>;
}
