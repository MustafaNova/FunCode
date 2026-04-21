import { Course } from '../enums/course.js';

export interface GetActiveScreenRes {
    course: Course | null;
    module: string | null;
    unlockedLevel: number;
}
