import { AppError } from '../../../../../../common/app.error';
import { ERROR_CODES } from '@funcode/shared';

export class UserCodeError extends AppError {
    constructor() {
        super(
            ERROR_CODES.USER_CODE_EXECUTION_FAILED,
            'User code execution failed'
        );
    }
}
