import { GetClanMessagesCmd } from '../../use-cases/getClanMessages/getClanMessages.cmd';
import { ClanMsg } from '@funcode/shared';

export interface GetClanMessagesPort {
    getClanMessages(cmd: GetClanMessagesCmd): Promise<ClanMsg[]>;
}