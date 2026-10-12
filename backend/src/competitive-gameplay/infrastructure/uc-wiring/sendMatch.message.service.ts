import { SendMatchMessageUC } from '../../application/use-cases/sendMatchMessage/sendMatch.message.uc';
import { Inject, Injectable } from '@nestjs/common';
import { type PlayerGatewayPort } from '../../application/ports/outbound/player.gateway.port';
import { PLAYER_GATEWAY_PORT } from '../playerGateway/token';

@Injectable()
export class SendMatchMessageService extends SendMatchMessageUC {
    constructor(
        @Inject(PLAYER_GATEWAY_PORT)
        playerGateway: PlayerGatewayPort
    ) {
        super(playerGateway);
    }
}