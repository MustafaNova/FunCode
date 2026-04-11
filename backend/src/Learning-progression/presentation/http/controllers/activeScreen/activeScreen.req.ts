import { Course } from '../../../../domain/enums';
import { IsEnum, IsString } from 'class-validator';

export class ActiveScreenReq {
    @IsEnum(Course)
    course: Course;

    @IsString()
    module: string;
}
