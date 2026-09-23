import { BugHunterTaskRepositoryPort } from '../../../application/ports/outbound/bugHunter.task.repository.port';
import { Injectable } from '@nestjs/common';
import { BugHunterTaskMap } from '../../../domain/types/bugHunterTaskMap';

@Injectable()
export class BugHunterTaskRepositoryAdapter implements BugHunterTaskRepositoryPort {

    private readonly tasks: BugHunterTaskMap = {
        'bug-001': {
            task: {
                id: 'bug-001',
                name: 'Broken Add Digits',
                functionName: 'addDigits',
                description: 'Find and fix the hidden bug',
                language: 'javascript',
                code: `
function addDigits(num) {
    let sum = 0;

    while (num > 0) {
        sum += num % 10;
        num = Math.floor(num / 10);
    }

    return sum;
}
                `.trim(),
            },
            tests: [
                { input: [38], expectedOutput: 2 },
                { input: [99], expectedOutput: 9 },
                { input: [123], expectedOutput: 6 },
            ],
        },
    };

    getById(taskId: string) {
        return this.tasks[taskId] ?? null;
    }

    getRandomTask() {
        const tasks = Object.values(this.tasks);
        return tasks[Math.floor(Math.random() * tasks.length)].task;
    }

}