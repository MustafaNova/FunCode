import { Course } from '../../../domain/enums';

export interface PlayerProgress {
    course: Course;
    module: string;
    unlockedLevel: number;
}
