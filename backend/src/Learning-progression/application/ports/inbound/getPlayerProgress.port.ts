import { PlayerProgress } from '../../../domain/entities/player.progress';

export interface GetPlayerProgressPort {
    getPlayerProgress(userId: string): Promise<PlayerProgress>;
}
