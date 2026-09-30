import { BugHunterTaskDto, ClassicTaskDto, CodeGolfTaskDto } from '../dtos/index.js';

export type ClassicBattleStartedPayload = {
    task: ClassicTaskDto;
};

export type BugHunterBattleStartedPayload = {
    task: BugHunterTaskDto;
};

export type CodeGolfBattleStartedPayload = {
    task: CodeGolfTaskDto;
    endsAt: number;
};


export type BattleStartedPayload =
    | ClassicBattleStartedPayload
    | BugHunterBattleStartedPayload
    | CodeGolfBattleStartedPayload;