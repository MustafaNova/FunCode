import { Course, GetLevelReq } from '@funcode/shared';
import { IsEnum, IsInt, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetLevelDto implements GetLevelReq {
    @IsEnum(Course)
    course: Course;

    @IsString()
    module: string;

    @Type(() => Number)
    @IsInt()
    level: number;
}
