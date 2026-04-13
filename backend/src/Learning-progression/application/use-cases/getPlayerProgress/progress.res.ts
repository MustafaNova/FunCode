import { Course } from '@funcode/shared';

export interface PlayerProgress {
    course: Course;
    module: string;
    unlockedLevel: number;
}
