import { AppError } from '../../../../../common/app.error';
import { ERROR_CODES } from '@funcode/shared';

export class UserNotFoundError extends AppError {
    constructor(userId: string) {
        super(
            ERROR_CODES.USER_NOT_FOUND,
            `User with id "${userId}" was not found.`
        );
    }
}