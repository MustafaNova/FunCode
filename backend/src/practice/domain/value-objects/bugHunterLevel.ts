import { BugHunterLanguages } from './bugHunterLanguages';

export type BugHunterLevel = {
    levelNumber: number,
    description: string,
    initialCode: string,
    language: BugHunterLanguages,
    tests: string,
}