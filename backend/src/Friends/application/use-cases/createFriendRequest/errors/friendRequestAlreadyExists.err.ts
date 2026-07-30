import { AppError } from '../../../../../common/app.error';
import { ERROR_CODES } from '@funcode/shared';

export class FriendRequestAlreadyExistsError extends AppError {
    constructor() {
        super(
            ERROR_CODES.FRIENDSHIP_ALREADY_EXISTS,
            'FriendRequest already exists'
        );
    }
}