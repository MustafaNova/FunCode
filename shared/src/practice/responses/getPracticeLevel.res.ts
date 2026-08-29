import { PracticeProgrammingLanguage } from '../types/index.js';


export type BugHunterLevelRes = {
    gameMode: 'bug-hunter',
    levelNumber: number,
    description: string,
    initialCode: string,
    language: PracticeProgrammingLanguage,
};


export type CodeGolfLevelRes = {
    gameMode: 'code-golf',
    levelNumber: number,
    description: string,
    initialCode: string,
    maxCharacters: number,
    language: PracticeProgrammingLanguage,
};

export type PracticeLevelResponseByMode = {
    'bug-hunter': BugHunterLevelRes;
    'code-golf': CodeGolfLevelRes;
};

export type GetPracticeLevelRes = BugHunterLevelRes | CodeGolfLevelRes;