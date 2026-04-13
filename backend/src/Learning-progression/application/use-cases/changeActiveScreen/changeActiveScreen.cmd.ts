import { Course } from '@funcode/shared';

export class ChangeActiveScreenCmd {
    private constructor(
        public readonly userId: string,
        public readonly course: Course,
        public readonly module: string,
    ) {}

    static create(userId: string, course: Course, module: string) {
        return new ChangeActiveScreenCmd(userId, course, module);
    }
}
