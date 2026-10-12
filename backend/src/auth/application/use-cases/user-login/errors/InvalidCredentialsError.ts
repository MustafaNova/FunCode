import { AppError } from '../../../../../common/app.error';
import { ERROR_CODES } from '@funcode/shared';

export class InvalidCredentialsError extends AppError {
    constructor() {
        super(
            ERROR_CODES.INVALID_CREDENTIALS,
            'Invalid credentials'
        );
    }
}
