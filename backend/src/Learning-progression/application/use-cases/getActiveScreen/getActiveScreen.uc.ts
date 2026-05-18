import { GetActiveScreenPort } from '../../ports/inbound/getActiveScreen.port';
import { GetActiveScreenRes } from './getActiveScreen.res';
import { ActiveScreenRepositoryPort } from '../../ports/outbound/activeScreenRepository.port';

export class GetActiveScreenUC implements GetActiveScreenPort {
    constructor(
        private readonly activeScreenRepo: ActiveScreenRepositoryPort,
    ) {}

    async getActiveScreen(userId: string): Promise<GetActiveScreenRes> {
        const res = await this.activeScreenRepo.findByUserId(userId);
        return {
            course: res.course,
            module: res.module,
            unlockedLevel: res.unlockedLevel,
        };
    }
}
