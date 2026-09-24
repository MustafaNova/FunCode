import { Difficulty } from '../enums/index.js';

export type ClassicTask = {
    id: string;
    name: string;
    functionName: string;
    difficulty: Difficulty;
    language: 'javascript';
    description: string;
    examples: string[];
    constraints: string;
    starterCode: string;
}


export type BugHunterTask = {
    id: string,
    name: string,
    description: string,
    code: string,
}

export type CodeGolfTask = {
    id: string,
    name: string
    description: string,
    language: 'javascript',
    code: string,
    characterLimit: number
}

export type ArenaTask = ClassicTask | BugHunterTask | CodeGolfTask