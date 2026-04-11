import { PlayerProgress } from '../../use-cases/getPlayerProgress/progress.res';

export interface GetPlayerProgressPort {
    getPlayerProgress(userId: string): Promise<PlayerProgress>;
}
