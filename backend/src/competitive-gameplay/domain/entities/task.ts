import { Difficulty } from '../value-objects/difficulty.vo';

export interface Task {
    id: string;
    name: string;
    difficulty: Difficulty;
    description: string;
    examples: string[];
    constraints: string;
    starterCode: string;
}

export interface TaskTest<Input = any, Output = any> {
    input: Input;
    expectedOutput: Output;
}
