import {
    CodeGolfTaskRepositoryPort
} from '../../../application/ports/outbound/task-repositories/codeGolf.task.repository.port';
import { Injectable } from '@nestjs/common';
import { CodeGolfTaskEntry, CodeGolfTaskMap } from '../../../domain/types/taskMaps/codeGolfTaskMap';
import { getRandomItem } from '../../../../common/utils/getRandomItem';
import { CodeGolfTask } from '../../../domain/types/tasks/codeGolfTask';

@Injectable()
export class CodeGolfTaskRepositoryAdapter implements CodeGolfTaskRepositoryPort {

    private readonly tasks: CodeGolfTaskMap = {
        'code-golf-001': {
            task: {
                id: 'code-golf-001',
                name: 'Palindrome',
                functionName: 'isPalindrome',
                description: 'Shorten the code so it stays within the character limit while still passing all tests',
                language: 'javascript',
                code: `
function isPalindrome(text) {
    const characters = text.split('');
    const reversedCharacters = characters.reverse();
    const reversedText = reversedCharacters.join('');

    if (text === reversedText) {
        return true;
    } else {
        return false;
    }
}
        `.trim(),
                characterLimit: 80,
            },
            tests: [
                { input: ['racecar'], expectedOutput: true },
                { input: ['level'], expectedOutput: true },
                { input: ['hello'], expectedOutput: false },
                { input: ['a'], expectedOutput: true },
                { input: ['abba'], expectedOutput: true },
                { input: ['abc'], expectedOutput: false },
            ],
        },
    };

    getRandomTask(): CodeGolfTask {
        return getRandomItem(Object.values(this.tasks)).task;
    }

    getById(taskId: string): CodeGolfTaskEntry | null {
        return this.tasks[taskId] ?? null;
    }
}
