import { ArenaGameModeId, ArenaTask } from '@funcode/shared';

export interface ArenaTaskProviderPort {
    getRandomTask(gameModeId: ArenaGameModeId): ArenaTask;
}