import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1739894499167 implements MigrationInterface {
    name = 'Migrations1739894499167'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_journal_entry_entity" (
            "id" varchar PRIMARY KEY NOT NULL, 
            "entry" varchar NOT NULL, 
            "userId" integer, 
            "questionId" varchar, 
            "sessionId" varchar, 
            "summary" varchar NOT NULL DEFAULT (''), 
            "keywords" varchar NOT NULL DEFAULT (''), 
            "emotion_score" json NOT NULL DEFAULT ('{}'),
            CONSTRAINT "FK_a6170acbded830663cc81feb855" FOREIGN KEY ("sessionId") REFERENCES "session_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, 
            CONSTRAINT "FK_26dc26b40a8e1ba833eae8eac40" FOREIGN KEY ("questionId") REFERENCES "question_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, 
            CONSTRAINT "FK_b9b7b635b80e6b679370f2c5fc6" FOREIGN KEY ("userId") REFERENCES "user_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        )`);
        await queryRunner.query(`INSERT INTO "temporary_journal_entry_entity"("id", "entry", "userId", "questionId", "sessionId") SELECT "id", "entry", "userId", "questionId", "sessionId" FROM "journal_entry_entity"`);
        await queryRunner.query(`DROP TABLE "journal_entry_entity"`);
        await queryRunner.query(`ALTER TABLE "temporary_journal_entry_entity" RENAME TO "journal_entry_entity"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "journal_entry_entity" RENAME TO "temporary_journal_entry_entity"`);
        await queryRunner.query(`CREATE TABLE "journal_entry_entity" ("id" varchar PRIMARY KEY NOT NULL, "entry" varchar NOT NULL, "userId" integer, "questionId" varchar, "sessionId" varchar, CONSTRAINT "FK_a6170acbded830663cc81feb855" FOREIGN KEY ("sessionId") REFERENCES "session_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_26dc26b40a8e1ba833eae8eac40" FOREIGN KEY ("questionId") REFERENCES "question_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_b9b7b635b80e6b679370f2c5fc6" FOREIGN KEY ("userId") REFERENCES "user_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "journal_entry_entity"("id", "entry", "userId", "questionId", "sessionId") SELECT "id", "entry", "userId", "questionId", "sessionId" FROM "temporary_journal_entry_entity"`);
        await queryRunner.query(`DROP TABLE "temporary_journal_entry_entity"`);
    }

}
