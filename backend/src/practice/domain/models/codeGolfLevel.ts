import { PracticeProgrammingLanguage } from '../types/practiceProgrammingLanguages';

export type CodeGolfLevel = {
    gameMode: 'code-golf',
    levelNumber: number,
    description: string,
    initialCode: string,
    maxCharacters: number,
    language: PracticeProgrammingLanguage,
    tests: string,
}