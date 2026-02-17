import { ErrorCodes } from '../../../../../common/error.codes';

export class TaskIdError extends Error {
    code: number;
    constructor() {
        super('TaskId not found');
        this.code = ErrorCodes.TASK_ID_NOT_FOUND;
    }
}
