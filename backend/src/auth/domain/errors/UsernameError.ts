import { ERROR_CODES } from '@funcode/shared';
import { AppError } from '../../../common/app.error';

export class UsernameError extends AppError {
    constructor(message: string) {
        super(
            ERROR_CODES.INVALID_USERNAME,
            message
        );
    }
}
