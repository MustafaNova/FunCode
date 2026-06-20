
export class ClanNotFoundError extends Error {
    constructor() {
        super('Clan does not exists');

    }

}