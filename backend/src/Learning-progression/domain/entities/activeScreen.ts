import { Course } from '@funcode/shared';

export interface ActiveScreen {
    course: Course | null;
    module: string | null;
    unlockedLevel: number;
}
