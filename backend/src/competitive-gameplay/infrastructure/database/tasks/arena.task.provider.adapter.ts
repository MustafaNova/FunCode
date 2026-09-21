import { ArenaTaskProviderPort } from '../../../application/ports/outbound/arena.task.provider.port';
import { ArenaGameModeId, ArenaTask } from '@funcode/shared';
import { Inject, Injectable } from '@nestjs/common';
import { type BugHunterTaskRepositoryPort } from '../../../application/ports/outbound/bugHunter.task.repository.port';
import { type ClassicTaskRepositoryPort } from '../../../application/ports/outbound/classic.task.repository.port';
import { BUG_HUNTER_TASK_REPOSITORY_PORT, CLASSIC_TASK_REPOSITORY_PORT } from '../tokens';

@Injectable()
export class ArenaTaskProviderAdapter implements ArenaTaskProviderPort {
    constructor(
        @Inject(BUG_HUNTER_TASK_REPOSITORY_PORT)
        private readonly bugHunterTaskRepo: BugHunterTaskRepositoryPort,
        @Inject(CLASSIC_TASK_REPOSITORY_PORT)
        private readonly classicTaskRepo: ClassicTaskRepositoryPort
    ) {}

    getRandomTask(gameModeId: ArenaGameModeId): ArenaTask {
        switch (gameModeId) {
            case 'bug-hunter-unranked-1v1':
                return this.bugHunterTaskRepo.getRandomTask();

            case 'classic-unranked-1v1':
                return this.classicTaskRepo.getRandomTask();

            case 'code-golf-unranked-1v1':
                return this.classicTaskRepo.getRandomTask()
        }
    }
}