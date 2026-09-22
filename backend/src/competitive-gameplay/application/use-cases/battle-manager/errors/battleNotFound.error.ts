import { AppError } from '../../../../../common/app.error';
import { ERROR_CODES } from '@funcode/shared';


export class BattleNotFoundError extends AppError {
    constructor() {
        super(
            ERROR_CODES.BATTLE_NOT_FOUND,
            'Battle not found'
        );
    }
}