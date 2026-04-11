import { GetPlayerProgressUC } from '../../../application/use-cases/getPlayerProgress/getPlayerProgress.uc';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetPlayerProgressService extends GetPlayerProgressUC {
    constructor() {
        super();
    }
}
