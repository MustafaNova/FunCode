import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ERROR_CODES, ErrorResponse, SOCKET_EVENTS } from '@funcode/shared';

@Catch(WsException)
export class WsExceptionFilter extends BaseWsExceptionFilter {
    catch(exception: WsException, host: ArgumentsHost) {
        const client: Socket = host.switchToWs().getClient();
        client.emit(SOCKET_EVENTS.ERROR, {
            statusCode: 500,
            code: ERROR_CODES.INTERNAL_SERVER_ERROR,
            message: exception.message,
        } satisfies ErrorResponse);
    }
}
