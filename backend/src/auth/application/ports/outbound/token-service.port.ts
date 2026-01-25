import { AccessToken } from '../../../domain/value-objects/accessToken.vo';
import { TokenPayload } from '../../../domain/value-objects/tokenPayload.vo';

export interface TokenServicePort {
    sign(payload: TokenPayload): Promise<AccessToken>;
}
