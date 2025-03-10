import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JournalEntryEntity } from '../db/journal-entry.entity';
import { BaseService } from 'src/common/base.service';
import { JournalEntryModel } from 'src/domain/models/journal-entry.model';

@Injectable()
export class JournalEntryService extends BaseService<JournalEntryEntity, JournalEntryModel> {
    constructor(
        @InjectRepository(JournalEntryEntity)
        private journalEntryRepository: Repository<JournalEntryEntity>
    ) {
        super(journalEntryRepository, JournalEntryEntity);
    }

    // async create(data: {
    //     entry: string,
    //     userId: string,
    //     questionId: string,
    //     sessionId: string
    // }) {
    //     const journalEntry = this.journalEntryRepository.create({
    //         entry: data.entry,
    //         user: { id: +data.userId },
    //         question: { id: data.questionId },
    //         session: { id: data.sessionId }
    //     });
    //     this.journalEntryRepository.create()
    //     return await this.journalEntryRepository.save(journalEntry);
    // }

    async findByUserId(userId: string) {
        return await this.journalEntryRepository.find({
            where: { user: { id: +userId } },
            relations: ['question', 'session']
        });
    }

    async findBySessionId(sessionId: string) {
        return await this.journalEntryRepository.find({
            where: { session: { id: sessionId } },
            relations: ['question']
        }).then(entries => {
            return entries.map(entry => {
                return entry.toModel();
            })})
    }
    
}
