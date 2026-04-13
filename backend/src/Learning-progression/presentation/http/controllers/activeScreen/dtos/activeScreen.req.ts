import { Course } from '@funcode/shared';
import { IsEnum, IsString } from 'class-validator';

export class ActiveScreenReq {
    @IsEnum(Course)
    course: Course;

    @IsString()
    module: string;
}
