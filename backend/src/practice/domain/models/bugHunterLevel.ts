import { PracticeProgrammingLanguage } from '../types/practiceProgrammingLanguages';

export type BugHunterLevel = {
    gameMode: 'bug-hunter',
    levelNumber: number,
    description: string,
    initialCode: string,
    language: PracticeProgrammingLanguage,
    tests: string,
}