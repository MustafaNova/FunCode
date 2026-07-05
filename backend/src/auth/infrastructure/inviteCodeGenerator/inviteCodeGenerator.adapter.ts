import { InviteCodeGeneratorPort } from '../../application/ports/outbound/inviteCodeGenerator.port';
import { randomBytes } from 'node:crypto';


export class InviteCodeGeneratorAdapter implements InviteCodeGeneratorPort {
    generate(): string {
        return randomBytes(6).toString('hex').toUpperCase();
    }
}