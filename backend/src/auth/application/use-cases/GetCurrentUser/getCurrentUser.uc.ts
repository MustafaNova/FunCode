import { GetCurrentUserPort } from '../../ports/inbound/GetCurrentUser.port';
import { UserRepositoryPort } from '../../ports/outbound/user-repository.port';
import { Username } from '../../../domain/value-objects/username.vo';
import { User } from '../../../domain/entitys/user';


export class GetCurrentUserUC implements GetCurrentUserPort {
    constructor(
        private readonly userRepo: UserRepositoryPort,
    ) {
    }
    async me(username: string): Promise<User> {
        const user = await this.userRepo.findByUsername(Username.create(username));

        if (!user) {
            throw new Error()
        }

        return user;
    }
}