export abstract class AppError extends Error {
    constructor(message: string) {
        super(message);
    }
}
