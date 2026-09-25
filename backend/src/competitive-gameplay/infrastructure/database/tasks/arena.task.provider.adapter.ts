import { ArenaTaskProviderPort } from '../../../application/ports/outbound/arena.task.provider.port';
import { ArenaGameModeId, ArenaTaskDto } from '@funcode/shared';
import { Inject, Injectable } from '@nestjs/common';
import { type BugHunterTaskRepositoryPort } from '../../../application/ports/outbound/task-repositories/bugHunter.task.repository.port';
import { type ClassicTaskRepositoryPort } from '../../../application/ports/outbound/task-repositories/classic.task.repository.port';
import { BUG_HUNTER_TASK_REPOSITORY_PORT, CLASSIC_TASK_REPOSITORY_PORT, CODE_GOLF_TASK_REPOSITORY_PORT } from '../tokens';
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
        @Inject(CODE_GOLF_TASK_REPOSITORY_PORT)
        private readonly codeGolfTaskRepo: CodeGolfTaskRepositoryPort
    ) {}

    getRandomTaskDto(gameModeId: ArenaGameModeId): ArenaTaskDto {
        switch (gameModeId) {
            case 'bug-hunter-unranked-1v1':
                const bugHunterTask = this.bugHunterTaskRepo.getRandomTask();
                return {
                    id: bugHunterTask.id,
                    name: bugHunterTask.name,
                    description: bugHunterTask.description,
                    code: bugHunterTask.code,
                };

            case 'classic-unranked-1v1':
                const classicTask = this.classicTaskRepo.getRandomTask();
                return {
                    id: classicTask.id,
                    name: classicTask.name,
                    language: classicTask.language,
                    description: classicTask.description,
                    examples: classicTask.examples,
                    constraints: classicTask.constraints,
                    starterCode: classicTask.starterCode,
                };

            case 'code-golf-unranked-1v1':
                const codeGolfTask = this.codeGolfTaskRepo.getRandomTask();
                return {
                    id: codeGolfTask.id,
                    name: codeGolfTask.name,
                    description: codeGolfTask.description,
                    language: codeGolfTask.language,
                    code: codeGolfTask.code,
                    characterLimit: codeGolfTask.characterLimit,
                };
        }
    }
}
