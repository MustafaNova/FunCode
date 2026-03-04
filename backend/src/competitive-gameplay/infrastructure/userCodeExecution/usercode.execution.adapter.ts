import { UserCodeExecutionPort } from '../../application/ports/outbound/usercode.execution.port';
import vm from 'vm';
import { Injectable } from '@nestjs/common';
import { TaskTest } from '../../domain/entities/task';

interface Sandbox {
    args: unknown[];
    result: unknown;
    [key: string]: any;
}

@Injectable()
export class UserCodeExecutionAdapter implements UserCodeExecutionPort {
    run<I extends unknown[], O>(
        userCode: string,
        functionName: string,
        tests: TaskTest<I, O>[],
    ): boolean {
        const sandbox: Sandbox = { args: [], result: null };

        const script = new vm.Script(userCode);
        const context = vm.createContext(sandbox);
        script.runInContext(context);

        for (const test of tests) {
            sandbox.args = test.input;
            const func = sandbox[functionName] as (...args: any[]) => any;
            sandbox.result = func(...sandbox.args);
            if (sandbox.result !== test.expectedOutput) {
                return false;
            }
        }
        return true;
    }
}
