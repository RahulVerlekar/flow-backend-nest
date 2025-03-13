import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "../common/base.service";
import { FrameworkEntity } from "../db/framework.entity";
import { FrameworkModel } from "../domain/models/framework.model";
import { Repository } from "typeorm";
import { CreateFrameworkDto } from "../dto/create.framework";
import { FrameworkQuestionEntity } from "../db/framework-question.entity";
import { QuestionEntity } from "../db/question.entity";

@Injectable()
export class FrameworkService extends BaseService<FrameworkEntity, FrameworkModel> {
    constructor(
        @InjectRepository(FrameworkEntity)
        frameworkRepository: Repository<FrameworkEntity>,
        @InjectRepository(FrameworkQuestionEntity)
        private frameworkQuestionRepository: Repository<FrameworkQuestionEntity>,
        @InjectRepository(QuestionEntity)
        private questionRepository: Repository<QuestionEntity>
    ) {
        super(frameworkRepository, FrameworkEntity);
    }

    async findAllWithQuestions(): Promise<FrameworkModel[]> {
        const entities = await this.repository.find({
            relations: ['frameworkQuestions', 'frameworkQuestions.question']
        });
        return entities.map(entity => entity.toModel());
    }

    async findOneWithQuestions(id: string): Promise<FrameworkModel> {
        const entity = await this.repository.findOne({
            where: { id },
            relations: ['frameworkQuestions', 'frameworkQuestions.question']
        });
        return entity ? entity.toModel() : null;
    }

    async createWithQuestions(createFrameworkDto: CreateFrameworkDto): Promise<FrameworkEntity> {
        // Create the framework entity
        const frameworkEntity = new FrameworkEntity();
        frameworkEntity.title = createFrameworkDto.title;
        frameworkEntity.description = createFrameworkDto.description;

        // Save the framework to get an ID
        const savedFramework = await this.repository.save(frameworkEntity);

        // If questions are provided, create framework questions
        if (createFrameworkDto.frameworkQuestions && createFrameworkDto.frameworkQuestions.length > 0) {
            for (const questionDto of createFrameworkDto.frameworkQuestions) {
                // Find the question
                const question = await this.questionRepository.findOne({ 
                    where: { id: questionDto.questionId } 
                });
                
                if (question) {
                    // Create the framework question entity
                    const frameworkQuestionEntity = new FrameworkQuestionEntity();
                    frameworkQuestionEntity.framework = savedFramework;
                    frameworkQuestionEntity.question = question;
                    frameworkQuestionEntity.order = questionDto.order;
                    
                    await this.frameworkQuestionRepository.save(frameworkQuestionEntity);
                }
            }
        }

        // Reload the framework with relations
        return this.repository.findOne({
            where: { id: savedFramework.id },
            relations: ['frameworkQuestions', 'frameworkQuestions.question']
        });
    }

    async updateWithQuestions(id: string, updateFrameworkDto: CreateFrameworkDto): Promise<FrameworkEntity> {
        // Find the framework
        const framework = await this.repository.findOne({
            where: { id },
            relations: ['frameworkQuestions']
        });

        if (!framework) {
            return null;
        }

        // Update basic framework properties
        if (updateFrameworkDto.title) framework.title = updateFrameworkDto.title;
        if (updateFrameworkDto.description) framework.description = updateFrameworkDto.description;
        
        // Save framework changes
        await this.repository.save(framework);

        // Handle framework questions update if provided
        if (updateFrameworkDto.frameworkQuestions) {
            // Remove existing framework questions
            if (framework.frameworkQuestions && framework.frameworkQuestions.length > 0) {
                await this.frameworkQuestionRepository.remove(framework.frameworkQuestions);
            }

            // Create new framework questions
            for (const questionDto of updateFrameworkDto.frameworkQuestions) {
                const question = await this.questionRepository.findOne({ 
                    where: { id: questionDto.questionId } 
                });
                
                if (question) {
                    const frameworkQuestionEntity = new FrameworkQuestionEntity();
                    frameworkQuestionEntity.framework = framework;
                    frameworkQuestionEntity.question = question;
                    frameworkQuestionEntity.order = questionDto.order;
                    
                    await this.frameworkQuestionRepository.save(frameworkQuestionEntity);
                }
            }
        }

        // Reload the framework with relations
        return this.repository.findOne({
            where: { id },
            relations: ['frameworkQuestions', 'frameworkQuestions.question']
        });
    }

    async deleteWithQuestions(id: string): Promise<void> {
        // Find the framework with its questions
        const framework = await this.repository.findOne({
            where: { id },
            relations: ['frameworkQuestions']
        });

        if (framework) {
            // Delete associated framework questions first
            if (framework.frameworkQuestions && framework.frameworkQuestions.length > 0) {
                await this.frameworkQuestionRepository.remove(framework.frameworkQuestions);
            }

            // Then delete the framework
            await this.repository.remove(framework);
        }
    }
}
