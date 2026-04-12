import { Course } from '../enums';

export interface ActiveScreen {
    course: Course | null;
    module: string | null;
    unlockedLevel: number;
}
