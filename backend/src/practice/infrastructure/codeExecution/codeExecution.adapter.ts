import { CodeExecutionPort } from '../../application/ports/outbound/codeExecution.port';
import { Injectable } from '@nestjs/common';
import Sandbox from '@e2b/code-interpreter';
import { BugHunterLanguages } from '../../domain/value-objects/bugHunterLanguages';

@Injectable()
export class CodeExecutionAdapter implements CodeExecutionPort {

    async execute(language: BugHunterLanguages, code: string) {
        console.log('starting CodeExecutionAdapter')

        const sandbox = await Sandbox.create({apiKey: process.env.E2B_API_KEY});

        try {
            const execution = await sandbox.runCode(code, {
                language,
                timeoutMs: 3000
            })
            return !execution.error;

        } finally {
            await sandbox.kill();
        }
    }
}
