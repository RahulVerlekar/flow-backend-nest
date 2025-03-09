import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1741551425974 implements MigrationInterface {
    name = 'Migrations1741551425974'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_journal_entry_entity" ("id" varchar PRIMARY KEY NOT NULL, "entry" varchar NOT NULL, "userId" integer, "questionId" varchar, "sessionId" varchar, "summary" varchar NOT NULL DEFAULT (''), "keywords" varchar NOT NULL DEFAULT (''), "emotion_score" json NOT NULL DEFAULT ('{}'), CONSTRAINT "FK_b9b7b635b80e6b679370f2c5fc6" FOREIGN KEY ("userId") REFERENCES "user_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_26dc26b40a8e1ba833eae8eac40" FOREIGN KEY ("questionId") REFERENCES "question_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_a6170acbded830663cc81feb855" FOREIGN KEY ("sessionId") REFERENCES "session_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_journal_entry_entity"("id", "entry", "userId", "questionId", "sessionId", "summary", "keywords", "emotion_score") SELECT "id", "entry", "userId", "questionId", "sessionId", "summary", "keywords", "emotion_score" FROM "journal_entry_entity"`);
        await queryRunner.query(`DROP TABLE "journal_entry_entity"`);
        await queryRunner.query(`ALTER TABLE "temporary_journal_entry_entity" RENAME TO "journal_entry_entity"`);
        await queryRunner.query(`CREATE TABLE "temporary_session_entity" ("id" varchar PRIMARY KEY NOT NULL, "startTime" datetime NOT NULL, "endTime" datetime NOT NULL, "userId" integer, "summaryTitle" varchar NOT NULL DEFAULT (''), "summary" varchar NOT NULL DEFAULT (''), "frameworkTitle" varchar NOT NULL DEFAULT ('Random Log'), "keywords" varchar NOT NULL DEFAULT (''), "emotion_score" text NOT NULL DEFAULT ('{}'), "quote" varchar NOT NULL DEFAULT (''), CONSTRAINT "FK_8118675718bebb455bba4caf129" FOREIGN KEY ("userId") REFERENCES "user_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_session_entity"("id", "startTime", "endTime", "userId") SELECT "id", "startTime", "endTime", "userId" FROM "session_entity"`);
        await queryRunner.query(`DROP TABLE "session_entity"`);
        await queryRunner.query(`ALTER TABLE "temporary_session_entity" RENAME TO "session_entity"`);
        await queryRunner.query(`CREATE TABLE "temporary_journal_entry_entity" ("id" varchar PRIMARY KEY NOT NULL, "entry" varchar NOT NULL, "userId" integer, "questionId" varchar, "sessionId" varchar, "summary" varchar NOT NULL DEFAULT (''), "keywords" varchar NOT NULL DEFAULT (''), "emotion_score" text NOT NULL DEFAULT ('{}'), CONSTRAINT "FK_b9b7b635b80e6b679370f2c5fc6" FOREIGN KEY ("userId") REFERENCES "user_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_26dc26b40a8e1ba833eae8eac40" FOREIGN KEY ("questionId") REFERENCES "question_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_a6170acbded830663cc81feb855" FOREIGN KEY ("sessionId") REFERENCES "session_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_journal_entry_entity"("id", "entry", "userId", "questionId", "sessionId", "summary", "keywords", "emotion_score") SELECT "id", "entry", "userId", "questionId", "sessionId", "summary", "keywords", "emotion_score" FROM "journal_entry_entity"`);
        await queryRunner.query(`DROP TABLE "journal_entry_entity"`);
        await queryRunner.query(`ALTER TABLE "temporary_journal_entry_entity" RENAME TO "journal_entry_entity"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "journal_entry_entity" RENAME TO "temporary_journal_entry_entity"`);
        await queryRunner.query(`CREATE TABLE "journal_entry_entity" ("id" varchar PRIMARY KEY NOT NULL, "entry" varchar NOT NULL, "userId" integer, "questionId" varchar, "sessionId" varchar, "summary" varchar NOT NULL DEFAULT (''), "keywords" varchar NOT NULL DEFAULT (''), "emotion_score" json NOT NULL DEFAULT ('{}'), CONSTRAINT "FK_b9b7b635b80e6b679370f2c5fc6" FOREIGN KEY ("userId") REFERENCES "user_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_26dc26b40a8e1ba833eae8eac40" FOREIGN KEY ("questionId") REFERENCES "question_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_a6170acbded830663cc81feb855" FOREIGN KEY ("sessionId") REFERENCES "session_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "journal_entry_entity"("id", "entry", "userId", "questionId", "sessionId", "summary", "keywords", "emotion_score") SELECT "id", "entry", "userId", "questionId", "sessionId", "summary", "keywords", "emotion_score" FROM "temporary_journal_entry_entity"`);
        await queryRunner.query(`DROP TABLE "temporary_journal_entry_entity"`);
        await queryRunner.query(`ALTER TABLE "session_entity" RENAME TO "temporary_session_entity"`);
        await queryRunner.query(`CREATE TABLE "session_entity" ("id" varchar PRIMARY KEY NOT NULL, "startTime" datetime NOT NULL, "endTime" datetime NOT NULL, "userId" integer, CONSTRAINT "FK_8118675718bebb455bba4caf129" FOREIGN KEY ("userId") REFERENCES "user_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "session_entity"("id", "startTime", "endTime", "userId") SELECT "id", "startTime", "endTime", "userId" FROM "temporary_session_entity"`);
        await queryRunner.query(`DROP TABLE "temporary_session_entity"`);
        await queryRunner.query(`ALTER TABLE "journal_entry_entity" RENAME TO "temporary_journal_entry_entity"`);
        await queryRunner.query(`CREATE TABLE "journal_entry_entity" ("id" varchar PRIMARY KEY NOT NULL, "entry" varchar NOT NULL, "userId" integer, "questionId" varchar, "sessionId" varchar, "summary" varchar NOT NULL DEFAULT (''), "keywords" varchar NOT NULL DEFAULT (''), "emotion_score" json NOT NULL DEFAULT ('{}'), CONSTRAINT "FK_b9b7b635b80e6b679370f2c5fc6" FOREIGN KEY ("userId") REFERENCES "user_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_26dc26b40a8e1ba833eae8eac40" FOREIGN KEY ("questionId") REFERENCES "question_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_a6170acbded830663cc81feb855" FOREIGN KEY ("sessionId") REFERENCES "session_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "journal_entry_entity"("id", "entry", "userId", "questionId", "sessionId", "summary", "keywords", "emotion_score") SELECT "id", "entry", "userId", "questionId", "sessionId", "summary", "keywords", "emotion_score" FROM "temporary_journal_entry_entity"`);
        await queryRunner.query(`DROP TABLE "temporary_journal_entry_entity"`);
    }

}
