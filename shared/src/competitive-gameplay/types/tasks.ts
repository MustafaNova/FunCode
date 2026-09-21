import { Difficulty } from '../enums/index.js';

export type ClassicTask = {
    id: string;
    name: string;
    functionName: string;
    difficulty: Difficulty;
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

export type ArenaTask = ClassicTask | BugHunterTask