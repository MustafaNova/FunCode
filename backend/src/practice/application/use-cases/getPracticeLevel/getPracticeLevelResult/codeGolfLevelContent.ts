import { PracticeProgrammingLanguage } from '../../../../domain/types/practiceProgrammingLanguages';

export type CodeGolfLevelContent = {
    gameMode: 'code-golf',
    levelNumber: number,
    description: string,
    initialCode: string,
    maxCharacters: number,
    language: PracticeProgrammingLanguage,
};