import { GetPlayerProgressPort } from '../../ports/inbound/getPlayerProgress.port';
import { PlayerProgress } from './progress.res';
import { Course } from '../../../domain/enums';

export class GetPlayerProgressUC implements GetPlayerProgressPort {
    getPlayerProgress(userId: string): Promise<PlayerProgress> {
        return Promise.resolve({
            course: Course.FullStack,
            module: 'test',
            unlockedLevel: 1,
        });
    }
}
