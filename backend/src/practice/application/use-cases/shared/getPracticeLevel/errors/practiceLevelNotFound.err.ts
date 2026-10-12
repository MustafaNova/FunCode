import { AppError } from '../../../../../../common/app.error';
import { ERROR_CODES } from '@funcode/shared';

export class PracticeLevelNotFoundError extends AppError {
    constructor() {
        super(
            ERROR_CODES.PRACTICE_LEVEL_NOT_FOUND,
            'Level doesnt exist'
        );
    }
}