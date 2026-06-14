import { Module } from '@nestjs/common';
import { CREATE_CLAN_PORT, GET_MY_CLAN_PORT, LEAVE_CLAN_PORT, SEARCH_CLANS_PORT } from './tokens';
import { CreateClanService } from './createClan/createClan.service';
import { ClanRepoModule } from '../clanRepository/clan.repo.module';
import { GetMyClanService } from './getMyClan/getMyClan.service';
import { LeaveClanService } from './leaveClan/leaveClan.service';
import { SearchClansService } from './searchClans/searchClans.service';


@Module({
    imports: [ClanRepoModule],
    providers: [
        {
            provide: CREATE_CLAN_PORT,
            useClass: CreateClanService,
        },
        {
            provide: GET_MY_CLAN_PORT,
            useClass: GetMyClanService,
        },
        {
            provide: LEAVE_CLAN_PORT,
            useClass: LeaveClanService,
        },
        {
            provide: SEARCH_CLANS_PORT,
            useClass: SearchClansService,
        }
    ],
    exports: [CREATE_CLAN_PORT, GET_MY_CLAN_PORT, LEAVE_CLAN_PORT, SEARCH_CLANS_PORT]
})
export class UCServicesModule {}