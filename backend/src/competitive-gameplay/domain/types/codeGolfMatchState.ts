

export type CodeGolfMatchState = {
    taskId: string,
    playerScores: Map<string, number>,
    endsAt: number,
    instantWinLimit: number,
}