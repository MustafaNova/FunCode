import { AppError } from '../../../../common/app.error';
import { ERROR_CODES } from '@funcode/shared';

export class InvalidMessageError extends AppError {
    constructor() {
        super(
            ERROR_CODES.INVALID_MATCH_MESSAGE,
            'Invalid match message'
        );
    }
}