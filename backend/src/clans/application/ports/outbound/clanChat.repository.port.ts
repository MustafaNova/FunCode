import { SaveClanMessageData } from './data/saveClanMessage.data';
import { ClanMessageData } from './data/clanMessage.data';
import { GetMessagesData } from './data/GetMessagesData';

export interface ClanChatRepositoryPort {
    saveMessage(data: SaveClanMessageData): Promise<ClanMessageData>;
    getMessages(data: GetMessagesData): Promise<ClanMessageData[]>;
}