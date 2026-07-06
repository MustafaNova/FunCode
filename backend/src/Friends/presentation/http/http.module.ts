import { Module } from '@nestjs/common';
import { FriendsController } from './friends.controller';


@Module({
    controllers: [FriendsController]
})
export class HttpModule {}