import { AppError } from '../../../../../common/app.error';
import { ERROR_CODES } from '@funcode/shared';


export class BugHunterLevelNotFoundError extends AppError {
    constructor() {
        super(
            ERROR_CODES.BUG_HUNTER_LEVEL_NOT_FOUND,
            'Bug Hunter Level doesnt exist'
        );
    }
}