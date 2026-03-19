export function createMatchMakingPayload(matchType: string, playerCount: number) {
    return {
        matchType,
        playerCount,
    }
}
