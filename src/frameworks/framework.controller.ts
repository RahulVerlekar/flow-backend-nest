import { Controller, Get, Post, Put, Delete, Param, Body, HttpStatus, HttpException } from "@nestjs/common";
import { BaseController } from "../common/base.controller";
import { FrameworkModel } from "../domain/models/framework.model";
import { FrameworkService } from "./framework.service";
import { CreateFrameworkDto } from "../dto/create.framework";

@Controller('frameworks')
export class FrameworkController extends BaseController<FrameworkModel> {
    constructor(private readonly frameworkService: FrameworkService) {
        super(frameworkService);
    }

    @Get('with-questions')
    async findAllWithQuestions(): Promise<FrameworkModel[]> {
        try {
            return this.frameworkService.findAllWithQuestions();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id/with-questions')
    async findOneWithQuestions(@Param('id') id: string): Promise<FrameworkModel> {
        try {
            const framework = await this.frameworkService.findOneWithQuestions(id);
            if (!framework) {
                throw new HttpException('Framework not found', HttpStatus.NOT_FOUND);
            }
            return framework;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('with-questions')
    async createWithQuestions(@Body() createFrameworkDto: CreateFrameworkDto): Promise<FrameworkModel> {
        try {
            const framework = await this.frameworkService.createWithQuestions(createFrameworkDto);
            return framework.toModel();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id/with-questions')
    async updateWithQuestions(
        @Param('id') id: string,
        @Body() updateFrameworkDto: CreateFrameworkDto
    ): Promise<FrameworkModel> {
        try {
            const framework = await this.frameworkService.updateWithQuestions(id, updateFrameworkDto);
            if (!framework) {
                throw new HttpException('Framework not found', HttpStatus.NOT_FOUND);
            }
            return framework.toModel();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id/with-questions')
    async removeWithQuestions(@Param('id') id: string): Promise<void> {
        try {
            await this.frameworkService.deleteWithQuestions(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
