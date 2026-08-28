import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';
import { AuthUser, UserPayload } from '../../../../common/utils/user-payload.decorator';
import { type GetPracticeProgressPort } from '../../../application/ports/inbound/getPracticeProgress.port';
import { GET_PRACTICE_PROGRESS_REPO_PORT } from '../../../infrastructure/tokens';
import { GetPracticeProgressRes, type PracticeGameMode } from '@funcode/shared';
import { ParsePracticeGameModePipe } from '../pipes/parsePracticeGameMode.pipe';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('practice')
export class PracticeController {
    constructor(
        @Inject(GET_PRACTICE_PROGRESS_REPO_PORT)
        private readonly getPracticeProgressUC: GetPracticeProgressPort
    ) {}

    @Get(':gameMode/progress')
    async getProgress(
        @Param('gameMode', ParsePracticeGameModePipe)
        gameMode: PracticeGameMode,
        @UserPayload() user: AuthUser
    ): Promise<GetPracticeProgressRes> {
        const res = await this.getPracticeProgressUC.getProgress(user.userId, gameMode);
        return {
            highestUnlockedLevel: res.highestUnlockedLevel,
            completedAllLevels: res.completedAllLevels
        }

    }

    @Get('levels/:gameMode/:levelId')
    async getLevelContent(
        @UserPayload() user: AuthUser,
        @Param('gameMode', ParsePracticeGameModePipe)
        gameMode: PracticeGameMode,
        @Param('levelId') levelId: string,
    ) {

    }

}
