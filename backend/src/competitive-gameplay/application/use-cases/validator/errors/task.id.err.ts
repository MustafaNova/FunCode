export class TaskIdError extends Error {
    constructor() {
        super('Task not found');
    }
}
