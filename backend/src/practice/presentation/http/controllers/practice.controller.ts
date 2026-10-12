import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';
import { AuthUser, UserPayload } from '../../../../common/utils/user-payload.decorator';
import { type GetPracticeProgressPort } from '../../../application/ports/inbound/getPracticeProgress.port';
import { GET_PRACTICE_LEVEL_PORT, GET_PRACTICE_PROGRESS_REPO_PORT } from '../../../infrastructure/tokens';
import { GetPracticeLevelRes, GetPracticeProgressRes, type PracticeGameMode } from '@funcode/shared';
import { ParsePracticeGameModePipe } from '../pipes/parsePracticeGameMode.pipe';
import { AuthGuard } from '@nestjs/passport';
import { type GetPracticeLevelPort } from '../../../application/ports/inbound/getPracticeLevel.port';
import { mapPracticeLevelResultToRes } from '../mappers/practiceLevelRes.mapper';

@UseGuards(AuthGuard('jwt'))
@Controller('practice')
export class PracticeController {
    constructor(
        @Inject(GET_PRACTICE_PROGRESS_REPO_PORT)
        private readonly getPracticeProgressUC: GetPracticeProgressPort,
        @Inject(GET_PRACTICE_LEVEL_PORT)
        private readonly getPracticeLevelUC: GetPracticeLevelPort
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
    ): Promise<GetPracticeLevelRes> {
        const practiceLevelResult = await this.getPracticeLevelUC.getLevel(user.userId, gameMode, levelId);
        return mapPracticeLevelResultToRes(practiceLevelResult);
    }

}
