import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClanEntity } from '../entities/clan.entity';
import { ClanRepositoryAdapter } from './clan.repository.adapter';
import { CLAN_REPO_PORT } from './tokens';
import { ClanMemberEntity } from '../entities/clan-member.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([ClanEntity, ClanMemberEntity])
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