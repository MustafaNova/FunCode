import { BugHunterTaskDto, ClassicTaskDto, CodeGolfTaskDto } from '../dtos/index.js';

export type ClassicBattleStartedPayload = {
    task: ClassicTaskDto;
};

export type BugHunterBattleStartedPayload = {
    task: BugHunterTaskDto;
};

export type CodeGolfBattleStartedPayload = {
    task: CodeGolfTaskDto;
    preparationEndsAt: number,
    matchEndsAt: number;
};


export type BattleStartedPayload =
    | ClassicBattleStartedPayload
    | BugHunterBattleStartedPayload
    | CodeGolfBattleStartedPayload;