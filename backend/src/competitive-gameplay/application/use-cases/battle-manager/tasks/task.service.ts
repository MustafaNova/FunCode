import { tasks, taskTestMap, taskTests } from './tasks';
import { Injectable } from '@nestjs/common';
import { TaskIdError } from '../errors/task.id.err';

@Injectable()
export class TaskService {
    getRandomTask() {
        return tasks[0];
    }

    checkSubmit(taskId: string, solution: string) {
        if (!(taskId in taskTests)) {
            throw new TaskIdError();
        }
        const tests = taskTests[taskId as keyof taskTestMap];
    }
}
