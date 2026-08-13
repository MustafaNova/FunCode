import { CodeExecutionPort } from '../../application/ports/outbound/codeExecution.port';
import { Injectable } from '@nestjs/common';
import { UnsupportedLanguageError } from './unsupportedLanguage.err';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawn } from 'node:child_process';

@Injectable()
export class CodeExecutionAdapter implements CodeExecutionPort {

    execute(language: string, code: string) {
        switch (language) {
            case 'python':
                return this.executePython(code);

            case 'typescript':
                return this.executeTypeScript(code);

            default:
                throw new UnsupportedLanguageError();
        }
    }


    private async executePython(code: string) {
        const dir = await mkdtemp(join(tmpdir(), 'funcode-python-'))
        const file = join(dir, 'solution.py');

        try {
            await writeFile(file, code);

            return this.runDocker([
                'run',
                '--rm',
                '--network',
                'none',
                '--memory',
                '128m',
                '--cpus',
                '0.5',
                '--pids-limit',
                '32',
                '--read-only',
                '-v',
                `${file}:/app/solution.py:ro`,
                'python:3.13-slim',
                'python',
                '/app/solution.py',
            ])
        } finally {
            await rm(dir, {
                recursive: true,
                force: true,
            });
        }
    }

    private async executeTypeScript(code: string) {
        const dir = await mkdtemp(join(tmpdir(), 'funcode-ts-'));
        const file = join(dir, 'solution.ts');

        try {
            await writeFile(file, code);

            return await this.runDocker([
                'run',
                '--rm',
                '--network',
                'none',
                '--memory',
                '128m',
                '--cpus',
                '0.5',
                '--pids-limit',
                '32',
                '--read-only',
                '-v',
                `${file}:/app/solution.ts:ro`,
                'funcode-typescript-runner',
                'tsx',
                '/app/solution.ts',
            ]);
        } finally {
            await rm(dir, {
                recursive: true,
                force: true,
            });
        }
    }

    private runDocker(args: string[]) {
        return new Promise<boolean>((resolve) => {
            const process = spawn('docker', args);

            const timeout = setTimeout(() => {
                process.kill();
                resolve(false);
            },10000)

            process.on('close', (exitCode) => {
                clearTimeout(timeout);
                resolve(exitCode === 0);
            })

            process.on('error', () => {
                clearTimeout(timeout);
                resolve(false);
            })
        })
    }
}
