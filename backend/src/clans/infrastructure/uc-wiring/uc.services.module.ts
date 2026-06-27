import { Module } from '@nestjs/common';
import { CREATE_CLAN_PORT, GET_MY_CLAN_PORT, JOIN_CLAN_PORT, LEAVE_CLAN_PORT, SEARCH_CLANS_PORT } from './tokens';
import { CreateClanService } from './createClan/createClan.service';
import { ClanRepoModule } from '../clanRepo/clan.repo.module';
import { GetMyClanService } from './getMyClan/getMyClan.service';
import { LeaveClanService } from './leaveClan/leaveClan.service';
import { SearchClansService } from './searchClans/searchClans.service';
import { JoinClanService } from './joinClan/joinClan.service';


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
        },
        {
            provide: JOIN_CLAN_PORT,
            useClass: JoinClanService,
        }
    ],
    exports: [CREATE_CLAN_PORT, GET_MY_CLAN_PORT, LEAVE_CLAN_PORT, SEARCH_CLANS_PORT, JOIN_CLAN_PORT]
})
export class UCServicesModule {}