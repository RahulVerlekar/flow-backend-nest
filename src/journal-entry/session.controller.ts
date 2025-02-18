import { Controller, Get, Param, Post, Request } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionModel } from '../domain/models/session.model';
import { UserModel } from '../domain/models/user.model';
import { JournalEntryService } from './journal-entry.service';
import { QuestionService } from '../questions/questions.service';
import { JournalEntryModel } from 'src/domain/models/journal-entry.model';
import { QuestionModel } from 'src/domain/models/question.model';
import { GroqAIService } from 'src/groq/groq.service';

@Controller('sessions')
export class SessionController {
    constructor(
        private readonly sessionService: SessionService,
        private readonly journalService: JournalEntryService,
        private readonly questionService: QuestionService,
        private readonly aiService: GroqAIService) { }

    @Get()
    async getUserSessions(@Request() req) {
        return await this.sessionService.findByUserId(req.user.userId);
    }

    //Start a new session 
    @Get('start')
    async startNewSession(@Request() req) {
        const session = new SessionModel()
        session.startTime = new Date()
        session.endTime = new Date()
        session.user = new UserModel()
        session.user.id = req.user.userId
        return await this.sessionService.create(session);
    }

    //End a session
    @Get(':sessionid/end')
    async endSession(
        @Request() req,
        @Param('sessionid') sessionId: string
    ) {
        return await this.sessionService.endSession(sessionId);
    }

    //add journal entries to a session
    // @Get(':sessionid/add-entry')
    // async addEntryToSession(@Request() req, @Param('sessionid') sessionId: string) {
    //     return await this.sessionService.addEntry(sessionId);
    // }

    //Get next question for a session
    @Get(':sessionid/next-question')
    async getNextQuestion(@Request() req, @Param('sessionid') sessionId: string) {
        const entries = await this.getEntriesForSession(req, sessionId);
        //create a new journal entry
        const entry = new JournalEntryModel()
        const question = new QuestionModel()
        if (entries.length == 0) {
            question.hint = "This is the hint to the next question"
            question.question = "Hello, How can I help ?"
        }
        else {
            const response = await this.aiService.getNextQuestionAsJson(entries)
            //parse the json from response and get the question and hint key
            const json = JSON.parse(response)
            question.question = json.question
            question.hint = json.hint
            entry.emotion_score = json.emotions_score
            entry.keywords = json.keywords.toString()
            entry.summary = json.summary
        }
        entry.question = (await this.questionService.create(question)).toModel()
        entry.entry = ""
        entry.session = await this.sessionService.findOne(sessionId)
        await this.journalService.create(entry)
        return await this.getEntriesForSession(req, sessionId);
    }

    //Add answer to a question in a session
    @Post(':sessionid/add-answer/:entryid')
    async addAnswerToQuestion(
        @Request() req,
        @Param('sessionid') sessionId: string,
        @Param('entryid') entryId: string,
    ) {
        const entry = new JournalEntryModel()
        entry.id = entryId
        entry.entry = req.body.answer
        return await this.journalService.update(entry);
        // return await this.sessionService.addAnswer(sessionId, entryId, req.body.answer);
    }

    //get all entries for the session
    @Get(':sessionid/entries')
    async getEntriesForSession(@Request() req, @Param('sessionid') sessionId: string) {
        const entries = await this.journalService.findBySessionId(sessionId);
        return entries.map(entry => entry.toModel());
    }
}
