import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
} from '@nestjs/common';
import { ERROR_CODES, ErrorResponse } from '@funcode/shared';
import { AppError } from './app.error';
import { ERROR_CODE_TO_HTTP_STATUS } from './errorCodeHttpStatusMapping';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(error: Error, host: ArgumentsHost): any {
        const res = host.switchToHttp().getResponse();

        const code =
            error instanceof AppError
                ? error.code
                : ERROR_CODES.INTERNAL_SERVER_ERROR;

        const status = ERROR_CODE_TO_HTTP_STATUS[code];

        const message =
            error instanceof AppError
                ? error.message
                : 'An unexpected error occurred';


        res.status(status).json({
            statusCode: status,
            code,
            message,
        } satisfies ErrorResponse);
    }
}
