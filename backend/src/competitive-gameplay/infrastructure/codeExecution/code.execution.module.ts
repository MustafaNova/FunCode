import { Module } from '@nestjs/common';
import { CODE_EXECUTION_PORT } from './tokens';
import { CodeExecutionAdapter } from './code.execution.adapter';


@Module({
    providers: [
        {
            provide: CODE_EXECUTION_PORT,
            useClass: CodeExecutionAdapter
        }
    ],
    exports: [CODE_EXECUTION_PORT]
})
export class CodeExecutionModule {}