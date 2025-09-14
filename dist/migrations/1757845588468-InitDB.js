"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitDB1757845588468 = void 0;
class InitDB1757845588468 {
    constructor() {
        this.name = 'InitDB1757845588468';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."newspost_genre_enum" AS ENUM('Politic', 'Business', 'Sport', 'Other')`);
        await queryRunner.query(`CREATE TABLE "newspost" ("id" SERIAL NOT NULL, "title" character varying(50) NOT NULL, "text" character varying(256) NOT NULL, "genre" "public"."newspost_genre_enum" NOT NULL DEFAULT 'Other', "isPrivate" boolean NOT NULL DEFAULT false, "createDate" TIMESTAMP NOT NULL DEFAULT now(), "authorId" integer, CONSTRAINT "PK_fc510f54eaf7998ff5ace6072e9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "newspost" ADD CONSTRAINT "FK_54ca14ab54a03d307fe683d6c25" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "newspost" DROP CONSTRAINT "FK_54ca14ab54a03d307fe683d6c25"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "newspost"`);
        await queryRunner.query(`DROP TYPE "public"."newspost_genre_enum"`);
    }
}
exports.InitDB1757845588468 = InitDB1757845588468;
