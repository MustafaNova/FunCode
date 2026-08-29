import { PracticeProgrammingLanguage } from '@funcode/shared';

export type BugHunterLevel = {
    gameMode: 'bug-hunter',
    levelNumber: number,
    description: string,
    initialCode: string,
    language: PracticeProgrammingLanguage,
    tests: string,
}