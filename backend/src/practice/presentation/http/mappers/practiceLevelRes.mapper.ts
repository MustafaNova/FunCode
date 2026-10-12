import {
    GetPracticeLevelResult
} from '../../../application/use-cases/shared/getPracticeLevel/getPracticeLevelResult/getPracticeLevelResult';
import { GetPracticeLevelRes } from '@funcode/shared';

export function mapPracticeLevelResultToRes(
    result: GetPracticeLevelResult,
): GetPracticeLevelRes {
    switch (result.gameMode) {
        case 'bug-hunter':
            return {
                gameMode: result.gameMode,
                levelNumber: result.levelNumber,
                description: result.description,
                initialCode: result.initialCode,
                language: result.language,
            };

        case 'code-golf':
            return {
                gameMode: result.gameMode,
                levelNumber: result.levelNumber,
                description: result.description,
                initialCode: result.initialCode,
                language: result.language,
                maxCharacters: result.maxCharacters,
            };
    }
}