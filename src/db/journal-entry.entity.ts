import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity";
import { QuestionEntity } from "../db/question.entity";
import { SessionEntity } from "../db/session.entity";
import { EntityMapper } from "../common/base.entity";
import { JournalEntryModel } from "src/domain/models/journal-entry.model";

@Entity()
export class JournalEntryEntity implements EntityMapper<JournalEntryModel> {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    entry: string;

    @ManyToOne(() => UserEntity, (user) => user.journalEntries)
    user: UserEntity;

    @ManyToOne(() => QuestionEntity, (question) => question.journalEntries)
    question: QuestionEntity;

    @ManyToOne(() => SessionEntity, (session) => session.journalEntries)
    session: SessionEntity;

    @Column({ default: '' })
    summary: string;

    @Column({ default: '' })
    keywords: string;

    @Column({ type: 'simple-json', default: '{}' })
    emotion_score: any;

    copy(model: JournalEntryModel) {
        this.id = model.id;
        this.entry = model.entry;
        this.user = model.user as UserEntity;
        this.question = model.question as QuestionEntity;
        this.session = model.session as SessionEntity;
        this.summary = model.summary;
        this.keywords = model.keywords;
        this.emotion_score = model.emotion_score;
        return this;
    }

    toModel(): JournalEntryModel {
        const model = new JournalEntryModel();
        model.id = this.id;
        model.entry = this.entry;
        model.user = this.user;
        model.question = this.question;
        model.session = this.session;
        model.summary = this.summary;
        model.keywords = this.keywords;
        model.emotion_score = this.emotion_score;
        return model;
    }
}
