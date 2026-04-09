import { Controller, Inject } from '@nestjs/common';
import { GET_PLAYER_PROGRESS_PORT } from '../../../infrastructure/uc-wiring/tokens';
import type { GetPlayerProgressPort } from '../../../application/ports/inbound/getPlayerProgress.port';

@Controller('progress')
export class PlayerProgressController {
    constructor(
        @Inject(GET_PLAYER_PROGRESS_PORT)
        private readonly getProgress: GetPlayerProgressPort,
    ) {}



}
