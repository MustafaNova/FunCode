import { tasks, taskTestMap, taskTests } from './tasks';
import { Injectable } from '@nestjs/common';
import { TaskIdError } from '../errors/task.id.err';
import { SolutionError } from '../errors/solution.err';
import vm from 'vm';

@Injectable()
export class TaskService {
    getRandomTask() {
        return tasks[0];
    }

    checkSubmit(taskId: string, solution: string) {
        if (!(taskId in taskTests)) {
            throw new TaskIdError();
        }
        if (!solution) {
            throw new SolutionError();
        }
        const tests = taskTests[taskId as keyof taskTestMap];
        for (const test of tests) {
            const userRes = this.runUserCode(solution, test.input);
            if (userRes !== test.expectedOutput) {
                return false;
            }
        }
        return true;
    }

    private runUserCode(code: string, params: Record<string, any>): unknown {
        const sandbox = { ...params };
        const script = new vm.Script(code);
        const context = vm.createContext(sandbox);
        return script.runInContext(context);
    }
}
