export class UserCodeError extends Error {
    public constructor(err: string) {
        super(`${err}`);
    }
}
