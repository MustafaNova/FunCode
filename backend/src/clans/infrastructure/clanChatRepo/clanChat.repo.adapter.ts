import { ClanChatRepositoryPort } from '../../application/ports/outbound/clanChat.repository.port';
import { SaveClanMessageData } from '../../application/ports/outbound/data/saveClanMessage.data';
import { ClanMessageData } from '../../application/ports/outbound/data/clanMessage.data';
import { LessThan, Repository } from 'typeorm';
import { ClanMessageEntity } from '../entities/clan-message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetMessagesData } from '../../application/ports/outbound/data/GetMessagesData';


export class ClanChatRepoAdapter implements ClanChatRepositoryPort {
    constructor(
        @InjectRepository(ClanMessageEntity)
        private readonly clanChatRepo: Repository<ClanMessageEntity>,
    ) {}

    async saveMessage(data: SaveClanMessageData): Promise<ClanMessageData> {
        const entity = this.clanChatRepo.create({
            clanId: data.clanId,
            username: data.username,
            userId: data.userId,
            message: data.message,
        })

        const savedEntity = await this.clanChatRepo.save(entity);

        return {
            messageId: savedEntity.messageId,
            clanId: savedEntity.clanId,
            userId: savedEntity.userId,
            username: savedEntity.username,
            message: savedEntity.message,
            createdAt: savedEntity.createdAt,
        }
    }

    async getMessages(data: GetMessagesData): Promise<ClanMessageData[]> {
        if (data.before) {
            const beforeMsg = await this.clanChatRepo.findOne({
                where: { messageId: data.before }
            });

            if (!beforeMsg) return [];

            const messages = await this.clanChatRepo.find({
                where: {
                    clanId: data.clanId,
                    createdAt: LessThan(beforeMsg.createdAt),
                },
                order: {
                    createdAt: 'DESC'
                },
                take: data.limit
            })
            return this.toClanMessageData(messages)
        }

        const messages = await this.clanChatRepo.find({
            where: { clanId: data.clanId },
            order: {
                createdAt: 'DESC',
            },
            take: data.limit
        })
        return this.toClanMessageData(messages)
    }

    private toClanMessageData(messages: ClanMessageEntity[]): ClanMessageData[] {
        return messages.map(msg => ({
            messageId: msg.messageId,
            clanId: msg.clanId,
            userId: msg.userId,
            username: msg.username,
            message: msg.message,
            createdAt: msg.createdAt
        }))
    }
}