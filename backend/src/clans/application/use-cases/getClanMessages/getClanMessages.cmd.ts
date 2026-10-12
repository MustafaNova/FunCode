
export interface GetClanMessagesCmd {
    userId: string,
    before?: string,
    limit: number
}