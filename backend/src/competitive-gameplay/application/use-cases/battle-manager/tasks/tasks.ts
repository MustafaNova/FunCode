enum Difficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard',
}

export interface Task {
    name: string;
    difficulty: Difficulty;
    description: string;
    examples: string[];
    constraints: string;
}

export const tasks: Task[] = [
    {
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
