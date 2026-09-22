import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Socket } from 'socket.io';
import { ERROR_CODES, SOCKET_EVENTS } from '@funcode/shared';
import { AppError } from './app.error';

@Catch()
export class WsExceptionFilter implements ExceptionFilter {
    catch(error: Error, host: ArgumentsHost) {
        const client: Socket = host.switchToWs().getClient();

        const code =
            error instanceof AppError
                ? error.code
                : ERROR_CODES.INTERNAL_SERVER_ERROR;

        const message =
            error instanceof AppError
                ? error.message
                : 'An unexpected error occurred';

        client.emit(SOCKET_EVENTS.ERROR, {
            code,
            message,
        });
    }
}
