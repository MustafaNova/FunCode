import { GetPlayerProgressPort } from '../../ports/inbound/getPlayerProgress.port';
import { PlayerProgress } from '../../../domain/entities/player.progress';

export class GetPlayerProgressUC implements GetPlayerProgressPort {
    getPlayerProgress(userId: string): Promise<PlayerProgress> {
        const test: PlayerProgress = {
            userId: userId,
            course: 'testCourse',
            module: 'testModule',
            unlockedLevel: 1,
        };
        return Promise.resolve(test);
    }
}
