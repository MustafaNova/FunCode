import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
} from '@nestjs/common';
import { AppError } from '../../../../common/errors/AppError';
import { EmailAlreadyExistsError } from '../../../application/use-cases/user-registration/errors/EmailAlreadyExistsError';
import { UsernameAlreadyExistsError } from '../../../application/use-cases/user-registration/errors/UsernameAlreadyExistsError';
import { InvalidCredentialsError } from '../../../application/use-cases/user-login/errors/InvalidCredentialsError';
import { NotFoundException } from '../../../../Learning-progression/infrastructure/database/notFoundException.err';

@Catch(AppError)
export class AppErrorFilter implements ExceptionFilter {
    catch(error: AppError, host: ArgumentsHost): any {
        const res = host.switchToHttp().getResponse();

        let status = HttpStatus.BAD_REQUEST;

        if (
            error instanceof EmailAlreadyExistsError ||
            error instanceof UsernameAlreadyExistsError
        ) {
            status = HttpStatus.CONFLICT;
        }

        if (error instanceof InvalidCredentialsError) {
            status = HttpStatus.UNAUTHORIZED;
        }

        if (error instanceof NotFoundException) {
            status = HttpStatus.NOT_FOUND;
        }

        res.status(status).json({
            message: error.message,
        });
    }
}
