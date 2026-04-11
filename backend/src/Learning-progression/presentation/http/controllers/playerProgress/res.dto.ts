import { Course } from '../../../../domain/enums';

export class ProgressRes {
    unlockedLevel: number;
    course: Course;
    module: string;
}
