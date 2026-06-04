import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClanEntity } from '../entities/clan.entity';
import { ClanRepositoryAdapter } from './clan.repository.adapter';
import { CLAN_REPO_PORT } from './tokens';


@Module({
    imports: [
        TypeOrmModule.forFeature([ClanEntity])
    ],
    providers: [
        {
            provide: CLAN_REPO_PORT,
            useClass: ClanRepositoryAdapter,
        }
    ],
    exports: [CLAN_REPO_PORT]
})
export class ClanRepoModule {}