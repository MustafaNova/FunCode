
export class ClanNameAlreadyExistsError extends Error {
    constructor() {
        super('Clan name already exists');
    }
}
