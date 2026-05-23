import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../../auth/infrastructure/persistence/typeorm/user.entity';
import { USER_REPO } from './tokens';
import { UserRepoAdapter } from './userRepo.adapter';


@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [
        { provide: USER_REPO, useClass: UserRepoAdapter },
    ],
    exports: [USER_REPO]
})
export class UserRepoModule {}