import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { AuthUser, UserPayload } from '../../../../common/utils/user-payload.decorator';
import { type GetBugHunterProgressPort } from '../../../application/ports/inbound/getBugHunterProgress.port';
import { GET_BUG_HUNTER_PROGRESS_PORT } from '../../../infrastructure/tokens';
import { UnlockedLevelRes } from '@funcode/shared';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('practice/bug-hunter')
export class BugHunterController {
    constructor(
        @Inject(GET_BUG_HUNTER_PROGRESS_PORT)
        private readonly getBugHunterProgressUC: GetBugHunterProgressPort,
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
}