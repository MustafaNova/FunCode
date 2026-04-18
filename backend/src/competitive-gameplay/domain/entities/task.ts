import { Difficulty } from '@funcode/shared';

export interface Task {
    id: string;
    name: string;
    functionName: string;
    difficulty: Difficulty;
    description: string;
    examples: string[];
    constraints: string;
    starterCode: string;
}

export interface TaskTest<
    Input extends unknown[] = unknown[],
    Output = unknown,
> {
    input: Input;
    expectedOutput: Output;
}
