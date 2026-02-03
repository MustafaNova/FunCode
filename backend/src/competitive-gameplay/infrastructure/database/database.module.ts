import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BATTLE_REPOSITORY_PORT } from '../../application/tokens';
import { BattleRepositoryAdapter } from './battle/battle.repository.adapter';
import { Battle1vs1Entity } from './battle/typeorm/battle1vs1.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Battle1vs1Entity])],
    providers: [
        { provide: BATTLE_REPOSITORY_PORT, useClass: BattleRepositoryAdapter },
    ],
    exports: [BATTLE_REPOSITORY_PORT],
})
export class DatabaseModule {}
