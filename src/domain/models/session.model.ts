import { BaseModel } from "../../common/base.model";
import { JournalEntryModel } from "./journal-entry.model";
import { UserModel } from "./user.model";

export class SessionModel extends BaseModel {
    id: string;
    startTime: Date;
    endTime: Date;
    user?: UserModel;
    journalEntries?: JournalEntryModel[];
    summaryTitle: string;
    summary: string;
    frameworkTitle: string = "Random Log";
    keywords: string;     // new field for comma-separated keywords
    emotion_score: any;   // new field to store JSON emotion scores
    quote: string;        // new field for a quote
}
