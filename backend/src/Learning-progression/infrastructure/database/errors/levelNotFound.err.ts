import { AppError } from '../../../../common/app.error';
import { ERROR_CODES } from '@funcode/shared';

export class LevelNotFoundException extends AppError {
    constructor() {
        super(
            ERROR_CODES.LEVEL_NOT_FOUND,
            'Level not found'
        );
    }
}
