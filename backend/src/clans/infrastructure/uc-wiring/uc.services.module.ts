import { Module } from '@nestjs/common';
import { CREATE_CLAN } from './tokens';
import { CreateClanService } from './createClan/createClan.service';
import { ClanRepoModule } from '../clanRepository/clan.repo.module';


@Module({
    imports: [ClanRepoModule],
    providers: [
        {
            provide: CREATE_CLAN,
            useClass: CreateClanService,
        }
    ],
    exports: [CREATE_CLAN]
})
export class UCServicesModule {}