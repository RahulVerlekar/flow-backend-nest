import { BaseModel } from "../../common/base.model";
import { JournalEntryModel } from "./journal-entry.model";
import { UserModel } from "./user.model";
import { FrameworkModel } from "./framework.model";

export class SessionModel extends BaseModel {
    id: string;
    startTime: Date;
    endTime: Date;
    user?: UserModel;
    journalEntries?: JournalEntryModel[];
    sessionTitle: string;
    summaryTitle: string;
    summary: string;
    type: 'Freestyle' | 'FrameworkAided';
    framework?: FrameworkModel;
    keywords: string;
    emotion_score: any;
    quote: string;
}
