import { Course } from '@funcode/shared';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class StartCourseReq {
    @IsEnum(Course)
    course: Course;
}
