import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
} from '@nestjs/common';
import { AppError } from '../../../application/errors/AppError';
import { EmailAlreadyExistsError } from '../../../application/errors/EmailAlreadyExistsError';
import { UsernameAlreadyExistsError } from '../../../application/errors/UsernameAlreadyExistsError';

@Catch(AppError)
export class AppErrorFilter implements ExceptionFilter {
    catch(error: AppError, host: ArgumentsHost): any {
        const res = host.switchToHttp().getResponse();

        let status = HttpStatus.BAD_REQUEST;
        let msg = 'INTERNAL_ERROR';

        if (error instanceof EmailAlreadyExistsError) {
            status = HttpStatus.CONFLICT;
            msg = 'Email already exists';
        }

        if (error instanceof UsernameAlreadyExistsError) {
            status = HttpStatus.CONFLICT;
            msg = 'Username already exists';
        }

        res.status(status).json({
            msg,
            message: error.message,
        });
    }
}
