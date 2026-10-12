import { Body, Controller, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser, UserPayload } from '../../../../common/utils/user-payload.decorator';
import { type SubmitCodeGolfSolutionReq, SubmitCodeGolfSolRes } from '@funcode/shared';
import { type SubmitCodeGolfSolutionPort } from '../../../application/ports/inbound/submitCodeGolfSolution.port';
import { SUBMIT_CODE_GOLF_SOLUTION_PORT } from '../../../infrastructure/tokens';

@UseGuards(AuthGuard('jwt'))
@Controller('practice/code-golf')
export class CodeGolfController {
    constructor(
        @Inject(SUBMIT_CODE_GOLF_SOLUTION_PORT)
        private readonly submitCodeGolfSolUC: SubmitCodeGolfSolutionPort
    ) {}


    @Post('levels/:levelId/submit')
    async submit(
        @Param('levelId') levelId: string,
        @Body() payload: SubmitCodeGolfSolutionReq,
        @UserPayload() user: AuthUser,
    ): Promise<SubmitCodeGolfSolRes> {
        const submitRes = await this.submitCodeGolfSolUC.submit({
            userId: user.userId,
            code: payload.code,
            levelId
        })

        return {
            success: submitRes.success
        }
    }

}