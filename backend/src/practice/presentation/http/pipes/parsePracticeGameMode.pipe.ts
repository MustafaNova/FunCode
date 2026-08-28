import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { PRACTICE_GAME_MODES, PracticeGameMode } from '@funcode/shared';

@Injectable()
export class ParsePracticeGameModePipe
    implements PipeTransform<string, PracticeGameMode> {

    transform(value: string): PracticeGameMode {
        if (!PRACTICE_GAME_MODES.includes(value as PracticeGameMode)) {
            throw new BadRequestException();
        }

        return value as PracticeGameMode;
    }
}