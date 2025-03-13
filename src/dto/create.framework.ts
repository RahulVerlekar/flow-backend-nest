import { IsString, IsNotEmpty, IsOptional, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFrameworkQuestionDto {
    @IsString()
    @IsNotEmpty()
    questionId: string;

    @IsNumber()
    @IsNotEmpty()
    order: number;
}

export class CreateFrameworkDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateFrameworkQuestionDto)
    frameworkQuestions?: CreateFrameworkQuestionDto[];
}