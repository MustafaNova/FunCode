import { AppError } from '../../../common/app.error';
import { ERROR_CODES } from '@funcode/shared';

export class EmailError extends AppError {
    constructor(message: string) {
        super(
            ERROR_CODES.INVALID_EMAIL,
            message
        );
    }
}
