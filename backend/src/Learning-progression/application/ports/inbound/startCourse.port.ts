import { StartCourseCmd } from '../../use-cases/startCourse/startCourse.cmd';

export interface StartCoursePort {
    execute(cmd: StartCourseCmd): Promise<void>;
}
