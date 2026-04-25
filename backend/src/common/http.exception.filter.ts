import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
} from '@nestjs/common';
import { EmailAlreadyExistsError } from '../auth/application/use-cases/user-registration/errors/EmailAlreadyExistsError';
import { UsernameAlreadyExistsError } from '../auth/application/use-cases/user-registration/errors/UsernameAlreadyExistsError';
import { InvalidCredentialsError } from '../auth/application/use-cases/user-login/errors/InvalidCredentialsError';
import { NotFoundException } from '../Learning-progression/infrastructure/database/errors/notFoundException.err';
import { EmailError } from '../auth/domain/errors/EmailError';
import { PasswordError } from '../auth/domain/errors/PasswordError';
import { UsernameError } from '../auth/domain/errors/UsernameError';
import { LevelNotFoundException } from '../Learning-progression/infrastructure/database/errors/levelNotFound.err';
import { ErrorResponse } from '@funcode/shared';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(error: Error, host: ArgumentsHost): any {
        const res = host.switchToHttp().getResponse();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;

        if (
            error instanceof EmailAlreadyExistsError ||
            error instanceof UsernameAlreadyExistsError
        ) {
            status = HttpStatus.CONFLICT;
        }

        if (error instanceof InvalidCredentialsError) {
            status = HttpStatus.UNAUTHORIZED;
        }

        if (
            error instanceof NotFoundException ||
            error instanceof LevelNotFoundException
        ) {
            status = HttpStatus.NOT_FOUND;
        }

        if (
            error instanceof EmailError ||
            error instanceof PasswordError ||
            error instanceof UsernameError
        ) {
            status = HttpStatus.BAD_REQUEST;
        }
        console.log('catched http exception');
        res.status(status).json({
            type: 'error',
            message: error.message,
        } satisfies ErrorResponse);
    }
}
