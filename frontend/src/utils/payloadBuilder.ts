export function createMatchMakingPayload(matchType: string, playerCount: number) {
    return JSON.stringify({ matchType, playerCount });
}
