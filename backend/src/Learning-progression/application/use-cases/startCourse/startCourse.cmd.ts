import { Course } from '@funcode/shared';

export class StartCourseCmd {
    private constructor(
        public readonly userId: string,
        public readonly course: Course,
    ) {}

    static create(userId: string, course: Course) {
        return new StartCourseCmd(userId, course);
    }
}
