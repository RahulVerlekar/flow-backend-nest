import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { UserEntity } from "./user.entity";
import { JournalEntryEntity } from "./journal-entry.entity";
import { EntityMapper } from "../common/base.entity";
import { SessionModel } from "src/domain/models/session.model";

@Entity()
export class SessionEntity implements EntityMapper<SessionModel> {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    startTime: Date;

    @Column()
    endTime: Date;

    @ManyToOne(() => UserEntity, (user) => user.sessions)
    user: UserEntity;

    @OneToMany(() => JournalEntryEntity, (entry) => entry.session)
    journalEntries: JournalEntryEntity[];

    @Column({ default: '' })
    summaryTitle: string;

    @Column({ default: '' })
    summary: string;

    @Column({ default: 'Random Log' })
    frameworkTitle: string;

    @Column({ default: '' })
    keywords: string;

    @Column({ type: 'simple-json', default: '{}' })
    emotion_score: any;

    @Column({ default: '' })
    quote: string;  // new field for a quote

    copy(model: SessionModel) {
        this.id = model.id;
        this.startTime = model.startTime;
        this.endTime = model.endTime;
        this.user = model.user as UserEntity;
        this.journalEntries = model.journalEntries as JournalEntryEntity[];
        this.summaryTitle = model.summaryTitle;
        this.summary = model.summary;
        this.frameworkTitle = model.frameworkTitle;
        this.keywords = model.keywords;
        this.emotion_score = model.emotion_score;
        this.quote = model.quote;  // copy the new field
        return this;
    }

    toModel(): SessionModel {
        const model = new SessionModel();
        model.id = this.id;
        model.startTime = this.startTime;
        model.endTime = this.endTime;
        model.user = this.user;
        model.journalEntries = this.journalEntries;
        model.summaryTitle = this.summaryTitle;
        model.summary = this.summary;
        model.frameworkTitle = this.frameworkTitle;
        model.keywords = this.keywords;
        model.emotion_score = this.emotion_score;
        model.quote = this.quote;  // map the new field
        return model;
    }
}
