import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FrameworkEntity } from "../db/framework.entity";
import { FrameworkController } from "./framework.controller";
import { FrameworkService } from "./framework.service";
import { FrameworkQuestionEntity } from "../db/framework-question.entity";
import { QuestionEntity } from "../db/question.entity";

@Module({
    imports: [TypeOrmModule.forFeature([
        FrameworkEntity,
        FrameworkQuestionEntity,
        QuestionEntity
    ])],
    providers: [FrameworkService],
    controllers: [FrameworkController],
    exports: [FrameworkService]
})
export class FrameworkModule {}
