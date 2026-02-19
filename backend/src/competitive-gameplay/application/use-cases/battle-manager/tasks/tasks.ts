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

export type taskTestMap = {
    '123456789': TaskTest<Record<string, number>, number>[];
};

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

export const taskTests: taskTestMap = {
    '123456789': [
        { input: { num: 0 }, expectedOutput: 0 },
        { input: { num: 5 }, expectedOutput: 5 },
        { input: { num: 9 }, expectedOutput: 9 },
        { input: { num: 10 }, expectedOutput: 1 },
        { input: { num: 11 }, expectedOutput: 2 },
        { input: { num: 38 }, expectedOutput: 2 },
        { input: { num: 123 }, expectedOutput: 6 },
        { input: { num: 99 }, expectedOutput: 9 },
        { input: { num: 1234 }, expectedOutput: 1 },
        { input: { num: 9876 }, expectedOutput: 3 },
    ],
};
