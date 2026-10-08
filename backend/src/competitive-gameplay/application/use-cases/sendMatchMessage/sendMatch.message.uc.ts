import { SendMatchMessagePort } from '../../ports/inbound/sendMatch.message.port';
import { MatchMessagePayload, SOCKET_EVENTS } from '@funcode/shared';
import { PlayerGatewayPort } from '../../ports/outbound/player.gateway.port';


export class SendMatchMessageUC implements SendMatchMessagePort {
    constructor(
        private readonly playerGateway: PlayerGatewayPort
    ) {}

    execute(userId: string, roomId: string, payload: MatchMessagePayload) {
        this.playerGateway.notifyRoomExceptPlayer(
            userId,
            roomId,
            SOCKET_EVENTS.OPPONENT_MATCH_MESSAGE,
            payload,
        )
    }
}
