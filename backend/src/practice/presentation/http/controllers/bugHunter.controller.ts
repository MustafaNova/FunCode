import { Body, Controller, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { AuthUser, UserPayload } from '../../../../common/utils/user-payload.decorator';
import {
    SUBMIT_BUG_HUNTER_SOLUTION_PORT
} from '../../../infrastructure/tokens';
import {
    SubmitBugHunterSolRes,
    type SubmitBugHunterSolutionReq,
} from '@funcode/shared';
import { AuthGuard } from '@nestjs/passport';
import { type SubmitBugHunterSolutionPort } from '../../../application/ports/inbound/submitBugHunterSolution.port';

@UseGuards(AuthGuard('jwt'))
@Controller('practice/bug-hunter')
export class BugHunterController {
    constructor(
        @Inject(SUBMIT_BUG_HUNTER_SOLUTION_PORT)
        private readonly submitBugHunterSolUC: SubmitBugHunterSolutionPort
    ) {}


    @Post('levels/:levelId/submit')
    async submit(
        @Param('levelId') levelId: string,
        @Body() payload: SubmitBugHunterSolutionReq,
        @UserPayload() user: AuthUser,
    ): Promise<SubmitBugHunterSolRes> {
        const res = await this.submitBugHunterSolUC.submit({
            levelId,
            code: payload.code,
            userId: user.userId,
        })

        return {
            success: res.success
        }
    }

}