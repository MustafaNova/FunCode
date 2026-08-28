import { PracticeProgrammingLanguage } from '../../../../domain/types/practiceProgrammingLanguages';

export type BugHunterLevelContent = {
    gameMode: 'bug-hunter',
    levelNumber: number,
    description: string,
    initialCode: string,
    language: PracticeProgrammingLanguage,
};