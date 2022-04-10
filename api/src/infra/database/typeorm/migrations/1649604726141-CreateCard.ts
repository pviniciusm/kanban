import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCard1649604726141 implements MigrationInterface {
    name = 'CreateCard1649604726141'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "card" ("id" varchar(64) PRIMARY KEY NOT NULL, "title" varchar(50) NOT NULL, "content" varchar(100) NOT NULL, "list" varchar CHECK( "list" IN ('T','P','D') ) NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "card"`);
    }

}
