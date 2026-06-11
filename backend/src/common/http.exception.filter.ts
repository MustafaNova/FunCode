import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus, NotFoundException,
} from '@nestjs/common';
import { EmailAlreadyExistsError } from '../auth/application/use-cases/user-registration/errors/EmailAlreadyExistsError';
import { UsernameAlreadyExistsError } from '../auth/application/use-cases/user-registration/errors/UsernameAlreadyExistsError';
import { InvalidCredentialsError } from '../auth/application/use-cases/user-login/errors/InvalidCredentialsError';
import { NotFoundProgressIdException } from '../Learning-progression/infrastructure/database/errors/notFoundException.err';
import { EmailError } from '../auth/domain/errors/EmailError';
import { PasswordError } from '../auth/domain/errors/PasswordError';
import { UsernameError } from '../auth/domain/errors/UsernameError';
import { LevelNotFoundException } from '../Learning-progression/infrastructure/database/errors/levelNotFound.err';
import { ErrorResponse } from '@funcode/shared';
import { ClanNameAlreadyExistsError } from '../clans/application/errors/clan.name.already.exists.error';
import { UserAlreadyInClanError } from '../clans/application/errors/userAlreadyInClan.error';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(error: Error, host: ArgumentsHost): any {
        const res = host.switchToHttp().getResponse();
        console.log("aufgerufen: HttpExceptionFilter")
        let status = HttpStatus.INTERNAL_SERVER_ERROR;

        if (
            error instanceof EmailAlreadyExistsError ||
            error instanceof UsernameAlreadyExistsError ||
            error instanceof ClanNameAlreadyExistsError ||
            error instanceof UserAlreadyInClanError
        ) {
            status = HttpStatus.CONFLICT;
        } else if (error instanceof InvalidCredentialsError) {
            status = HttpStatus.UNAUTHORIZED;
        } else if (
            error instanceof NotFoundProgressIdException ||
            error instanceof LevelNotFoundException ||
            error instanceof NotFoundException
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

        res.status(status).json({
            type: 'error',
            message: error.message,
        } satisfies ErrorResponse);
    }
}
