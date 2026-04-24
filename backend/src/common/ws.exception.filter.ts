import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ErrorResponse, SOCKET_EVENTS } from '@funcode/shared';

@Catch(WsException)
export class WsExceptionFilter extends BaseWsExceptionFilter {
    catch(exception: WsException, host: ArgumentsHost) {
        const client: Socket = host.switchToWs().getClient();
        console.log('started WsExceptionFilter');
        client.emit(SOCKET_EVENTS.ERROR, {
            type: 'error',
            message: exception.message,
        } satisfies ErrorResponse);
    }
}
