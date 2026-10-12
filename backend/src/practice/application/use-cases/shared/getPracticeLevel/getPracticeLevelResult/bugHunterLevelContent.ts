import { PracticeProgrammingLanguage } from '@funcode/shared';

export type BugHunterLevelContent = {
    gameMode: 'bug-hunter',
    levelNumber: number,
    description: string,
    initialCode: string,
    language: PracticeProgrammingLanguage,
};