import { Course } from '../enums/index.js';

export interface GetLevelReq {
    course: Course,
    module: string,
    level: number,
}
