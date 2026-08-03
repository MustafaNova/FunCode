import { AppError } from '../../../../../common/app.error';
import { ERROR_CODES } from '@funcode/shared';

export class BugHunterProgressNotFoundError extends AppError {
    constructor() {
        super(
            ERROR_CODES.INTERNAL_SERVER_ERROR,
            'BugHunterProgress not found'
        );
    }
}