enum Difficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard',
}

export interface Task {
    id: string;
    name: string;
    difficulty: Difficulty;
    description: string;
    examples: string[];
    constraints: string;
}

export interface TaskTest<Input = any, Output = any> {
    input: Input;
    expectedOutput: Output;
}

export const tasks: Task[] = [
    {
        id: '123456789',
        name: 'Add Digits',
        difficulty: Difficulty.EASY,
        description:
            'Given an integer num, repeatedly add all its digits until the result has only one digit, and return it.',
        examples: [
            'Input: num = 38 → Output: 2\nExplanation: 38 → 3 + 8 = 11 → 1 + 1 = 2',
            'Input: num = 0 → Output: 0',
        ],
        constraints: '0 <= num <= 2^31 - 1',
    },
];

export const taskTests: Record<string, TaskTest<any, any>[]> = {
    '123456789': [
        { input: 0, expectedOutput: 0 },
        { input: 5, expectedOutput: 5 },
        { input: 9, expectedOutput: 9 },
        { input: 10, expectedOutput: 1 },
        { input: 11, expectedOutput: 2 },
        { input: 38, expectedOutput: 2 },
        { input: 123, expectedOutput: 6 },
        { input: 99, expectedOutput: 9 },
        { input: 1234, expectedOutput: 1 },
        { input: 9876, expectedOutput: 3 },
    ],
};
