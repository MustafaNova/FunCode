import { ChallengeRepositoryPort } from '../../../application/ports/outbound/challenge.repository.port';
import { Task, TaskTest } from '../../../domain/entities/task';
import { Difficulty } from '../../../domain/value-objects/difficulty.vo';
import { Injectable } from '@nestjs/common';


@Injectable()
export class ChallengeRepositoryAdapter implements ChallengeRepositoryPort {
    private tasks: Task[] = [
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
            starterCode: `function addDigits(num: number): number {
            // TODO: implement solution
            return 0;
        }`,
        },
    ];

    private taskTests: taskTestMap = {
        '123456789': {
            functionName: 'addDigits',
            tests: [
                { input: [0], expectedOutput: 0 },
                { input: [5], expectedOutput: 5 },
                { input: [9], expectedOutput: 9 },
                { input: [10], expectedOutput: 1 },
                { input: [11], expectedOutput: 2 },
                { input: [38], expectedOutput: 2 },
                { input: [123], expectedOutput: 6 },
                { input: [99], expectedOutput: 9 },
                { input: [1234], expectedOutput: 1 },
                { input: [9876], expectedOutput: 3 },
            ],
        },
    };

    exists(taskId: string): boolean {
        return true;
    }

    getRandomTask() {}

    getTests<K extends keyof taskTestMap>(taskId: K): taskTestMap[K] {
        return this.taskTests[taskId];
    }
}
