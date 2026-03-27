export function createMatchMakingPayload(matchType: string, playerCount: number) {
    const payload = {
        matchType,
        playerCount,
    };
    return JSON.stringify(payload);
}

export function createSubmissionPayload(taskId: string, solution: string) {
    const payload = {
        taskId,
        solution,
    };
    return JSON.stringify(payload);
}
