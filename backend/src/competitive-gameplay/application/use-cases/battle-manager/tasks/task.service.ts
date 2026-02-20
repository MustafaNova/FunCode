import { tasks, taskTestMap, taskTests } from './tasks';
import { Injectable } from '@nestjs/common';
import { TaskIdError } from '../errors/task.id.err';
import { SolutionError } from '../errors/solution.err';
import vm from 'vm';

interface Sandbox {
    args: any[] | null;
    result: any;
}

@Injectable()
class TaskService {
    getRandomTask() {
        return tasks[0];
    }

    checkSubmit(taskId: string, solution: string) {
        console.log(`checkSubmit: ${solution}`);
        if (!(taskId in taskTests)) {
            console.log('taskId Error');
            throw new TaskIdError();
        }
        if (!solution) {
            console.log('solution Error');
            throw new SolutionError();
        }
        const taskTest = taskTests[taskId as keyof taskTestMap];

        const sandbox: Sandbox = { args: null, result: null };
        const script = new vm.Script(solution);
        const context = vm.createContext(sandbox);
        script.runInContext(context);

        for (const test of taskTest.tests) {
            sandbox.args = test.input;
            sandbox.result = sandbox[taskTest.functionName].apply(
                null,
                sandbox.args,
            );
            if (sandbox.result !== test.expectedOutput) {
                return false;
            }
        }
        return true;
    }

    private runUserCode(
        code: string,
        functionName: string,
        args: any[],
    ): unknown {
        const sandbox = { result: null, args };
        const wrappedCode = `
            ${code}
            result = ${functionName}.apply(null, args);
        `;

        const script = new vm.Script(wrappedCode);
        const context = vm.createContext(sandbox);
        script.runInContext(context);
        return sandbox.result;
    }
}

export default TaskService;
