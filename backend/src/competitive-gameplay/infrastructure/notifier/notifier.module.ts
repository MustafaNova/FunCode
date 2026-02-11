import { Module } from '@nestjs/common';
import { PlayerNotifierAdapter } from './player.notifier.adapter';
import { PLAYER_NOTIFIER_PORT } from './token';

@Module({
    imports: [],
    providers: [
        {
            provide: PLAYER_NOTIFIER_PORT,
            useClass: PlayerNotifierAdapter,
        },
    ],
    exports: [PLAYER_NOTIFIER_PORT],
})
export class NotifierModule {}
