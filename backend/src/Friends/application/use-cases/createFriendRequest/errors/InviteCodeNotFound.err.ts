export class InviteCodeNotFound extends Error {
    constructor() {
        super('invalid InviteCode');
    }
}