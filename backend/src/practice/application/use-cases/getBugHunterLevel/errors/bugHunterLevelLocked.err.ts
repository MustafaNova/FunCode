import { AppError } from '../../../../../common/app.error';
import { ERROR_CODES } from '@funcode/shared';

export class BugHunterLevelLockedError extends AppError {
    constructor() {
        super(
            ERROR_CODES.BUG_HUNTER_LEVEL_LOCKED,
            'Bug Hunter level is locked'
        );
    }
}