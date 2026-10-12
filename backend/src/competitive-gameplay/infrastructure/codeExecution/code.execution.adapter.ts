import { CodeExecutionPort } from '../../application/ports/outbound/code.execution.port';
import { CodeExecutionResult } from '../../application/ports/outbound/results/code.execution.result';
import { TaskTest } from '../../domain/entities/taskTest';
import { Injectable } from '@nestjs/common';
import Sandbox from '@e2b/code-interpreter';
import { CompetitiveProgrammingLanguage } from '../../domain/types/competitiveProgrammingLanguage';


@Injectable()
export class CodeExecutionAdapter implements CodeExecutionPort {

    async execute(code: string, functionName: string, tests: TaskTest[], language: CompetitiveProgrammingLanguage): Promise<CodeExecutionResult> {
        console.log('CodeExecutionAdapter');
        const sandbox = await Sandbox.create({apiKey: process.env.E2B_API_KEY});
        console.log('> sandbox');
        try {
            const testCode = `
                ${code}
                const tests = ${JSON.stringify(tests)};

                const results = tests.map((test, index) => {
                    try {
                        const actual =
                            ${functionName}(...test.input);

                        return {
                            index,
                            passed:
                                JSON.stringify(actual) ===
                                JSON.stringify(test.expectedOutput)
                        };
                    } catch {
                        return {
                            index,
                            passed: false
                        };
                    }
                });

                JSON.stringify(results);
            `;

            const execution =
                await sandbox.runCode(testCode, { language });

            if (execution.error) {
                return {
                    tests: [],
                    executionFailed: true
                }
            }

            const result =
                execution.results[0].text;


            if (!result) {
                throw new Error('Code execution failed');
            }

            return {
                tests: JSON.parse(result),
                executionFailed: false,
            };
        } finally {
            await sandbox.kill();
        }
    }
}
