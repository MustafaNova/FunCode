import { AppError } from '../../../../../common/app.error';
import { ERROR_CODES } from '@funcode/shared';

export class FriendRequestAccessDeniedError extends AppError {
    constructor() {
        super(
            ERROR_CODES.FRIEND_REQUEST_ACCESS_DENIED,
            'You are not allowed to accept this friend request'
        );
    }
}