import { ErrorCode } from '@funcode/shared';

export abstract class AppError extends Error {
    constructor(
        public readonly code: ErrorCode,
        message: string,
    ) {
        super(message);
    }
}