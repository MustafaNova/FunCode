import { AppError } from '../../../../../common/app.error';
import { ERROR_CODES } from '@funcode/shared';

export class FriendshipNotFoundError extends AppError {
    constructor() {
        super(
            ERROR_CODES.FRIENDSHIP_NOT_FOUND,
            'Friendship not found'
        );
    }
}