import { AppError } from '../../../../../common/app.error';
import { ERROR_CODES } from '@funcode/shared';

export class PracticeLevelLockedError extends AppError {
    constructor() {
        super(
            ERROR_CODES.PRACTICE_LEVEL_LOCKED,
            'You cannot access this level'
        );
    }
}