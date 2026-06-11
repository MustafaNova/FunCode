import { Module } from '@nestjs/common';
import { CREATE_CLAN_PORT, GET_MY_CLAN_PORT } from './tokens';
import { CreateClanService } from './createClan/createClan.service';
import { ClanRepoModule } from '../clanRepository/clan.repo.module';
import { GetMyClanService } from './getMyClan/getMyClan.service';


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
        }
    ],
    exports: [CREATE_CLAN_PORT, GET_MY_CLAN_PORT]
})
export class UCServicesModule {}