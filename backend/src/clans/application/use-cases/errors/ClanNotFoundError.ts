import { AppError } from '../../../../common/app.error';
import { ERROR_CODES } from '@funcode/shared';

export class ClanNotFoundError extends AppError {
    constructor() {
        super(
            ERROR_CODES.CLAN_NOT_FOUND,
            'Clan does not exists'
        );

    }

}