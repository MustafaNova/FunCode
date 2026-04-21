import { Difficulty } from '../enums/index.js';

export interface TaskDto {
    id: string;
    name: string;
    functionName: string;
    difficulty: Difficulty;
    description: string;
    examples: string[];
    constraints: string;
    starterCode: string;
}