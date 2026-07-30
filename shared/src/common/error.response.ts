import { ErrorCode } from './error.codes.js';

export type ErrorResponse = {
    statusCode: number;
    code: ErrorCode,
    message: string;
}
