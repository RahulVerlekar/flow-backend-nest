import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1741868342731 implements MigrationInterface {
    name = 'Migrations1741868342731'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_session_entity" ("id" varchar PRIMARY KEY NOT NULL, "startTime" datetime NOT NULL, "endTime" datetime NOT NULL, "userId" integer, "summaryTitle" varchar NOT NULL DEFAULT (''), "summary" varchar NOT NULL DEFAULT (''), "keywords" varchar NOT NULL DEFAULT (''), "emotion_score" text NOT NULL DEFAULT ('{}'), "quote" varchar NOT NULL DEFAULT (''), CONSTRAINT "FK_8118675718bebb455bba4caf129" FOREIGN KEY ("userId") REFERENCES "user_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_session_entity"("id", "startTime", "endTime", "userId", "summaryTitle", "summary", "keywords", "emotion_score", "quote") SELECT "id", "startTime", "endTime", "userId", "summaryTitle", "summary", "keywords", "emotion_score", "quote" FROM "session_entity"`);
        await queryRunner.query(`DROP TABLE "session_entity"`);
        await queryRunner.query(`ALTER TABLE "temporary_session_entity" RENAME TO "session_entity"`);
        await queryRunner.query(`CREATE TABLE "temporary_session_entity" ("id" varchar PRIMARY KEY NOT NULL, "startTime" datetime NOT NULL, "endTime" datetime NOT NULL, "userId" integer, "summaryTitle" varchar NOT NULL DEFAULT (''), "summary" varchar NOT NULL DEFAULT (''), "keywords" varchar NOT NULL DEFAULT (''), "emotion_score" text NOT NULL DEFAULT ('{}'), "quote" varchar NOT NULL DEFAULT (''), "sessionTitle" varchar NOT NULL DEFAULT (''), "type" varchar NOT NULL DEFAULT ('Freestyle'), "frameworkId" varchar, CONSTRAINT "FK_8118675718bebb455bba4caf129" FOREIGN KEY ("userId") REFERENCES "user_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_session_entity"("id", "startTime", "endTime", "userId", "summaryTitle", "summary", "keywords", "emotion_score", "quote") SELECT "id", "startTime", "endTime", "userId", "summaryTitle", "summary", "keywords", "emotion_score", "quote" FROM "session_entity"`);
        await queryRunner.query(`DROP TABLE "session_entity"`);
        await queryRunner.query(`ALTER TABLE "temporary_session_entity" RENAME TO "session_entity"`);
        await queryRunner.query(`CREATE TABLE "temporary_session_entity" ("id" varchar PRIMARY KEY NOT NULL, "startTime" datetime NOT NULL, "endTime" datetime NOT NULL, "userId" integer, "summaryTitle" varchar NOT NULL DEFAULT (''), "summary" varchar NOT NULL DEFAULT (''), "keywords" varchar NOT NULL DEFAULT (''), "emotion_score" text NOT NULL DEFAULT ('{}'), "quote" varchar NOT NULL DEFAULT (''), "sessionTitle" varchar NOT NULL DEFAULT (''), "type" varchar NOT NULL DEFAULT ('Freestyle'), "frameworkId" varchar, CONSTRAINT "FK_8118675718bebb455bba4caf129" FOREIGN KEY ("userId") REFERENCES "user_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_9684ea1a3c8f05fcf1f591df730" FOREIGN KEY ("frameworkId") REFERENCES "framework_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_session_entity"("id", "startTime", "endTime", "userId", "summaryTitle", "summary", "keywords", "emotion_score", "quote", "sessionTitle", "type", "frameworkId") SELECT "id", "startTime", "endTime", "userId", "summaryTitle", "summary", "keywords", "emotion_score", "quote", "sessionTitle", "type", "frameworkId" FROM "session_entity"`);
        await queryRunner.query(`DROP TABLE "session_entity"`);
        await queryRunner.query(`ALTER TABLE "temporary_session_entity" RENAME TO "session_entity"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session_entity" RENAME TO "temporary_session_entity"`);
        await queryRunner.query(`CREATE TABLE "session_entity" ("id" varchar PRIMARY KEY NOT NULL, "startTime" datetime NOT NULL, "endTime" datetime NOT NULL, "userId" integer, "summaryTitle" varchar NOT NULL DEFAULT (''), "summary" varchar NOT NULL DEFAULT (''), "keywords" varchar NOT NULL DEFAULT (''), "emotion_score" text NOT NULL DEFAULT ('{}'), "quote" varchar NOT NULL DEFAULT (''), "sessionTitle" varchar NOT NULL DEFAULT (''), "type" varchar NOT NULL DEFAULT ('Freestyle'), "frameworkId" varchar, CONSTRAINT "FK_8118675718bebb455bba4caf129" FOREIGN KEY ("userId") REFERENCES "user_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "session_entity"("id", "startTime", "endTime", "userId", "summaryTitle", "summary", "keywords", "emotion_score", "quote", "sessionTitle", "type", "frameworkId") SELECT "id", "startTime", "endTime", "userId", "summaryTitle", "summary", "keywords", "emotion_score", "quote", "sessionTitle", "type", "frameworkId" FROM "temporary_session_entity"`);
        await queryRunner.query(`DROP TABLE "temporary_session_entity"`);
        await queryRunner.query(`ALTER TABLE "session_entity" RENAME TO "temporary_session_entity"`);
        await queryRunner.query(`CREATE TABLE "session_entity" ("id" varchar PRIMARY KEY NOT NULL, "startTime" datetime NOT NULL, "endTime" datetime NOT NULL, "userId" integer, "summaryTitle" varchar NOT NULL DEFAULT (''), "summary" varchar NOT NULL DEFAULT (''), "keywords" varchar NOT NULL DEFAULT (''), "emotion_score" text NOT NULL DEFAULT ('{}'), "quote" varchar NOT NULL DEFAULT (''), CONSTRAINT "FK_8118675718bebb455bba4caf129" FOREIGN KEY ("userId") REFERENCES "user_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "session_entity"("id", "startTime", "endTime", "userId", "summaryTitle", "summary", "keywords", "emotion_score", "quote") SELECT "id", "startTime", "endTime", "userId", "summaryTitle", "summary", "keywords", "emotion_score", "quote" FROM "temporary_session_entity"`);
        await queryRunner.query(`DROP TABLE "temporary_session_entity"`);
        await queryRunner.query(`ALTER TABLE "session_entity" RENAME TO "temporary_session_entity"`);
        await queryRunner.query(`CREATE TABLE "session_entity" ("id" varchar PRIMARY KEY NOT NULL, "startTime" datetime NOT NULL, "endTime" datetime NOT NULL, "userId" integer, "summaryTitle" varchar NOT NULL DEFAULT (''), "summary" varchar NOT NULL DEFAULT (''), "frameworkTitle" varchar NOT NULL DEFAULT ('Random Log'), "keywords" varchar NOT NULL DEFAULT (''), "emotion_score" text NOT NULL DEFAULT ('{}'), "quote" varchar NOT NULL DEFAULT (''), CONSTRAINT "FK_8118675718bebb455bba4caf129" FOREIGN KEY ("userId") REFERENCES "user_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "session_entity"("id", "startTime", "endTime", "userId", "summaryTitle", "summary", "keywords", "emotion_score", "quote") SELECT "id", "startTime", "endTime", "userId", "summaryTitle", "summary", "keywords", "emotion_score", "quote" FROM "temporary_session_entity"`);
        await queryRunner.query(`DROP TABLE "temporary_session_entity"`);
    }

}
