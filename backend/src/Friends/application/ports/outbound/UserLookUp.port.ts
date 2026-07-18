import { UserLookUpRes } from '../../../domain/types/userLookUpRes';

export interface UserLookUpPort {
    findUserIdByInviteCode(inviteCode: string): Promise<string | null>;
    findById(userId: string): Promise<UserLookUpRes | null>;
}