import { AppError } from '../../../../../common/app.error';
import { ERROR_CODES } from '@funcode/shared';

export class UsernameAlreadyExistsError extends AppError {
    constructor() {
        super(
            ERROR_CODES.USERNAME_ALREADY_EXISTS,
            'Username already exists'
        );
    }
}
