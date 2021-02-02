import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1612280177035 implements MigrationInterface {
  public name: string = 'Migration1612280177035';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "rss_users_teams" ("usersId" uuid NOT NULL, "teamsId" uuid NOT NULL, CONSTRAINT "PK_05c1d555ad9a95a5b913223ee31" PRIMARY KEY ("usersId", "teamsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b3116354835e0001b692d3b0e6" ON "rss_users_teams" ("usersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0731c25766755bf1baf90901ef" ON "rss_users_teams" ("teamsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "rss_users_teams" ADD CONSTRAINT "FK_b3116354835e0001b692d3b0e63" FOREIGN KEY ("usersId") REFERENCES "rss_users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "rss_users_teams" ADD CONSTRAINT "FK_0731c25766755bf1baf90901ef8" FOREIGN KEY ("teamsId") REFERENCES "rss_teams"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rss_users_teams" DROP CONSTRAINT "FK_0731c25766755bf1baf90901ef8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "rss_users_teams" DROP CONSTRAINT "FK_b3116354835e0001b692d3b0e63"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_0731c25766755bf1baf90901ef"`);
    await queryRunner.query(`DROP INDEX "IDX_b3116354835e0001b692d3b0e6"`);
    await queryRunner.query(`DROP TABLE "rss_users_teams"`);
  }
}
