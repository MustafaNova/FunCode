import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
} from '@nestjs/common';
import { DomainError } from '../../../domain/errors/DomainError';

@Catch(DomainError)
export class DomainErrorFilter implements ExceptionFilter {
    catch(error: DomainError, host: ArgumentsHost): any {
        const res = host.switchToHttp().getResponse();

        const status = HttpStatus.BAD_REQUEST;

        res.status(status).json({
            message: error.message,
        });
    }
}
