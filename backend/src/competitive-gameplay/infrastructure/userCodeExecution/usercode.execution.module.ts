import { Module } from '@nestjs/common';
import { USERCODE_EXECUTION_PORT } from '../../application/tokens';
import { UserCodeExecutionAdapter } from './usercode.execution.adapter';

@Module({
    providers: [
        {
            provide: USERCODE_EXECUTION_PORT,
            useClass: UserCodeExecutionAdapter,
        },
    ],
    exports: [USERCODE_EXECUTION_PORT],
})
export class UserCodeExecutionModule {}
