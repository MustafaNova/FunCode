import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './typeorm/user.entity';
import { UserRepositoryAdapter } from './adapters/user-repository/user-repository.adapter';
import { USER_REPOSITORY_PORT } from '../../application/tokens';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [
        { provide: USER_REPOSITORY_PORT, useClass: UserRepositoryAdapter },
    ],
    exports: [USER_REPOSITORY_PORT],
})
export class PersistenceModule {}
