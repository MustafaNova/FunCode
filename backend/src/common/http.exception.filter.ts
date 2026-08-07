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
import { ERROR_CODES, ErrorResponse } from '@funcode/shared';
import { ClanNameAlreadyExistsError } from '../clans/application/use-cases/errors/clan.name.already.exists.error';
import { UserAlreadyInClanError } from '../clans/application/use-cases/errors/userAlreadyInClan.error';
import { ClanNotFoundError } from '../clans/application/use-cases/errors/ClanNotFoundError';
import { InviteCodeNotFound } from '../Friends/application/use-cases/createFriendRequest/errors/InviteCodeNotFound.err';
import {
    SelfFriendRequestError
} from '../Friends/application/use-cases/createFriendRequest/errors/selfFriendRequest.err';
import {
    FriendRequestNotFoundError
} from '../Friends/application/use-cases/acceptFriendRequest/errors/FriendRequestNotFound.err';
import {
    FriendRequestAccessDeniedError
} from '../Friends/application/use-cases/acceptFriendRequest/errors/FriendRequestAccessDenied.err';
import { UserNotFoundError } from '../Friends/application/use-cases/acceptFriendRequest/errors/UserNotFound.err';
import {
    FriendshipAlreadyExistsError
} from '../Friends/application/use-cases/createFriendRequest/errors/friendshipAlreadyExists.err';
import { FriendshipNotFoundError } from '../Friends/application/use-cases/deleteFriend/errors/friendshipNotFound.err';
import { AppError } from './app.error';
import {
    BugHunterLevelNotFoundError
} from '../practice/application/use-cases/getBugHunterLevel/errors/bugHunterLevelNotFound.err';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(error: Error, host: ArgumentsHost): any {
        const res = host.switchToHttp().getResponse();
        let status = HttpStatus.INTERNAL_SERVER_ERROR;

        if (
            error instanceof EmailAlreadyExistsError ||
            error instanceof UsernameAlreadyExistsError ||
            error instanceof ClanNameAlreadyExistsError ||
            error instanceof UserAlreadyInClanError ||
            error instanceof FriendshipAlreadyExistsError
        ) {
            status = HttpStatus.CONFLICT;
        } else if (error instanceof InvalidCredentialsError) {
            status = HttpStatus.UNAUTHORIZED;
        } else if (
            error instanceof NotFoundProgressIdException ||
            error instanceof LevelNotFoundException ||
            error instanceof NotFoundException ||
            error instanceof ClanNotFoundError ||
            error instanceof InviteCodeNotFound ||
            error instanceof FriendRequestNotFoundError ||
            error instanceof UserNotFoundError ||
            error instanceof FriendshipNotFoundError ||
            error instanceof BugHunterLevelNotFoundError
        ) {
            status = HttpStatus.NOT_FOUND;
        }

        else if (
            error instanceof EmailError ||
            error instanceof PasswordError ||
            error instanceof UsernameError ||
            error instanceof SelfFriendRequestError
        ) {
            status = HttpStatus.BAD_REQUEST;
        }
        else if (error instanceof FriendRequestAccessDeniedError) {
            status = HttpStatus.FORBIDDEN;
        }

        const code =
            error instanceof AppError
                ? error.code
                : ERROR_CODES.INTERNAL_SERVER_ERROR;

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
