import { BugHunterTaskDto, ClassicTaskDto, CodeGolfTaskDto } from '@funcode/shared';

export interface ArenaTaskProviderPort {
    getRandomTaskDto(
        gameModeId: 'classic-unranked-1v1',
    ): ClassicTaskDto;

    getRandomTaskDto(
        gameModeId: 'bug-hunter-unranked-1v1',
    ): BugHunterTaskDto;

    getRandomTaskDto(
        gameModeId: 'code-golf-unranked-1v1',
    ): CodeGolfTaskDto;
}