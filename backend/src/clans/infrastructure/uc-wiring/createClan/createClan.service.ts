import { CreateClanUC } from '../../../application/use-cases/createClan/createClan.uc';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateClanService extends CreateClanUC {
    constructor() {
        super();
    }
}