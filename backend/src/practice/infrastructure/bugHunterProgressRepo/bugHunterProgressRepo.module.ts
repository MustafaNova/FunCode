import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BugHunterProgressEntity } from './bugHunterProgress.entity';

@Module({
    imports: [TypeOrmModule.forFeature([BugHunterProgressEntity])]
})
export class BugHunterProgressRepoModule {}