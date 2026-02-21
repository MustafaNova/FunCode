import { tasks, taskTestMap, taskTests } from './tasks';
import { Injectable } from '@nestjs/common';
import { TaskIdError } from '../errors/task.id.err';
import { SolutionError } from '../errors/solution.err';
import vm from 'vm';
import { UserCodeError } from '../errors/usercode.err';

interface Sandbox {
    args: unknown[] | null;
    result: unknown;
    [key: string]: any;
}

@Injectable()
class TaskService {
    getRandomTask() {
        return tasks[0];
    }

    checkSubmit(taskId: string, solution: string) {
        if (!(taskId in taskTests)) {
            console.log('taskId Error');
            throw new TaskIdError();
        }
        if (!solution) {
            console.log('solution Error');
            throw new SolutionError();
        }
        return this.runUserCode(taskId, solution);
    }

    private runUserCode(taskId: string, solution: string) {
        const taskTest = taskTests[taskId as keyof taskTestMap];
        const sandbox: Sandbox = { args: null, result: null };

        try {
            const script = new vm.Script(solution);
            const context = vm.createContext(sandbox);
            script.runInContext(context);
        } catch (err) {
            throw new UserCodeError((err as Error).message);
        }

        for (const test of taskTest.tests) {
            sandbox.args = test.input;
            const func = sandbox[taskTest.functionName] as (
                ...args: any[]
            ) => any;
            sandbox.result = func(...sandbox.args);
            if (sandbox.result !== test.expectedOutput) {
                return false;
            }
        }
        return true;
    }
}

export default TaskService;
