import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1612210416652 implements MigrationInterface {
  public name: string = 'Migration1612210416652';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "rss_users_courses" ("usersId" uuid NOT NULL, "coursesId" uuid NOT NULL, CONSTRAINT "PK_ea14658d4f0d2e7ba11bfd3a08c" PRIMARY KEY ("usersId", "coursesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b06c4b091bcb7e073cbc63071d" ON "rss_users_courses" ("usersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2123238b57287a836d99e2e3b1" ON "rss_users_courses" ("coursesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "rss_users_courses" ADD CONSTRAINT "FK_b06c4b091bcb7e073cbc63071da" FOREIGN KEY ("usersId") REFERENCES "rss_users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "rss_users_courses" ADD CONSTRAINT "FK_2123238b57287a836d99e2e3b13" FOREIGN KEY ("coursesId") REFERENCES "rss_courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rss_users_courses" DROP CONSTRAINT "FK_2123238b57287a836d99e2e3b13"`,
    );
    await queryRunner.query(
      `ALTER TABLE "rss_users_courses" DROP CONSTRAINT "FK_b06c4b091bcb7e073cbc63071da"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_2123238b57287a836d99e2e3b1"`);
    await queryRunner.query(`DROP INDEX "IDX_b06c4b091bcb7e073cbc63071d"`);
    await queryRunner.query(`DROP TABLE "rss_users_courses"`);
  }
}
