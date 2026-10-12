import { CodeGolfActivityPort } from '../../ports/inbound/codeGolf.activity.port';
import { CodeGolfActivityPayload } from '@funcode/shared/dist/competitive-gameplay/payloads/codeGolf.activity.payload';
import { PlayerGatewayPort } from '../../ports/outbound/player.gateway.port';
import { SOCKET_EVENTS } from '@funcode/shared';


export class CodeGolfActivityUC implements CodeGolfActivityPort {
    constructor(
        private readonly playerGateway: PlayerGatewayPort,
    ) {}

    handle(userId: string, roomId: string, payload: CodeGolfActivityPayload) {
        this.playerGateway.notifyRoomExceptPlayer(
            userId,
            roomId,
            SOCKET_EVENTS.CODE_GOLF_OPPONENT_ACTIVITY,
            payload,
        )
    }
}