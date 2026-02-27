import { Injectable } from '@nestjs/common';
import { TaskIdError } from '../battle-manager/errors/task.id.err';
import { SolutionError } from '../battle-manager/errors/solution.err';
import vm from 'vm';
import { UserCodeError } from '../battle-manager/errors/usercode.err';
import { ValidatorPort } from '../../ports/inbound/validator.port';
import type { ChallengeRepositoryPort } from '../../ports/outbound/challenge.repository.port';

interface Sandbox {
    args: unknown[] | null;
    result: unknown;
    [key: string]: any;
}

@Injectable()
export class ValidatorUC implements ValidatorPort {
    constructor(private readonly challengeRepo: ChallengeRepositoryPort) {
    }
    checkSubmit(taskId: string, solution: string) {
        if (!this.challengeRepo.exists(taskId)) {
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
        const taskTest = this.challengeRepo.getTests(taskId);
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
