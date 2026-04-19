import { Course } from '@funcode/shared';

export class GetLevelCmd {
    private constructor(
        public readonly course: Course,
        public readonly module: string,
        public readonly level: number,
    ) {}

    static create(course: Course, module: string, level: number) {
        return new GetLevelCmd(course, module, level);
    }
}
