import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { SessionEntity } from '../db/session.entity';

@Module({
    imports: [TypeOrmModule.forFeature([SessionEntity])],
    providers: [SessionService],
    controllers: [SessionController],
    exports: [SessionService]
})
export class SessionModule {}
