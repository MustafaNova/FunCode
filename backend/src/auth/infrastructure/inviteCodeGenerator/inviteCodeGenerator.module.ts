import { Module } from '@nestjs/common';
import { INVITE_CODE_GENERATOR_PORT } from './tokens';
import { InviteCodeGeneratorAdapter } from './inviteCodeGenerator.adapter';

@Module({
    providers: [
        {
            provide: INVITE_CODE_GENERATOR_PORT,
            useClass: InviteCodeGeneratorAdapter,
        }
    ],
    exports: [INVITE_CODE_GENERATOR_PORT]

})
export class InviteCodeGeneratorModule {}