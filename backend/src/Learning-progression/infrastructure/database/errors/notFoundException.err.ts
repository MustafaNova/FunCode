export class NotFoundException extends Error {
    constructor() {
        super('ProgressId doesnt exists');
    }
}
