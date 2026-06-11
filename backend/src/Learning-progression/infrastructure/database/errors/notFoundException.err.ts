export class NotFoundProgressIdException extends Error {
    constructor() {
        super('ProgressId doesnt exists');
    }
}
