import { AppError } from '../../../../../../common/app.error';
import { ERROR_CODES } from '@funcode/shared';

export class TaskIdError extends AppError {
    constructor() {
        super(
            ERROR_CODES.TASK_NOT_FOUND,
            'Task not found'
        );
    }
}
