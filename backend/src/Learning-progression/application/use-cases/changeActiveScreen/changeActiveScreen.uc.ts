import { ChangeActiveScreenPort } from '../../ports/inbound/changeActiveScreen.port';
import { ChangeActiveScreenCmd } from './changeActiveScreen.cmd';
import { ActiveScreenRepositoryPort } from '../../ports/outbound/activeScreenRepository.port';

export class ChangeActiveScreenUc implements ChangeActiveScreenPort {
    constructor(
        private readonly activeScreenRepo: ActiveScreenRepositoryPort,
    ) {}

    async execute(cmd: ChangeActiveScreenCmd): Promise<void> {
        await this.activeScreenRepo.updateActiveScreen(
            cmd.userId,
            cmd.course,
            cmd.module,
        );
    }
}
