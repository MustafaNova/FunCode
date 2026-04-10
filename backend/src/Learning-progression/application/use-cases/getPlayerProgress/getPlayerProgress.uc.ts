import { GetPlayerProgressPort } from '../../ports/inbound/getPlayerProgress.port';
import { PlayerProgress } from './progress.res';

export class GetPlayerProgressUC implements GetPlayerProgressPort {
    getPlayerProgress(userId: string): Promise<PlayerProgress> {

    }
}
