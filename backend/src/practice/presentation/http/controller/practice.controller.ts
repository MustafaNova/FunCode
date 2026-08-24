import { Controller, Get, Param, ParseEnumPipe } from '@nestjs/common';
import { PracticeGameMode } from '../../../domain/enums/practiceGameMode';
import { AuthUser, UserPayload } from '../../../../common/utils/user-payload.decorator';


@Controller('practice')
export class PracticeController {

    @Get(':gameMode/progress')
    getProgress(
        @Param('gameMode', new ParseEnumPipe(PracticeGameMode))
        gameMode: PracticeGameMode,
        @UserPayload() user: AuthUser
    ) {

    }
}