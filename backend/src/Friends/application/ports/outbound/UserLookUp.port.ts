
export interface UserLookUpPort {
    findUserIdByInviteCode(inviteCode: string): Promise<string | null>;
}