import { AppError } from '../../../../common/app.error';
import { ERROR_CODES } from '@funcode/shared';

export class ClanNameAlreadyExistsError extends AppError {
    constructor() {
        super(
            ERROR_CODES.CLAN_NAME_ALREADY_EXISTS,
            'Clan name already exists'
        );
    }
}
