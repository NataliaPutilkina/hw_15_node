import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeletedAndHeader1757856009435 implements MigrationInterface {
    name = 'AddDeletedAndHeader1757856009435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`ALTER TABLE "newspost" ADD "header" character varying(50)`);
        await queryRunner.query(`UPDATE "newspost" SET "header" = "title"`);
        await queryRunner.query(`ALTER TABLE "newspost" ALTER COLUMN "header" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "newspost" DROP COLUMN "title"`);

        
        await queryRunner.query(`ALTER TABLE "newspost" ADD "deleted" boolean NOT NULL DEFAULT false`);

        
        await queryRunner.query(`ALTER TABLE "newspost" ALTER COLUMN "text" DROP NOT NULL`);
        await queryRunner.query(`UPDATE "newspost" SET "text" = '' WHERE "text" IS NULL`);
        await queryRunner.query(`ALTER TABLE "newspost" ALTER COLUMN "text" TYPE text`);
        await queryRunner.query(`ALTER TABLE "newspost" ALTER COLUMN "text" SET NOT NULL`);

        
        await queryRunner.query(`CREATE INDEX "IDX_newspost_header" ON "newspost" ("header")`);
        await queryRunner.query(`CREATE INDEX "IDX_newspost_genre" ON "newspost" ("genre")`);

        
        await queryRunner.query(`ALTER TABLE "user" ADD "deleted" boolean NOT NULL DEFAULT false`);

        
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_user_email" ON "user" ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`DROP INDEX "IDX_newspost_header"`);
        await queryRunner.query(`DROP INDEX "IDX_newspost_genre"`);
        await queryRunner.query(`DROP INDEX "IDX_user_email"`);

        
        await queryRunner.query(`ALTER TABLE "newspost" ALTER COLUMN "text" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "newspost" ALTER COLUMN "text" TYPE character varying(256)`);
        await queryRunner.query(`ALTER TABLE "newspost" ALTER COLUMN "text" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "newspost" DROP COLUMN "deleted"`);

        
        await queryRunner.query(`ALTER TABLE "newspost" ADD "title" character varying(50)`);
        await queryRunner.query(`UPDATE "newspost" SET "title" = "header"`);
        await queryRunner.query(`ALTER TABLE "newspost" ALTER COLUMN "title" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "newspost" DROP COLUMN "header"`);

        
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deleted"`);
    }
}
