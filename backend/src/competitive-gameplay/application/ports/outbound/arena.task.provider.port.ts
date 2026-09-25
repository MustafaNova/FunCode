import { ArenaGameModeId, ArenaTaskDto } from '@funcode/shared';

export interface ArenaTaskProviderPort {
    getRandomTaskDto(gameModeId: ArenaGameModeId): ArenaTaskDto;
}