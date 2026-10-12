import { CodeGolfActivityUC } from '../../application/use-cases/codeGolfActivity/codeGolfActivity.uc';
import { Inject, Injectable } from '@nestjs/common';
import { PLAYER_GATEWAY_PORT } from '../playerGateway/token';
import { type PlayerGatewayPort } from '../../application/ports/outbound/player.gateway.port';

@Injectable()
export class CodeGolfActivityService extends CodeGolfActivityUC {
    constructor(
        @Inject(PLAYER_GATEWAY_PORT)
        playerGateway: PlayerGatewayPort
    ) {
        super(playerGateway);
    }
}
