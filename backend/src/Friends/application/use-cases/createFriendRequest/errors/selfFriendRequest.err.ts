import { AppError } from '../../../../../common/app.error';
import { ERROR_CODES } from '@funcode/shared';

export class SelfFriendRequestError extends AppError {
    constructor() {
        super(
            ERROR_CODES.SELF_FRIEND_REQUEST,
            'You cannot send a friendRequest to yourself',
        );
    }
}