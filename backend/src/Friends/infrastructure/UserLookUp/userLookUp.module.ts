import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../../auth/infrastructure/persistence/typeorm/user.entity';
import { UserLookUpAdapter } from './userLookUp.adapter';
import { USER_LOOK_UP_PORT } from '../tokens';


@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [
        {
            provide: USER_LOOK_UP_PORT,
            useClass: UserLookUpAdapter,
        }
    ],
    exports: [USER_LOOK_UP_PORT]
})
export class UserLookUpModule {}