import { User } from '../../../domain/entitys/user';

export interface GetCurrentUserPort {
    me(username: string): Promise<User>;
}