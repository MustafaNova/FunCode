export class LevelNotFoundException extends Error {
    constructor() {
        super('Level not found');
    }
}
