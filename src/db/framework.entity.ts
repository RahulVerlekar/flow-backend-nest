import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { FrameworkQuestionEntity } from "../db/framework-question.entity";
import { EntityMapper } from "../common/base.entity";
import { FrameworkModel } from "src/domain/models/framework.model";

@Entity()
export class FrameworkEntity implements EntityMapper<FrameworkModel> {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @OneToMany(() => FrameworkQuestionEntity, (frameworkQuestion) => frameworkQuestion.framework)
    frameworkQuestions: FrameworkQuestionEntity[];

    copy(model: FrameworkModel) {
        this.id = model.id;
        this.title = model.title;
        this.description = model.description;
        return this;
    }

    toModel(): FrameworkModel {
        const model = new FrameworkModel();
        model.id = this.id;
        model.title = this.title;
        model.description = this.description;
        model.questions = this.frameworkQuestions.map(obj => obj.toModel());
        return model;
    }

}
