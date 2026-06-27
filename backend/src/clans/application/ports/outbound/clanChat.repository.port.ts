import { SaveClanMessageData } from './data/saveClanMessage.data';
import { ClanMessageData } from './data/clanMessage.data';

export interface ClanChatRepositoryPort {
    saveMessage(data: SaveClanMessageData): Promise<ClanMessageData>;
}