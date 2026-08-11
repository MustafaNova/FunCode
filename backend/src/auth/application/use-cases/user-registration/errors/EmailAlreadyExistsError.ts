import { AppError } from '../../../../../common/app.error';
import { ERROR_CODES } from '@funcode/shared';

export class EmailAlreadyExistsError extends AppError {
    constructor() {
        super(
            ERROR_CODES.EMAIL_ALREADY_EXISTS,
            'Email already exists'
        );
    }
}
