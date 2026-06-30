import { GetClanMessagesPort } from '../../ports/inbound/getClanMessages.port';
import { GetClanMessagesCmd } from './getClanMessages.cmd';
import { ClanRepositoryPort } from '../../ports/outbound/clan.repository.port';
import { ClanChatRepositoryPort } from '../../ports/outbound/clanChat.repository.port';
import { ClanNotFoundError } from '../errors/ClanNotFoundError';
import { ClanMsg } from '@funcode/shared';


export class GetClanMessagesUC implements GetClanMessagesPort {
    constructor(
        private readonly clanRepo: ClanRepositoryPort,
        private readonly clanChatRepo: ClanChatRepositoryPort,
    ) {}

    async getClanMessages(cmd: GetClanMessagesCmd): Promise<ClanMsg[]> {
        console.log('arrived UC getClanMessages');
        const myClan = await this.clanRepo.getMyClan(cmd.userId);

        if (!myClan) {
            throw new ClanNotFoundError();
        }

        const messages = await this.clanChatRepo.getMessages({
            clanId: myClan.clanId,
            before: cmd.before,
            limit: cmd.limit,
        })

        return messages.map((msg) => ({
            messageId: msg.messageId,
            msg: msg.message,
            username: msg.username,
            clanRole: msg.clanRole,
            createdAt: msg.createdAt.toISOString(),
        }))

    }
}
