

export type CodeGolfMatchState = {
    taskId: string,
    playerScores: Map<string, number>,
    preparationEndsAt: number,
    matchEndsAt: number,
    instantWinLimit: number,
}