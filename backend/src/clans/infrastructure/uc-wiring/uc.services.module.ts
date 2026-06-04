import { Module } from '@nestjs/common';
import { CREATE_CLAN } from './tokens';
import { CreateClanService } from './createClan/createClan.service';


@Module({
    providers: [
        {
            provide: CREATE_CLAN,
            useClass: CreateClanService,
        }
    ],
    exports: [CREATE_CLAN]
})
export class UCServicesModule {}