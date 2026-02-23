import { IdGeneratorPort } from '../../application/ports/outbound/id.generator.port';
import crypto from 'crypto';

export class IdGeneratorAdapter implements IdGeneratorPort {
    generate(): string {
        return crypto.randomUUID();
    }
}
