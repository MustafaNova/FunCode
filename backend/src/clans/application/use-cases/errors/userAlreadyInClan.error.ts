import { AppError } from '../../../../common/app.error';
import { ERROR_CODES } from '@funcode/shared';

export class UserAlreadyInClanError extends AppError {
    constructor() {
        super(
            ERROR_CODES.USER_ALREADY_IN_CLAN,
            'User is already in clan'
        );
    }
}