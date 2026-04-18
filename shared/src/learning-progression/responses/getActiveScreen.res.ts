import { Course } from '../enums';

export interface GetActiveScreenRes {
    course: Course | null;
    module: string | null;
    unlockedLevel: number;
}
