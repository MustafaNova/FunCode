import { ClanChatRepositoryPort } from '../../application/ports/outbound/clanChat.repository.port';
import { SaveClanMessageData } from '../../application/ports/outbound/data/saveClanMessage.data';
import { ClanMessageData } from '../../application/ports/outbound/data/clanMessage.data';
import { Repository } from 'typeorm';
import { ClanMessageEntity } from '../entities/clan-message.entity';
import { InjectRepository } from '@nestjs/typeorm';


export class ClanChatRepoAdapter implements ClanChatRepositoryPort {
    constructor(
        @InjectRepository(ClanMessageEntity)
        private readonly clanChatRepo: Repository<ClanMessageEntity>,
    ) {}

    async saveMessage(data: SaveClanMessageData): Promise<ClanMessageData> {
        const entity = this.clanChatRepo.create({
            clanId: data.clanId,
            userId: data.userId,
            message: data.message,
        })

        const savedEntity = await this.clanChatRepo.save(entity);

        return {
            messageId: savedEntity.messageId,
            clanId: savedEntity.clanId,
            userId: savedEntity.userId,
            message: savedEntity.message,
            createdAt: savedEntity.createdAt,
        }
    }
}