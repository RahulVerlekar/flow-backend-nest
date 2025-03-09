import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Groq from 'groq-sdk';
import { ChatCompletion, CompletionCreateParams } from 'groq-sdk/resources/chat';

import { ChatMessage, ChatMessageType, ChatModelCodeMessage } from '../domain/models/chat.model';
import { CodeType, RawCode } from '../domain/models/code.model';
import { JournalEntryModel } from 'src/domain/models/journal-entry.model';


@Injectable()
export class GroqAIService {

    apiKey: string;
    client: Groq;
    model: string = "llama-3.1-8b-instant"

    constructor(configService: ConfigService) {
        this.apiKey = configService.get<string>('GROQ_API_KEY');
        this.client = new Groq({
            apiKey: this.apiKey

          })
    }

    //Get next Question from the LLM, Based on all the question answers that are given already
    async getNextQuestion(entries: JournalEntryModel[]): Promise<string> {
        const assistantRole = "You are a compassionate daily journaling assistant with expertise in psychology, designed to encourage self-reflection and personal growth. Based on the user's previous responses, generate a short yet meaningful follow-up question that gently guides the conversation deeper. The question should feel natural, avoid repetition, and align with the user’s emotional and cognitive state. "
          +"Maintain a warm and supportive tone, making the user feel heard and valued. If the user's concerns seem resolved or their journaling objective appears met, gracefully conclude the session with a thoughtful closing remark, such as a thank you or a positive affirmation, ensuring they leave feeling good about their progress."
        const history = entries.map((entry) => {
            const data = "question : "+entry.question.question + " answer : "+entry.entry+"----\n"
            return {
                role: 'user',
                content: data
            }
        })
        const assistant = {
            role: 'system',
            content: assistantRole
        } as CompletionCreateParams.Message
        const completion: ChatCompletion = await this.client.chat.completions.create({
            model: this.model,
            messages: [
                assistant,
                ...history
            ],

        })
        const [content] = completion.choices.map((choice) => choice.message.content);
        return content;
    }

    //get a details question and score
    async getNextQuestionAsJson(entries: JournalEntryModel[]): Promise<string> {
        const assistantRole = "You are a compassionate daily journaling assistant with expertise in psychology, designed to encourage self-reflection and personal growth. Based on the user's previous responses, generate a short yet meaningful follow-up question that gently guides the conversation deeper. The question should feel natural, avoid repetition, and align with the users emotional and cognitive state. Maintain a warm and supportive tone, making the user feel heard and valued. If the user's concerns seem resolved or their journaling objective appears met, gracefully conclude the session with a thoughtful closing remark, such as a thank you or a positive affirmation, ensuring they leave feeling good about their progress. The json format is as like so"+
        " {\"question\": This is a short/medium response that will be spoken to the user,"+
        " \"hint\": This will be the longer hint that might include examples of what we expect, Wont be spoken but only shown as text,"+
        " \"summary\": This will be the thread summary of all the messages that were sent and the understanding of the messages,"+
        " \"emotions_score\":This will be nested object with each emotion as they key and the score as the value from 0-1 make sure you take the whole conversation into consideration,"+
        " \"keywords\": This will be all the keywords that are important in the conversation that are shared by the user only,"+
        " \"quote\": Fetch or write a small motivational quote about the conversation,"+
        " \"oneline_summary\": This will be the thread one line short summary of what this is about}"

        const history: CompletionCreateParams.Message[] = entries.flatMap((entry) => {
            return [
                {
                    role: 'assistant',
                    content: entry.question.question
                } as CompletionCreateParams.Message,
                {
                    role: 'user',
                    content: entry.entry
                } as CompletionCreateParams.Message
            ]
        })

        const assistant = {
            role: 'system',
            content: assistantRole
        } as CompletionCreateParams.Message
        
        const completion: ChatCompletion = await this.client.chat.completions.create({
            model: this.model,
            response_format: {type: 'json_object'},
            messages: [
                assistant,
                ...history
            ]
        })
        const [content] = completion.choices.map((choice) => choice.message.content);
        return content;
    }

}


