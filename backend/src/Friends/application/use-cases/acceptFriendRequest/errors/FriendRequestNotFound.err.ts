import { AppError } from '../../../../../common/app.error';
import { ERROR_CODES } from '@funcode/shared';

export class FriendRequestNotFoundError extends AppError {
    constructor(friendRequestId: string) {
        super(
            ERROR_CODES.FRIEND_REQUEST_NOT_FOUND,
            `Friend request with id ${friendRequestId} was not found.`
        );
    }
}