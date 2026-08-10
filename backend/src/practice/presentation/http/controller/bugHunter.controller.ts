import { Body, Controller, Get, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { AuthUser, UserPayload } from '../../../../common/utils/user-payload.decorator';
import { type GetBugHunterProgressPort } from '../../../application/ports/inbound/getBugHunterProgress.port';
import { GET_BUG_HUNTER_LEVEL_PORT, GET_BUG_HUNTER_PROGRESS_PORT } from '../../../infrastructure/tokens';
import { GetBugHunterLevelContentRes, type SubmitBugHunterLevelReq, UnlockedLevelRes } from '@funcode/shared';
import { AuthGuard } from '@nestjs/passport';
import { type GetBugHunterLevelPort } from '../../../application/ports/inbound/getBugHunterLevel.port';

@UseGuards(AuthGuard('jwt'))
@Controller('practice/bug-hunter')
export class BugHunterController {
    constructor(
        @Inject(GET_BUG_HUNTER_PROGRESS_PORT)
        private readonly getBugHunterProgressUC: GetBugHunterProgressPort,
        @Inject(GET_BUG_HUNTER_LEVEL_PORT)
        private readonly getBugHunterLevelUC: GetBugHunterLevelPort
    ) {}

    @Get('unlocked-level')
    async getHighestUnlockedLevel(
        @UserPayload() user: AuthUser,
    ): Promise<UnlockedLevelRes> {
        const res = await this.getBugHunterProgressUC.getProgress(user.userId);
        return {
            unlockedLevel: res.highestUnlockedLevel
        }
    }

    @Get('levels/:levelId')
    async getLevelContent(
        @UserPayload() user: AuthUser,
        @Param('levelId') levelId: string,
    ): Promise<GetBugHunterLevelContentRes> {
        const res = await this.getBugHunterLevelUC.getLevel(user.userId, levelId);
        return {
            description: res.description,
            initialCode: res.initialCode,
            language: res.language,
        }
    }

    @Post('levels/:levelId/submit')
    submit(
        @Param('levelId') levelId: string,
        @Body() payload: SubmitBugHunterLevelReq,
        @UserPayload() user: AuthUser,
    ) {
    }

}