import { AppError } from '../../../../../common/app.error';
import { ERROR_CODES } from '@funcode/shared';

export class InviteCodeNotFound extends AppError {
    constructor() {
        super(
            ERROR_CODES.INVITE_CODE_NOT_FOUND,
            'invalid InviteCode'
        );
    }
}