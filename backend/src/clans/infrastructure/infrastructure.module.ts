import { Module } from '@nestjs/common';
import { ClanRepoModule } from './clanRepository/clan.repo.module';


@Module({
    imports: [ClanRepoModule],
    exports: [ClanRepoModule]
})
export class InfrastructureModule {}