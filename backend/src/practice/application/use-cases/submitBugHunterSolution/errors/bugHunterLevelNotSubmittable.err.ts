import { AppError } from '../../../../../common/app.error';
import { ERROR_CODES } from '@funcode/shared';

export class BugHunterLevelNotSubmittableError extends AppError {
    constructor() {
        super(
            ERROR_CODES.BUG_HUNTER_LEVEL_NOT_SUBMITTABLE,
            'This Bug Hunter level cannot be submitted.'
        );
    }
}