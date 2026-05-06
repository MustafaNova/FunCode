import { Course } from '../enums/index.js';

export interface ValidateLevelTaskReq {
    taskId: string;
    code: string;
    course: string;
    module: string;
}
