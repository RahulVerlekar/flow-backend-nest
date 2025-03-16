import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JournalEntryEntity } from '../db/journal-entry.entity';
import { SessionEntity } from 'src/db/session.entity';
import { BaseService } from 'src/common/base.service';
import { SessionModel } from 'src/domain/models/session.model';
import { UserEntity } from 'src/db/user.entity';
import { QuestionEntity } from 'src/db/question.entity';

@Injectable()
export class SessionService extends BaseService<SessionEntity, SessionModel> {

    constructor(
        @InjectRepository(SessionEntity)
        private repo: Repository<SessionEntity>
    ) {
        super(repo, SessionEntity);
    }

    //start a new session and return it back
    async startSession(userId: string): Promise<SessionModel> {
        const session = new SessionEntity();
        session.startTime = new Date();
        const user = new UserEntity();
        user.id = +userId;
        session.user = user;
        session.summaryTitle = '';
        session.summary = '';
        session.sessionTitle = 'Random Log';
        session.keywords = '';
        session.emotion_score = {};
        session.quote = '';  // initialize the new field
        return this.create(session.toModel());
    }

    async findByUserId(id: number): Promise<SessionModel[]> {
        const entities = await this.repo.find({ where: { user: { id } } });
        return entities.map(entity => entity.toModel());
    }

    async endSession(id: string): Promise<SessionModel> {
        const session = await this.repo.findOne({ where: { id: id } });
        session.endTime = new Date();
        return this.update(session.toModel());
    }

    async addEntry(id: string, entryId: string, entry: string): Promise<SessionModel> {
        const session = await this.repo.findOne({ where: { id: id } });
        const journalEntry = new JournalEntryEntity();
        journalEntry.id = entryId;
        journalEntry.entry = entry;
        journalEntry.summary = "";      // default summary empty
        journalEntry.keywords = "";     // default keywords empty
        journalEntry.emotion_score = {}; // default emotion score as empty JSON
        session.journalEntries.push(journalEntry);
        return this.update(session.toModel());
    }

    async getNextQuestion(id: string): Promise<SessionModel> {
        //if session has framework, get next question from framework else get next question from default
        const session = await this.repo.findOne({ where: { id: id } });
        const entry = await this.processAnswerForNextQuestion();
        if (!session.journalEntries) {
            session.journalEntries = [];
        }
        session.journalEntries.push(entry);
        return this.update(session.toModel());
    }

    async addAnswer(id: string, entryId: string, answer: string): Promise<SessionModel> {   
        const session = await this.repo.findOne({ where: { id: id } });
        const entry = session.journalEntries.find(e => e.id === entryId);
        entry.entry = answer;
        return this.update(session.toModel());
    }

    async processAnswerForNextQuestion(): Promise<JournalEntryEntity> {
        const entry = new JournalEntryEntity();
        entry.entry = '';
        entry.summary = "";      // default summary empty
        entry.keywords = "";     // default keywords empty
        entry.emotion_score = {}; // default emotion score as empty JSON
        const question = new QuestionEntity()
        question.hint = 'This is the hint';
        question.question = 'This is the question';
        entry.question = question;
        return entry;
    }

    async getEntries(sessionId: string): Promise<JournalEntryEntity[]> {
        const session = await this.repo.findOne({ where: { id: sessionId } , relations: ['journalEntries'], loadRelationIds: true});
        return session.journalEntries;
    }

    async getLastEntries(userId: string): Promise<Array<{ sessionId: string, lastEntry: any }>> {
        const sessions = await this.repo.find({
            where: { user: { id: +userId } },
            relations: ['journalEntries'],
            loadRelationIds: false
        });
        return sessions.map(session => ({
            sessionId: session.id,
            lastEntry: session.journalEntries && session.journalEntries.length 
                ? session.journalEntries[session.journalEntries.length - 1]
                : null
        }));
    }
}
