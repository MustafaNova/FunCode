import { ErrorCode } from './error.codes.js';

export type HttpErrorResponse = {
    statusCode: number;
    code: ErrorCode,
    message: string;
}
