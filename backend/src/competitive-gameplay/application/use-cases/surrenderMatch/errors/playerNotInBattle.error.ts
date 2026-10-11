import { AppError } from '../../../../../common/app.error';
import { ERROR_CODES } from '@funcode/shared';

export class PlayerNotInBattleError extends AppError {
    constructor() {
        super(
            ERROR_CODES.PLAYER_NOT_IN_BATTLE,
            'Player not in this battle'
        );
    }
}