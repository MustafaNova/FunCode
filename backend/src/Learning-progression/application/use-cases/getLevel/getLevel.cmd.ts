import { Course } from '@funcode/shared';

export interface GetLevelCmd {
    course: Course;
    module: string;
    level: number;
}
