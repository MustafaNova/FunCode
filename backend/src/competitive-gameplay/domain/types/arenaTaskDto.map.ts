import { BugHunterTaskDto, ClassicTaskDto, CodeGolfTaskDto } from '@funcode/shared';

export type ArenaTaskDtoMap = {
    'classic-unranked-1v1': ClassicTaskDto;
    'code-golf-unranked-1v1': CodeGolfTaskDto;
    'bug-hunter-unranked-1v1': BugHunterTaskDto;
};