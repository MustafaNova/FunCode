import { ArenaTaskProviderPort } from '../../../application/ports/outbound/arena.task.provider.port';
import { ArenaGameModeId, ArenaTask } from '@funcode/shared';
import { Inject, Injectable } from '@nestjs/common';
import { type BugHunterTaskRepositoryPort } from '../../../application/ports/outbound/task-repositories/bugHunter.task.repository.port';
import { type ClassicTaskRepositoryPort } from '../../../application/ports/outbound/task-repositories/classic.task.repository.port';
import { BUG_HUNTER_TASK_REPOSITORY_PORT, CLASSIC_TASK_REPOSITORY_PORT, CODE_GOLF_REPOSITORY_PORT } from '../tokens';
import {
    type CodeGolfTaskRepositoryPort
} from '../../../application/ports/outbound/task-repositories/codeGolf.task.repository.port';

@Injectable()
export class ArenaTaskProviderAdapter implements ArenaTaskProviderPort {
    constructor(
        @Inject(BUG_HUNTER_TASK_REPOSITORY_PORT)
        private readonly bugHunterTaskRepo: BugHunterTaskRepositoryPort,
        @Inject(CLASSIC_TASK_REPOSITORY_PORT)
        private readonly classicTaskRepo: ClassicTaskRepositoryPort,
        @Inject(CODE_GOLF_REPOSITORY_PORT)
        private readonly codeGolfTaskRepo: CodeGolfTaskRepositoryPort
    ) {}

    getRandomTask(gameModeId: ArenaGameModeId): ArenaTask {
        switch (gameModeId) {
            case 'bug-hunter-unranked-1v1':
                return this.bugHunterTaskRepo.getRandomTask();

            case 'classic-unranked-1v1':
                return this.classicTaskRepo.getRandomTask();

            case 'code-golf-unranked-1v1':
                return this.codeGolfTaskRepo.getRandomTask()
        }
    }
}