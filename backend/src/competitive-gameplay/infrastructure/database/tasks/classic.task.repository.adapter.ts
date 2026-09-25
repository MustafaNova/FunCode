import { ClassicTaskRepositoryPort } from '../../../application/ports/outbound/task-repositories/classic.task.repository.port';
import { Injectable } from '@nestjs/common';
import { ClassicTaskMap } from '../../../domain/types/taskMaps/classicTaskMap';
import { getRandomItem } from '../../../../common/utils/getRandomItem';
import { ClassicTask } from '../../../domain/types/tasks/classicTask';

@Injectable()
export class ClassicTaskRepositoryAdapter implements ClassicTaskRepositoryPort {
    private readonly tasks: ClassicTaskMap = {
        '123456789': {
            task: {
                id: '123456789',
                name: 'Add Digits',
                functionName: 'addDigits',
                language: 'javascript',
                description:
                    'Given an integer num, repeatedly add all its digits until the result has only one digit, and return it.',
                examples: [
                    'Input: num = 38 → Output: 2\nExplanation: 38 → 3 + 8 = 11 → 1 + 1 = 2',
                    'Input: num = 0 → Output: 0',
                ],
                constraints: '0 <= num <= 2^31 - 1',
                starterCode: `function addDigits(num) {
            // TODO: implement solution
            return 0;
        }`,
            },
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

    getById(taskId: string) {
        return this.tasks[taskId] ?? null;
    }

    getRandomTask(): ClassicTask {
        return getRandomItem(Object.values(this.tasks)).task;
    }

}
