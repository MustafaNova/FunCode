import { Module } from '@nestjs/common';
import { ID_GENERATOR_PORT } from '../../application/tokens';
import { IdGeneratorAdapter } from './id.generator.adapter';

@Module({
    providers: [{ provide: ID_GENERATOR_PORT, useClass: IdGeneratorAdapter }],
    exports: [ID_GENERATOR_PORT],
})
export class IdGeneratorModule {}
